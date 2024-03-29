#!.venv/bin/python3

import base64
import datetime
import os
from random import Random
from flask import Flask, abort, redirect, request, send_file, url_for
from flask_cors import CORS
from pymongo import MongoClient
import requests

import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery

from idgen import generate_id

app = Flask(__name__)
app.secret_key = "ABCDEFGH"
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

@app.route('/vehicles', methods=['GET'])
def search():
    skip = int(request.args["page"])*30 if 'page' in request.args else 0

    search_key = request.args['sk'] if 'sk' in request.args else ''

    filter={
        '$and': [
            {
                '$or': [
                    { 'model': { '$regex': search_key } },
                    { 'manufacturer': { '$regex': search_key } }
                ]
            }
        ]
    }

    if 'price_min' in request.args:
        filter['$and'].append({
            'price': { '$gte': int(request.args['price_min']) }
        })

    if 'price_max' in request.args:
        filter['$and'].append({
            'price': { '$lte': int(request.args['price_max']) }
        })

    if 'year_min' in request.args:
        filter['$and'].append({
            'year': { '$gte': int(request.args['year_min']) }
        })

    if 'year_max' in request.args:
        filter['$and'].append({
            'year': { '$lte': int(request.args['year_max']) }
        })

    if 'odo_min' in request.args:
        filter['$and'].append({
            'odometer': { '$gte': int(request.args['odo_min']) }
        })

    if 'odo_max' in request.args:
        filter['$and'].append({
            'odometer': { '$lte': int(request.args['odo_max']) }
        })

    if 'fuel_types' in request.args:
        filter['$and'].append({
            'fuel': { '$in': request.args['fuel_types'].split(',') }
        })
    
    project = {
        'manufacturer': 1, 
        'model': 1, 
        'price': 1, 
        'transmission': 1, 
        'fuel': 1, 
        'odometer': 1, 
        'state': 1, 
        'img_urls': 1,
        'year': 1
    }

    images = list[str]()
    for i in range(1, 6):
        images.append(f'car{i}.jpg')
    for i in range(1, 6):
        images.append(f'interior{i}.jpg')

    result = list(client['MilesmartMain']['Car'].find(filter=filter, projection=project, skip=skip, limit=30))
    for vehicle in result:
        image_urls = list[str]()
        for i in range(Random().randint(3, 10)):
            image_urls.append(f'{request.url_root}file/{images[Random().randint(0,4 if i < 2 else 9)]}')
        vehicle['image_urls'] = image_urls
    
    return result

@app.route('/vehicles/<int:id>', methods=['GET'])
def vehicle(id: int):
    filter = {
        '$match': {
            '_id': id
        }
    }

    lookup = {
        '$lookup': {
            'from': 'User', 
            'localField': 'owner', 
            'foreignField': '_id', 
            'as': 'owner'
        }
    }

    unwind = { '$unwind': { 'path': '$owner' } }
    result = list(client['MilesmartMain']['Car'].aggregate([lookup, unwind, filter, { '$limit': 1 }]))

    #Dummy Image injector
    images = list[str]()
    for i in range(1, 6):
        images.append(f'car{i}.jpg')
    for i in range(1, 6):
        images.append(f'interior{i}.jpg')

    if len(result) <= 0: abort(404)

    vehicle = result[0]
    image_urls = list[str]()
    for i in range(Random().randint(3, 10)):
        image_urls.append(f'{request.url_root}file/{images[Random().randint(0,4 if i < 2 else 9)]}')
    vehicle['image_urls'] = image_urls
    
    return vehicle

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
        'timestamp': datetime.datetime.utcnow(),
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

    # print(result)
    
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

    # client['MilesmartMain']['UserTokens'].insert_one({
    #     '_id': state,
    #     'timestamp': datetime.datetime.utcnow(),
    #     'token': flow.credentials.token
    # })

    requests.request(
        method='GET',
        url=''
    )

    return {}

if __name__ == '__main__':
    app.run(debug=True)
