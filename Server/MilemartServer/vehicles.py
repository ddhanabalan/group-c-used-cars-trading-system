import math
from random import Random
from typing import Any
from flask import abort, request
from pymongo.collection import Collection
from . import mongodbClient, milemartServer

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

@milemartServer.route('/vehicles', methods=['GET'])
@milemartServer.route('/vehicles/<int:id>', methods=['GET'])
def vehicles(id: int|None = None):
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

        make_range_filter(price_filter, request.args, 'price', 'price')
        make_range_filter(odo_filter, request.args, 'odo', 'odometer')
        make_range_filter(year_filter, request.args, 'year', 'year')

        if 'fuel_types' in request.args:
            fuel_filter['fuel'] = { '$in': request.args['fuel_types'].split(',') }

    images = list[str]()
    for i in range(1, 6):
        images.append(f'car{i}.jpg')
    for i in range(1, 6):
        images.append(f'interior{i}.jpg')
    
    match = {
        '$match': { 
            '$or': search_key_filter, 
            **price_filter, 
            **odo_filter, 
            **year_filter,
            **fuel_filter 
        } if id is None else { '_id': id }
    }

    if 'uid' in request.args:
        uid = int(request.args['uid'])
        match['$match'] = { 'owner': uid }

    lookup = {
        '$lookup': {
            'from': 'User', 
            'localField': 'owner', 
            'foreignField': '_id', 
            'as': 'owner'
        }
    }

    unwind = { '$unwind': { 'path': '$owner' } }

    result = list(mongodbClient['MilesmartMain']['Car'].aggregate([match, lookup, unwind, { '$limit': page_size }, { '$skip': skip }]))

    for vehicle in result:
        image_urls = list[str]()
        for i in range(Random().randint(3, 10)):
            image_urls.append(f'{request.url_root}file/{images[Random().randint(0,4 if i < 2 else 9)]}')
        vehicle['image_urls'] = image_urls
        
    if id is None:
        filters_bound = request.args['filters_bound'] == 'True' or request.args['filters_bound'] == 'true' if 'filters_bound' in request.args else True
        price_range = find_range(mongodbClient['MilesmartMain']['Car'], 'price', { '$or': search_key_filter, **odo_filter, **year_filter, **fuel_filter }) if filters_bound else {}
        odo_range = find_range(mongodbClient['MilesmartMain']['Car'], 'odometer', { '$or': search_key_filter, **price_filter, **year_filter, **fuel_filter }) if filters_bound else {}
        year_range = find_range(mongodbClient['MilesmartMain']['Car'], 'year', { '$or': search_key_filter, **price_filter, **odo_filter, **fuel_filter }) if filters_bound else {}
        # price_list = make_sorted_list(mongodbClient['MilesmartMain']['Car'], 'price', { '$or': search_key_filter, **odo_filter, **year_filter, **fuel_filter })
        # odo_list = make_sorted_list(mongodbClient['MilesmartMain']['Car'], 'odometer', { '$or': search_key_filter, **price_filter, **year_filter, **fuel_filter })
        # year_list = make_sorted_list(mongodbClient['MilesmartMain']['Car'], 'year', { '$or': search_key_filter, **price_filter, **odo_filter, **fuel_filter })
        fuel_list = { 'fuel_types': list(mongodbClient['MilesmartMain']['Car'].distinct('fuel', { '$or': search_key_filter, **price_filter, **odo_filter, **year_filter })) } if filters_bound else {}
        count_response = list(mongodbClient['MilesmartMain']['Car'].aggregate([match, { '$count': 'count' }]))
        results_count = count_response[0]['count'] if len(count_response) > 0 else 0

        # odo_list = list(filter(lambda i: i != -1, odo_list))

        rt_obj = {
            'pages': math.ceil(results_count/page_size),
            'count': results_count,
            'results': result,
            **fuel_list,
            **price_range,
            **odo_range,
            **year_range
        }

        # if len(price_list) > 0: 
        #     rt_obj['min_price'] = price_list[0]
        #     rt_obj['max_price'] = price_list[-1]

        # if len(odo_list) > 0: 
        #     rt_obj['min_odo'] = odo_list[0]
        #     rt_obj['max_odo'] = odo_list[-1]

        # if len(year_list) > 0: 
        #     rt_obj['min_year'] = year_list[0]
        #     rt_obj['max_year'] = year_list[-1]

        return rt_obj

    else:
        if len(result) <= 0: abort(404)
        return result[0]
  