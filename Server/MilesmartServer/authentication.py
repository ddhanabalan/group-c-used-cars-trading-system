import datetime
from functools import wraps
import math
import os
import time
from typing import Any
from googleapiclient.discovery import build
from flask import abort, redirect, request, send_file, url_for, has_request_context
import google_auth_oauthlib
import jwt
import requests
from . import generate_id, milesmartServer, mainDatabase

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
CLIENT_SECRETS_FILE = "./client_secret.json"
SCOPES = [
    'openid', 
    'https://www.googleapis.com/auth/userinfo.profile', 
    'https://www.googleapis.com/auth/userinfo.email', 
    'https://www.googleapis.com/auth/user.emails.read', 
    'https://www.googleapis.com/auth/user.phonenumbers.read',
    'https://www.googleapis.com/auth/user.addresses.read',
    'https://www.googleapis.com/auth/user.gender.read',
]

AUTH_PRIVILEGE_NONE = 0
AUTH_PRIVILEGE_USER = 1
AUTH_PRIVILEGE_AGENT = 2
AUTH_PRIVILEGE_COADMIN = 3
AUTH_PRIVILEGE_ADMIN = 4

def find_primary_field(src: list[dict[str, Any]]) -> dict[str, Any]|None:
    for field in src:
        if field['metadata']['primary']: return field
    return None

@milesmartServer.route('/client_code', methods=['POST'])
def client_code():
    if request.authorization == None: abort(401)
    if request.authorization.type != 'basic': abort(401)
    if request.authorization.username != 'clientweb1': abort(401)
    if request.authorization.password != 'password1': abort(401)
    if not request.is_json: abort(400)


    if "client_type" not in request.json: abort(400)
    if request.json["client_type"] not in ["web", "device"]: abort(400)
    if request.json["client_type"] == "web":
        if "redirect_uri" not in request.json: abort(400)

    for arg in request.json:
        if arg not in ["client_type", "redirect_uri"]: abort(400)

    id = generate_id()
    mainDatabase['ClientCodes'].insert_one({
        'timestamp': datetime.datetime.now(datetime.UTC),
        'code': id,
        **request.json
    })

    return { 'client_code': id }

@milesmartServer.route('/login', methods=['GET'])
def login():
    if 'client_code' not in request.args: abort(400)
    
    client_code = request.args['client_code']
    client_code_query = list(mainDatabase['ClientCodes'].find({
        'code': client_code
    }))

    if len(client_code_query) == 0: abort(401)

    token_query = list(mainDatabase['UserTokens'].find({
        '_id': client_code
    }))

    if len(token_query) != 0: 
        user_data_query = list(mainDatabase['User'].find({
            '_id': token_query[0]['uid']
        }))
        user_data = user_data_query[0]
        return redirect(url_for('summary', user_name=user_data['name'], user_email=user_data['email'], user_dp=user_data['picture'], user_phone=user_data['phone'] if user_data['phone'] is not None else 'Phone Unavailable'))
    
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
      CLIENT_SECRETS_FILE, scopes=SCOPES)
    
    flow.redirect_uri = url_for('oauth2callback', _external=True)

    authorization_url, state = flow.authorization_url(
      prompt='consent',
      include_granted_scopes='false',
      state=client_code)

    return redirect(authorization_url)
    # return {}

