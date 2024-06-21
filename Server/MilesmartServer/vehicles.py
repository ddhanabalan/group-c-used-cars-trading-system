import math
from random import Random
import time
from typing import Any
from flask import Response, abort, redirect, request
from pymongo.collection import Collection

from .authentication import AUTH_PRIVILEGE_COADMIN, AUTH_PRIVILEGE_NONE, AUTH_PRIVILEGE_USER, requiresAuthPrivilege
from . import generate_id, mainDatabase, milesmartServer

def make_range_filter(dest: dict[str, int], src: dict[str, str], src_key_name: str, dest_key_name: str):
    min_key_name = f'{src_key_name}_min'
    max_key_name = f'{src_key_name}_max'
    if dest_key_name not in dest: dest[dest_key_name] = {}
    if min_key_name in src: dest[dest_key_name]['$gte'] = int(src[min_key_name])
    if max_key_name in src: dest[dest_key_name]['$lte'] = int(src[max_key_name])
    if len(dest[dest_key_name]) == 0: dest.clear()

def find_range(src: Collection, field: str, filters: dict[str, Any]|None = None) -> dict[str, int]:
    query_response = list(src.aggregate([
        { '$match': filters },
        {
            '$group': {
                '_id': None, 
                f'max_{field}': { '$max': f'${field}' }, 
                f'min_{field}': { '$min': f'${field}' }
            }
        }
    ]))

    if len(query_response) == 0: return {}
    return query_response[0]

def make_sorted_list(src: Collection, key: str, filter_options: dict[str, Any]|None = None) -> list:
    query_response = list(src.find(filter=filter_options, projection={key: 1}, sort={key: 1}))
    target_list = list(map(lambda i: i[key] if key in i else -1, query_response))
    return target_list

