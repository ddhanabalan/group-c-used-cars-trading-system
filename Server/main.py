#!.venv/bin/python3

import os
from flask import Flask, abort, request, send_file, url_for
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
app.secret_key = "ABCDEFGH"
CORS(app)

username = "admin"
password = "ptUJ75ehwYIYZ3cG"
uri = f"mongodb+srv://{username}:{password}@cluster0.wtgjxax.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)

@app.route('/')
def index():
    return send_file('static/index.html')

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
        'img_urls': 1
    }

    result = client['MilesmartMain']['Car'].find(filter=filter, projection=project, skip=skip, limit=30)
    return list(result)

@app.route('/vehicle/<int:id>', methods=['GET'])
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
    
    return result[0] if len(result) > 0 else abort(404)

# Storage Functions
def get_path(mkdir:bool = False)->tuple[str|None, int]:
    if not 'path' in request.args: return None, 1

    path = request.args['path']
    if path.startswith('/'): return None, 1

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
    if not os.path.exists(dir): abort(404)

    return send_file(abs_path, as_attachment=False)

if __name__ == '__main__':
    app.run(debug=True)