@milesmartServer.route('/oauth2callback')
def oauth2callback():
    if 'state' not in request.args: abort(400)
    if 'error' in request.args: abort(401)
    state = request.args['state']
    scopes = []
    for scope in request.args['scope'].split(' '):
        if scope in SCOPES: scopes.append(scope)

    print(scopes)
    
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes,
        state=state)
    flow.redirect_uri = url_for('oauth2callback', _external=True)

    authorization_response = request.url
    flow.fetch_token(authorization_response=authorization_response)

    userinfo_response = requests.request(
        method='GET',
        url='https://www.googleapis.com/oauth2/v2/userinfo',
        headers={ 'Authorization': f'Bearer {flow.credentials.token}' }
    )

    userinfo = userinfo_response.json()
    uid = generate_id(int(userinfo['id']))

    user_query = list(mainDatabase['User'].find({
        '_id': uid
    }))

    if len(user_query) != 1:
        profile_response = requests.request(
            method='GET',
            url='https://people.googleapis.com/v1/people/me?personFields=genders,phoneNumbers',
            headers={ 'Authorization': f'Bearer {flow.credentials.token}' }
        )

        profile = profile_response.json()

        privilege = 1 if len(list(mainDatabase['User'].find({ 'privilege': 4 }))) != 0 else 4
        
        user_data = {
            '_id': uid,
            'name': userinfo['name'],
            'first_name': userinfo['given_name'],
            'email': userinfo['email'],
            'picture': userinfo['picture'],
            # 'address': find_primary_field(profile['addresses']) if 'addresses' in profile else None,
            'gender': find_primary_field(profile['genders'])['value'] if 'genders' in profile else None,
            'phone': find_primary_field(profile['phoneNumbers'])['value'] if 'phoneNumbers' in profile else None,
            'privilege': privilege
        }

        mainDatabase['User'].insert_one(user_data)
    else: user_data = user_query[0]
    
    print(user_data)

    token = jwt.encode({
        'id': state,
    }, milesmartServer.config['SECRET_KEY'])

    mainDatabase['AuthTokens'].insert_one({
        '_id': state,
        'uid': user_data['_id'],
        'timestamp': datetime.datetime.now(datetime.UTC),
        'token': token
    })

    client_data = dict(mainDatabase['ClientCodes'].find_one({
        'code': state
    }))

    if client_data["client_type"] == "device":
        return redirect(url_for('summary', user_name=user_data['name'], user_email=user_data['email'], user_dp=user_data['picture'], user_phone=user_data['phone'] if user_data['phone'] is not None else 'Phone Unavailable'))
    elif client_data["client_type"] == "web": return redirect(client_data['redirect_uri'])

@milesmartServer.route('/token', methods=['GET'])
def token():
    if 'client_code' not in request.args: abort(400)

    client_code = request.args['client_code']

    token_query = list(mainDatabase['AuthTokens'].find({
        '_id': client_code
    }))

    if len(token_query) == 0: abort(401)

    return token_query[0]

@milesmartServer.route('/summary')
@milesmartServer.route('/summary/<path:filename>')
def summary(filename:str|None = None):
    if filename is None: return send_file('../ui/index.html')
    else: return send_file(f'../ui/{filename}')

def requiresAuthPrivilege(privilege_required: int):
    def inner_func(func):
        @wraps(func)
        def wrapper_func(*args, **kwargs):
            if privilege_required == 0: return func(*args, **kwargs)
            if request.authorization == None: abort(401)
            if request.authorization.type != "bearer": abort(401)
            if request.authorization.token == None: abort(401)

            id = jwt.decode(request.authorization.token, milesmartServer.config['SECRET_KEY'], algorithms=['HS256'])['id']
            token_details = mainDatabase['AuthTokens'].find_one({ '_id': id })
            if token_details is None: abort(401)

            user = mainDatabase['User'].find_one({ '_id': token_details['uid'] })
            user_privilege = user['privilege']
            if user_privilege < privilege_required : abort(401)

            kwargs['current_user'] = user
            return func(*args, **kwargs)
        
        return wrapper_func
    return inner_func

@milesmartServer.route('/user/tokens', methods=['GET'])
@milesmartServer.route('/user/tokens/<id>', methods=['DELETE'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def tokens_search(id:str = None, current_user = None):
    if id == None:
        page_size = int(request.args["page_size"]) if 'page_size' in request.args else 30
        skip = int(request.args["page"])*page_size if 'page' in request.args and id is None else 0
        tokens = list (mainDatabase['AuthTokens'].find( { 'uid': current_user['_id'] }, limit = page_size, skip = skip ))

        count_response = list(mainDatabase['AuthTokens'].aggregate([{ '$match': { 'uid': current_user['_id'] } }, { '$count': 'count' }]))
        results_count = count_response[0]['count'] if len(count_response) > 0 else 0
    
        return {
            'pages': math.ceil(results_count/page_size),
            'count': results_count,
            'results': tokens
        }
    
    else:
        tokens = list (mainDatabase['AuthTokens'].find( { 'uid': current_user['_id'], '_id': id }))
        if len(tokens) == 0: return { 'error': 'resource_not_found' }, 404

        mainDatabase['AuthTokens'].delete_one( { 'uid': current_user['_id'], '_id': id })
        return tokens[0]