@milesmartServer.route('/user/vehicles', methods=['GET'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def my_vehicles(current_user = None):
    return vehicles(uid=current_user['_id'])

@milesmartServer.route('/vehicles', methods=['GET'])
@milesmartServer.route('/vehicles/<int:id>', methods=['GET']) # Deprecated Route
@milesmartServer.route('/vehicles/<id>', methods=['GET'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_NONE)
def vehicles(id: int|str|None = None, uid: str|None = None, current_user: dict = None):
    page_size = int(request.args["page_size"]) if 'page_size' in request.args else 30
    skip = int(request.args["page"])*page_size if 'page' in request.args and id is None else 0

    if id is None:
        search_key = request.args['sk'] if 'sk' in request.args else ''

        search_key_filter = [
            { 'model': { '$regex': search_key } },
            { 'manufacturer': { '$regex': search_key } }
        ]
        price_filter = {}
        odo_filter = {}
        year_filter = {}
        fuel_filter = {}
        owner_filter = {}

        make_range_filter(price_filter, request.args, 'price', 'price')
        make_range_filter(odo_filter, request.args, 'odo', 'odometer')
        make_range_filter(year_filter, request.args, 'year', 'year')

        if 'fuel_types' in request.args:
            fuel_filter['fuel'] = { '$in': request.args['fuel_types'].split(',') }
        
        if uid is not None: owner_filter['owner'] = uid
        elif 'uid' in request.args: owner_filter['owner'] = request.args['uid']
                
    # images = list[str]()
    # for i in range(1, 6):
    #     images.append(f'car{i}.jpg')
    # for i in range(1, 6):
    #     images.append(f'interior{i}.jpg')
    
    match = {
        '$match': { 
            '$or': search_key_filter, 
            **price_filter, 
            **odo_filter, 
            **year_filter,
            **fuel_filter,
            **owner_filter
        } if id is None else { '_id': id }
    }

    lookup_owner = {
        '$lookup': {
            'from': 'User', 
            'localField': 'owner', 
            'foreignField': '_id', 
            'as': 'owner'
        }
    }

    unwind_owner = { '$unwind': { 'path': '$owner' } }

    wishlist_taging = []
    if current_user is not None:
        wishlist_taging.append({
            '$lookup': {
                'from': 'Wishlist', 
                'localField': '_id', 
                'foreignField': 'vehicle', 
                'as': 'wishlist_id',
                'pipeline': [ { '$match': { 'owner': current_user['_id'] } } ]
            }
        })
        wishlist_taging.append({ '$unwind': { 'path': '$wishlist_id', 'preserveNullAndEmptyArrays': True } })

    result = list(mainDatabase['Vehicle'].aggregate([match, lookup_owner, unwind_owner, *wishlist_taging, { '$skip': skip }, { '$limit': page_size }]))

    # for vehicle in result:
    #     image_urls = list[str]()
    #     for i in range(Random().randint(3, 10)):
    #         image_urls.append(f'{request.url_root}file/{images[Random().randint(0,4 if i < 2 else 9)]}')
    #     vehicle['image_urls'] = image_urls
        
    if id is None:
        filter_bounds = request.args['filter_bounds'] == 'True' or request.args['filter_bounds'] == 'true' if 'filter_bounds' in request.args else True
        price_range = find_range(mainDatabase['Vehicle'], 'price', { '$or': search_key_filter, **odo_filter, **year_filter, **fuel_filter, **owner_filter }) if filter_bounds else {}
        odo_range = find_range(mainDatabase['Vehicle'], 'odometer', { '$or': search_key_filter, **price_filter, **year_filter, **fuel_filter, **owner_filter }) if filter_bounds else {}
        year_range = find_range(mainDatabase['Vehicle'], 'year', { '$or': search_key_filter, **price_filter, **odo_filter, **fuel_filter, **owner_filter }) if filter_bounds else {}
        fuel_list = { 'fuel_types': list(mainDatabase['Vehicle'].distinct('fuel', { '$or': search_key_filter, **price_filter, **odo_filter, **year_filter, **owner_filter })) } if filter_bounds else {}
        count = mainDatabase['Vehicle'].count_documents({ **match['$match'] })
        
        # odo_list = list(filter(lambda i: i != -1, odo_list))

        rt_obj = {
            'pages': math.ceil(count/page_size),
            'count': count,
            'results': result,
            **fuel_list,
            **price_range,
            **odo_range,
            **year_range
        }

        return rt_obj

    else:
        if len(result) <= 0: abort(404)
        return result[0]

@milesmartServer.route('/user/vehicles/<int:id>', methods=['DELETE']) # Deprecated Route
@milesmartServer.route('/user/vehicles/<id>', methods=['DELETE'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def user_vehicles_delete(id: int|str, current_user=None):
    vehicle = mainDatabase['Vehicle'].find_one_and_delete({ '_id': id, 'owner': current_user['_id'] })
    if vehicle is None: return { 'error': 'resource_not_found' }, 404
    
    # Clear any wishlist for any user which target this vehicle
    mainDatabase['Wishlist'].delete_many({ 'vehicle': vehicle['_id'] })

    return vehicle

@milesmartServer.route('/vehicles/<int:id>', methods=['DELETE']) # Deprecated Route
@milesmartServer.route('/vehicles/<id>', methods=['DELETE'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_COADMIN)
def vehicles_delete(id: int|str, current_user = None):
    vehicle = mainDatabase['Vehicle'].find_one_and_delete({ '_id': id })
    if vehicle is None: return { 'error': 'resource_not_found' }, 404
    return vehicle

@milesmartServer.route('/user/vehicles', methods=['POST'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def user_vehicle_post(current_user = None):
    required_args = ['condition', 'description', 'fuel', 'manufacturer', 'model', 'odometer', 'price', 'state', 'transmission', 'year']
    optional_args = ['cylinders', 'drive', 'paint_color', 'size', 'title_status', 'type', 'VIN']
    uid = current_user['_id']
    body = request.json

    if 'image_urls' not in body: return { 'error': 'required_parameter_not_found: ', 'details': 'parameter: image_urls' }, 404
    image_urls = body['image_urls']
    if len(image_urls) == 0: return { 'error': 'required_parameter_not_found: ', 'details': 'atleast 1 image required' }, 404

    vehicle = { 
        'image_urls': image_urls,
        'owner': uid,
        '_id': generate_id()
    }

    for arg in required_args+optional_args:
        if arg not in body:
            if arg in required_args: return { 'error': 'required_parameter_not_found: ', 'details': f'parameter: {arg}' }, 404
            else: continue 
            
        vehicle[arg] = body[arg]

    mainDatabase['Vehicle'].insert_one(vehicle)
    
    vehicle['owner'] = current_user
    return vehicle

@milesmartServer.route('/user/vehicles/<id>', methods=['PATCH'])
@milesmartServer.route('/user/vehicles/<int:id>', methods=['PATCH']) # Deprecated Route
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def user_vehicle_update(id: str|int, current_user=None):
    vehicle_args = ['condition', 'description', 'fuel', 'manufacturer', 'model', 'odometer', 'price', 'state', 'transmission', 'year', 'cylinders', 'drive', 'paint_color', 'size', 'title_status', 'type', 'VIN']
    uid = current_user['_id']
    result = list(mainDatabase['Vehicle'].find({ '_id': id }, projection={ 'owner': 1 }))
    body = request.json

    if len(result) == 0 or uid != result[0]['owner']: return { 'error': 'resource_not_found: ' }, 404

    updates = {
        '$set': {},
        '$push': {}
    }

    if 'image_urls' in body: 
        image_urls = body['image_urls']
        updates['$push']['image_urls'] = image_urls
        
    for arg in vehicle_args:
        if arg not in body: continue
        updates['$set'][arg] = body[arg]

    mainDatabase['Vehicle'].update_one({ '_id': id }, updates)

    vehicle = dict(mainDatabase['Vehicle'].find_one({ '_id': id }))
    owner = dict(mainDatabase['User'].find_one({ '_id': uid }))
    vehicle['owner'] = owner

    return vehicle

    