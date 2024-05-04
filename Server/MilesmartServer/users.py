import math
from flask import request
from gridfs import GridFS

from .authentication import AUTH_PRIVILEGE_COADMIN, AUTH_PRIVILEGE_USER, requiresAuthPrivilege
from . import generate_id, mainDatabase, milesmartServer

def make_lookup(fieldName, collection, local = '_id', foreign = 'owner')->dict:
    lookup = {
        '$lookup': {
            'from': collection,
            'localField': local, 
            'foreignField': foreign, 
            'as': fieldName
        }
    }

    unwind = { '$unwind': { 'path': f'${fieldName}' } }

    return lookup, unwind

@milesmartServer.route('/user', methods=['GET'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def user_get(current_user = None):
    return current_user
    
@milesmartServer.route('/user', methods=['PATCH'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def user_patch(current_user = None):
    uid = current_user['_id']
    body = request.json
    allowed_keys = ['email', 'first_name', 'gender', 'name', 'phone', 'picture']

    for key in body:
        if key not in allowed_keys: { 'error': 'key_unknown', 'message': key }, 400
    
    mainDatabase['User'].update_one({ '_id': uid }, { '$set': body})

    return {
        **current_user,
        **body
    }

@milesmartServer.route('/user', methods=['DELETE'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def user_delete(current_user = None):
    # Loading entire user data
    wishlist_lookup = make_lookup('wishlist', 'Wishlist')[0]
    wishlist_lookup['$lookup']['pipeline'] = [*make_lookup('vehicle', 'Vehicle', 'vehicle', '_id')]
    wishlist_lookup['$lookup']['pipeline'][0]['$lookup']['pipeline'] = [*make_lookup('owner', 'User', 'owner', '_id')]
    user_obj = mainDatabase['User'].aggregate([
        { '$match': { '_id': current_user['_id'] } }, 
        wishlist_lookup,
        make_lookup('tokens', 'AuthTokens', foreign='uid')[0],
        make_lookup('files', 'fs.files')[0],
        make_lookup('vehicles', 'Vehicle')[0],
        {
            '$project': {
                'tokens.uid': 0, 
                'vehicles.owner': 0, 
                'files.owner': 0, 
                'wishlist.owner': 0
            }
        }
    ]).next()

    mainDatabase['User'].find_one_and_delete({ '_id': current_user['_id'] }) # Poping user object
    filter_obj = {'owner': current_user['_id']} 

    for i in range(mainDatabase['Vehicle'].count_documents(filter_obj)):
        res = mainDatabase['Vehicle'].find_one_and_delete(filter_obj) # Clearing Vehicles one by one
        mainDatabase['Wishlist'].delete_many({ 'vehicle': res['_id'] }) # Clearing wishlist links on this vehicle

    for i in range(mainDatabase['fs.files'].count_documents(filter_obj)):
        res = mainDatabase['fs.files'].find_one_and_delete(filter_obj) # Clearing Files metadatas
        mainDatabase['fs.chunks'].delete_many({ 'files_id': res['_id'] }) # Clearing Files Binary Chunks
    
    mainDatabase['AuthTokens'].delete_many({'uid': current_user['_id']}) # Revoking all User Tokens
    mainDatabase['Wishlist'].delete_many(filter_obj) # Clearing all wishlisted Links of user obj
    
    return user_obj

@milesmartServer.route('/users/<id>', methods=['GET'])
@milesmartServer.route('/users/<int:id>', methods=['GET'])
def users_get(id: str|int):
    resp = mainDatabase['User'].find_one({'_id': id})
    if resp is None: { 'error': 'resource_not_found' }, 404
    return dict(resp)

@milesmartServer.route('/users', methods=['GET'])
def users_search():
    page_size = int(request.args["page_size"]) if 'page_size' in request.args else 30
    skip = int(request.args["page"])*page_size if 'page' in request.args and id is None else 0
    search_key = request.args['sk'] if 'sk' in request.args else ''
    
    search_key_filter = [
        { 'email': { '$regex': search_key } },
        { 'first_name': { '$regex': search_key } },
        { 'name': { '$regex': search_key } },
    ]

    count_response = list(mainDatabase['User'].aggregate([{ '$match': { '$or': search_key_filter } }, { '$count': 'count' }]))
    results_count = count_response[0]['count'] if len(count_response) > 0 else 0
    result = list(mainDatabase['User'].find(filter={ '$or': search_key_filter }, limit=page_size, skip=skip))

    rt_obj = {
        'pages': math.ceil(results_count/page_size),
        'count': results_count,
        'results': result
    }

    return rt_obj

@milesmartServer.route('/actions/users/<id>', methods=['POST'])
@milesmartServer.route('/actions/users/<int:id>', methods=['POST'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_COADMIN)
def users_action(id: int|str, current_user = None):
    invoker_privilege = current_user['privilege']
    # invoker_privilege = 4

    resp = mainDatabase['User'].find_one({'_id': id})
    if resp is None: return { 'error': 'resource_not_found' }, 404

    target_user = dict(resp) if not None else {}
    prev_privilege = target_user['privilege']

    if '' not in request.json: { 'error': 'action_not_found' }, 400

    if request.json['action'] == 'change_privilege':
        if 'privilege' not in request.json: return { 'error': 'privilege_not_found' }, 400
        
        target_privilege = request.json['privilege']
        if invoker_privilege > prev_privilege and invoker_privilege > target_privilege:
            mainDatabase['User'].update_one({'_id': id}, { '$set': { 'privilege': target_privilege } })
            return {
                **target_user,
                'privilege': target_privilege
            }
        
        return { 'error': 'unprivileged_action' }
    
    return { 'error': 'unknown_action' }