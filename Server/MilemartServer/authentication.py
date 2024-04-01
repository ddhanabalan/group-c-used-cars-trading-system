import datetime
import os
import time
from typing import Any
from googleapiclient.discovery import build
from flask import abort, redirect, request, send_file, url_for
import google_auth_oauthlib
import jwt
import requests
from . import milemartServer, mongodbClient

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
CLIENT_SECRETS_FILE = "Server/client_secret.json"
SCOPES = [
    'openid', 
    'https://www.googleapis.com/auth/userinfo.profile', 
    'https://www.googleapis.com/auth/userinfo.email', 
    'https://www.googleapis.com/auth/user.emails.read', 
    'https://www.googleapis.com/auth/user.phonenumbers.read',
    'https://www.googleapis.com/auth/user.addresses.read',
    'https://www.googleapis.com/auth/user.gender.read',
]

def generate_id() -> str:
    code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+_"
    string = ""
    n = int(time.time()*100000)
    while n>0:
        rem = n%64
        n //= 64
        string = code[rem] + string
    return string

def find_primary_field(src: list[dict[str, Any]]) -> dict[str, Any]|None:
    for field in src:
        if field['metadata']['primary']: return field
    return None

@milemartServer.route('/client_code', methods=['GET'])
def client_code():
    if request.authorization == None: abort(401)
    if request.authorization.type != 'basic': abort(401)
    if request.authorization.username != 'clientweb1': abort(401)
    if request.authorization.password != 'password1': abort(401)

    id = generate_id()
    mongodbClient['MilesmartMain']['ClientCodes'].insert_one({
        'timestamp': datetime.datetime.now(datetime.UTC),
        'code': id
    })

    return { 'client_code': id }

@milemartServer.route('/login', methods=['GET'])
def login():
    if 'client_code' not in request.args: abort(400)
    
    client_code = request.args['client_code']
    client_code_query = list(mongodbClient['MilesmartMain']['ClientCodes'].find({
        'code': client_code
    }))

    if len(client_code_query) == 0: abort(401)

    token_query = list(mongodbClient['MilesmartMain']['UserTokens'].find({
        '_id': client_code
    }))

    if len(token_query) != 0: 
        user_data_query = list(mongodbClient['MilesmartMain']['User'].find({
            '_id': token_query[0]['uid']
        }))
        user_data = user_data_query[0]
        return redirect(url_for('summary', user_name=user_data['name'], user_email=user_data['email'], user_dp=user_data['picture'], user_phone=user_data['phone']['value'] if user_data['phone'] is not None else 'Phone Unavailable'))
    
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
      CLIENT_SECRETS_FILE, scopes=SCOPES)
    
    flow.redirect_uri = url_for('oauth2callback', _external=True)

    authorization_url, state = flow.authorization_url(
      access_type='offline',
      include_granted_scopes='true',
      state=client_code)

    return redirect(authorization_url)
    # return {}

@milemartServer.route('/oauth2callback')
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

    userinfo_response = requests.request(
        method='GET',
        url='https://www.googleapis.com/oauth2/v2/userinfo',
        headers={ 'Authorization': f'Bearer {flow.credentials.token}' }
    )

    userinfo = userinfo_response.json()

    user_query = list(mongodbClient['MilesmartMain']['User'].find({
        '_id': userinfo['id']
    }))

    if len(user_query) != 1:
        profile_response = requests.request(
            method='GET',
            url='https://people.googleapis.com/v1/people/me?personFields=addresses,genders,phoneNumbers',
            headers={ 'Authorization': f'Bearer {flow.credentials.token}' }
        )

        profile = profile_response.json()
        
        user_data = {
            '_id': userinfo['id'],
            'name': userinfo['name'],
            'first_name': userinfo['given_name'],
            'email': userinfo['email'],
            'picture': userinfo['picture'],
            'address': find_primary_field(profile['addresses']) if 'addresses' in profile else None,
            'gender': find_primary_field(profile['genders']) if 'genders' in profile else None,
            'phone': find_primary_field(profile['phoneNumbers']) if 'phoneNumbers' in profile else None,
            'role': 'User'
        }

        mongodbClient['MilesmartMain']['User'].insert_one(user_data)
    else: user_data = user_query[0]
    
    print(user_data)

    token = jwt.encode({
        'uid': user_data['_id'],
        'role': user_data['role'], 
    }, milemartServer.config['SECRET_KEY'])

    mongodbClient['MilesmartMain']['UserTokens'].insert_one({
        '_id': state,
        'uid': user_data['_id'],
        'timestamp': datetime.datetime.now(datetime.UTC),
        'token': token
    })

    return redirect(url_for('summary', user_name=user_data['name'], user_email=user_data['email'], user_dp=user_data['picture'], user_phone=user_data['phone']['value'] if user_data['phone'] is not None else 'Phone Unavailable'))

@milemartServer.route('/token')
def token():
    if 'client_code' not in request.args: abort(400)

    client_code = request.args['client_code']

    token_query = list(mongodbClient['MilesmartMain']['UserTokens'].find({
        '_id': client_code
    }))

    if len(token_query) == 0: abort(401)

    return {
        'token': token_query[0]['token']
    }

@milemartServer.route('/summary')
@milemartServer.route('/summary/<path:filename>')
def summary(filename:str|None = None):
    if filename is None: return send_file('../ui/index.html')
    else: return send_file(f'../ui/{filename}')