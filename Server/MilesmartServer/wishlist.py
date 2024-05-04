from flask import request
from .authentication import AUTH_PRIVILEGE_COADMIN, AUTH_PRIVILEGE_USER, requiresAuthPrivilege
from . import generate_id, mainDatabase, milesmartServer
from pymongo.command_cursor import CommandCursor

@milesmartServer.route('/user/wishlist', methods=['GET'])
@milesmartServer.route('/user/wishlist/<id>', methods=['GET'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def wishlist_get(id: str|None = None, current_user: str|None = None):
    page_size = int(request.args["page_size"]) if 'page_size' in request.args else 30
    skip = int(request.args["page"])*page_size if 'page' in request.args and id is None else 0
    
    match = { '$match': { 'owner': current_user['_id'] } }
    if id is not None: match['$match']['_id'] = id

    lookup_user = {
        '$lookup': {
            'from': 'User', 
            'localField': 'owner', 
            'foreignField': '_id', 
            'as': 'owner'
        }
    }

    lookup_vehicle = {
        '$lookup': {
            'from': 'Vehicle', 
            'localField': 'vehicle', 
            'foreignField': '_id', 
            'as': 'vehicle'
        }
    }

    unwind_user = { '$unwind': { 'path': '$owner' } }

    unwind_vehicle = { '$unwind': { 'path': '$vehicle' } }

    results = list(mainDatabase['Wishlist'].aggregate([match, lookup_user, lookup_vehicle, unwind_user, unwind_vehicle, { '$skip': skip }, { '$limit': page_size }]))
    if len(results) <= 0: return { 'error': 'resource_not_found' }, 404

    if id is None:
        count = mainDatabase['Wishlist'].count_documents({ **match['$match'] })

        return {
            'count': count,
            'pages': (count//page_size)+1,
            'results': results
        }
    
    return results[0]

@milesmartServer.route('/user/wishlist', methods=['POST'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def wishlist_post(current_user: str|None = None):
    id = generate_id()
    obj = {
        'owner': current_user['_id'],
        '_id': id
    }

    for arg in request.json:
        if arg != 'vehicle': return { 'error': 'unknown_arg', 'message': arg }, 400
        obj[arg] = request.json[arg]

    vehicle = mainDatabase['Vehicle'].find_one({ '_id': obj['vehicle']})
    if vehicle is None: return { 'error': 'vehicle_not_found' }, 404
    
    mainDatabase['Wishlist'].insert_one(obj)

    obj['vehicle'] = vehicle
    obj['owner'] = current_user

    return obj

@milesmartServer.route('/user/wishlist/<id>', methods=['DELETE'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def wishlist_delete(id: str|None = None, current_user: str|None = None):
    res = mainDatabase['Wishlist'].find_one_and_delete({ '_id': id, 'owner': current_user['_id'] })

    if res is None: return { 'error': 'resource_not_found' }, 404
    return res