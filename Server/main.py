#!.venv/bin/python3

import datetime
import math
import os
from random import Random
from typing import Any
from flask import Flask, abort, redirect, request, send_file, url_for
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.collection import Collection
import requests
import jwt

import google_auth_oauthlib.flow

from idgen import generate_id

app = Flask(__name__)
app.secret_key = "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"
CORS(app)

username = "admin"
password = "ptUJ75ehwYIYZ3cG"
uri = f"mongodb+srv://{username}:{password}@cluster0.wtgjxax.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)

CLIENT_SECRETS_FILE = "Server/client_secret.json"
SCOPES = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid']
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

# @app.route('/')
# def index():
#     return send_file('static/index.html')

# @app.route('/app/<path:path>')
# def fs(path: str):
#     print(path)
#     return send_file(f'static/{path}')

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

@app.route('/vehicles', methods=['GET'])
@app.route('/vehicles/<int:id>', methods=['GET'])
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

    result = list(client['MilesmartMain']['Car'].aggregate([match, lookup, unwind, { '$limit': page_size }, { '$skip': skip }]))

    for vehicle in result:
        image_urls = list[str]()
        for i in range(Random().randint(3, 10)):
            image_urls.append(f'{request.url_root}file/{images[Random().randint(0,4 if i < 2 else 9)]}')
        vehicle['image_urls'] = image_urls
        
    if id is None:
        filters_bound = request.args['filters_bound'] == 'True' or request.args['filters_bound'] == 'true' if 'filters_bound' in request.args else True
        price_range = find_range(client['MilesmartMain']['Car'], 'price', { '$or': search_key_filter, **odo_filter, **year_filter, **fuel_filter }) if filters_bound else {}
        odo_range = find_range(client['MilesmartMain']['Car'], 'odometer', { '$or': search_key_filter, **price_filter, **year_filter, **fuel_filter }) if filters_bound else {}
        year_range = find_range(client['MilesmartMain']['Car'], 'year', { '$or': search_key_filter, **price_filter, **odo_filter, **fuel_filter }) if filters_bound else {}
        # price_list = make_sorted_list(client['MilesmartMain']['Car'], 'price', { '$or': search_key_filter, **odo_filter, **year_filter, **fuel_filter })
        # odo_list = make_sorted_list(client['MilesmartMain']['Car'], 'odometer', { '$or': search_key_filter, **price_filter, **year_filter, **fuel_filter })
        # year_list = make_sorted_list(client['MilesmartMain']['Car'], 'year', { '$or': search_key_filter, **price_filter, **odo_filter, **fuel_filter })
        fuel_list = { 'fuel_types': list(client['MilesmartMain']['Car'].distinct('fuel', { '$or': search_key_filter, **price_filter, **odo_filter, **year_filter })) } if filters_bound else {}
        count_response = list(client['MilesmartMain']['Car'].aggregate([match, { '$count': 'count' }]))
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
    
# Storage Functions
def get_path(mkdir:bool = False)->tuple[str|None, int]:
    if not 'path' in request.args: return None, 1

    path = request.args['path']
    if path.startswith('/'): path = path[1:]

    abs_path = os.path.abspath(os.path.join('Server/storage', path))
    dir = os.path.dirname(abs_path)

    if not os.path.exists(dir):
        if mkdir: os.mkdir(dir)
        else: return None, 2
    
    return abs_path, 0

@app.route('/storage/upload', methods=['POST'])
def storage_upload():
    path, res = get_path(mkdir=True)
    if path is None: abort(400)
    if 'file' not in request.args: abort(400 if res == 1 else 404)

    file = request.files['file']
    file.save(path)
    return {}, 201

@app.route('/storage/download', methods=['GET'])
def storage_download():
    path, res = get_path()
    if path is None: abort(400 if res == 1 else 404)

    print(path)
    return send_file(path, as_attachment=True)

@app.route('/storage/remove', methods=['DELETE'])
def storage_remove():
    path, res = get_path()
    if path is None: abort(400 if res == 1 else 404)

    os.remove(path)
    return {}, 200

@app.route('/file/<path:path>', methods=['GET'])
def storage_view(path: str):
    abs_path = os.path.abspath(os.path.join('Server/storage', path))
    dir = os.path.dirname(abs_path)
    if not os.path.exists(abs_path): abort(404)

    return send_file(abs_path, as_attachment=True)

@app.route('/test', methods=["POST", "GET"])
def tqx():
    # if 'path' not in request.form: abort(400)
    # if 'file' not in request.files: abort(400)
    # request.files['file'].save(os.path.join('Server/storage', request.form['path']))
    print(request.headers.get("Content-Type"))

    return {}

@app.route('/client_code', methods=['GET'])
def client_code():
    if request.authorization == None: abort(401)
    if request.authorization.type != 'basic': abort(401)
    if request.authorization.username != 'clientweb1': abort(401)
    if request.authorization.password != 'password1': abort(401)

    id = generate_id()
    client['MilesmartMain']['ClientCodes'].insert_one({
        'timestamp': datetime.datetime.now(datetime.UTC),
        'code': id
    })

    return { 'client_code': id }

@app.route('/login', methods=['GET'])
def login():
    if 'client_code' not in request.args: abort(400)
    
    client_code = request.args['client_code']
    client_code_query = list(client['MilesmartMain']['ClientCodes'].find({
        'code': client_code
    }))

    if len(client_code_query) == 0: abort(401)

    token_query = list(client['MilesmartMain']['UserTokens'].find({
        '_id': client_code
    }))

    if len(token_query) != 0: return {}
    
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
      CLIENT_SECRETS_FILE, scopes=SCOPES)
    
    flow.redirect_uri = url_for('oauth2callback', _external=True)

    authorization_url, state = flow.authorization_url(
      access_type='offline',
      include_granted_scopes='true',
      state=client_code)

    return redirect(authorization_url)
    # return {}

@app.route('/oauth2callback')
def oauth2callback():
    if 'state' not in request.args: abort(400)
    if 'error' in request.args: abort(401)
    state = request.args['state']
    
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        SCOPES,
        state=state)
    flow.redirect_uri = url_for('oauth2callback', _external=True)

    authorization_response = request.url
    flow.fetch_token(authorization_response=authorization_response)

    response = requests.request(
        method='GET',
        url='https://www.googleapis.com/oauth2/v2/userinfo',
        headers={
            'Authorization': f'Bearer {flow.credentials.token}'
        }
    )

    user_data = response.json()
    user_query = list(client['MilesmartMain']['User'].find({
        '_id': user_data['id']
    }))

    if len(user_query) != 1:
        client['MilesmartMain']['User'].insert_one(user = {
            '_id': int(user_data['id']),
            'name': user_data['name'],
            'email': user_data['email'],
            'picture': user_data['picture'],
            'role': 'User'
        })
    else: user = user_query[0]

    token = jwt.encode({
        'uid': int(user['_id']),
        'role': user['role'], 
    }, app.config['SECRET_KEY'])

    client['MilesmartMain']['UserTokens'].insert_one({
        '_id': state,
        'timestamp': datetime.datetime.now(datetime.UTC),
        'token': token
    })

    return {}

@app.route('/token')
def token():
    if 'client_code' not in request.args: abort(400)

    client_code = request.args['client_code']

    token_query = list(client['MilesmartMain']['UserTokens'].find({
        '_id': client_code
    }))

    if len(token_query) == 0: abort(401)

    return {
        'token': token_query[0]['token']
    }

if __name__ == '__main__':
    app.run(debug=True)
