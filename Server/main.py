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

@app.route('/query/search', methods=['GET'])
def search():
    skip = int(request.args["page"])*30 if 'page' in request.args else 0
    
    project = {
        'manufacturer': 1, 
        'model': 1, 
        'price': 1, 
        'transmission': 1, 
        'fuel_type': 1, 
        'odometer': 1, 
        'state': 1, 
        'img_urls': 1
    }

    result = client['MilesmartMain']['Car'].find(projection=project, skip=skip, limit=30)
    return list(result)

@app.route('/query/vehicle/<int:id>', methods=['GET'])
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
    if path.startswith('/'): return None, 2

    abs_path = os.path.abspath(os.path.join('Server/storage', path))
    dir = os.path.dirname(abs_path)

    if not os.path.exists(dir):
        if mkdir: os.mkdir(dir)
        else: return None
    
    return abs_path

@app.route('/storage/upload', methods=['POST'])
def storage_upload():
    path, res = get_path(mkdir=True)
    if path is None: abort(400)
    if 'file' not in request.args: abort(400 if res is 1 else 404)

    file = request.files['file']
    file.save(path)
    return {}, 201

@app.route('/storage/download', methods=['GET'])
def storage_download():
    path, res = get_path()
    if path is None: abort(400 if res is 1 else 404)

    return send_file(path, as_attachment=True)

@app.route('/storage/remove', methods=['DELETE'])
def storage_remove():
    path, res = get_path()
    if path is None: abort(400 if res is 1 else 404)

    os.remove(path)
    return {}, 200

@app.route('/storage/<path:path>', methods=['GET'])
def storage_download(path: str):
    abs_path = os.path.abspath(os.path.join('Server/storage', path))
    dir = os.path.dirname(abs_path)
    if not os.path.exists(dir): abort(404)

    return send_file(path, as_attachment=False)

if __name__ == '__main__':
    app.run(debug=True)
