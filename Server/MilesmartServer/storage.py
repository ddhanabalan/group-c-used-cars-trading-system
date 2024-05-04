import math
import os
from flask import Response, abort, request, send_file

from .authentication import AUTH_PRIVILEGE_COADMIN, requiresAuthPrivilege, AUTH_PRIVILEGE_USER
from . import generate_id, milesmartServer, mainDatabase
from gridfs import GridFS

gfs = GridFS(mainDatabase)

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

@milesmartServer.route('/storage/upload', methods=['POST'])
def storage_upload():
    path, res = get_path(mkdir=True)
    if path is None: abort(400)
    if 'file' not in request.args: abort(400 if res == 1 else 404)

    file = request.files['file']
    file.save(path)
    return {}, 201

@milesmartServer.route('/storage/download', methods=['GET'])
def storage_download():
    path, res = get_path()
    if path is None: abort(400 if res == 1 else 404)

    print(path)
    return send_file(path, as_attachment=True)

@milesmartServer.route('/storage/remove', methods=['DELETE'])
def storage_remove():
    path, res = get_path()
    if path is None: abort(400 if res == 1 else 404)

    os.remove(path)
    return {}, 200

@milesmartServer.route('/file/<path:path>', methods=['GET'])
def storage_view(path: str):
    abs_path = os.path.abspath(os.path.join('Server/storage', path))
    dir = os.path.dirname(abs_path)
    if not os.path.exists(abs_path): abort(404)

    return send_file(abs_path, as_attachment=False)

@milesmartServer.route('/files/<id>', methods=['GET'])
def files_get(id:str):
    obj = mainDatabase['fs.files'].find_one({ '_id': id }, { 'filename': 1 })
    if obj == None: return { 'error': 'resource_not_found' }, 404 
    obj = dict(obj)

    return gfs.get(id).read(), 200, {
        'Content-Disposition': f'attachment; filename="{obj['filename']}"' if 'download' not in request.args or request.args['download'] == 'true' else 'inline',
        'Content-Type': 'image/png'
    }

@milesmartServer.route('/user/files', methods=['POST'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def user_files_post(current_user = None):
    if "file" not in request.files: return ({ "error": "form_args_file_not_found" }, 400)
    if "path" not in request.form: return ({ "error": "form_args_path_not_found" }, 400)

    path = request.form['path']
    file_ref = request.files['file']
    fid = generate_id()
    gfs.put(file_ref.stream.read(), filename=path, _id=fid, owner=current_user['_id'])

    match = {
        '$match': { '_id': fid }
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

    result = list(mainDatabase['fs.files'].aggregate([match, lookup, unwind, { "$project": { "chunkSize": 0 } }]))

    return result[0]

@milesmartServer.route('/user/files', methods=['GET'])
@milesmartServer.route('/user/files/<id>', methods=['GET'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def user_files_metadata_get(id: str = None, current_user = None):
    page_size = int(request.args["page_size"]) if 'page_size' in request.args else 30
    skip = int(request.args["page"])*page_size if 'page' in request.args and id is None else 0

    if id is None:
        search_key = request.args['sk'] if 'sk' in request.args else ''
        uid = current_user['_id']

        search_key_filter = [
            { 'path': { '$regex': search_key } },
            { 'owner': uid }
        ]
    
    match = {
        '$match': { 
            '$or': search_key_filter
        } if id is None else { '_id': id }
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

    result = list(mainDatabase['fs.files'].aggregate([match, lookup, unwind, { "$project": { "chunkSize": 0 } }, { '$skip': skip }, { '$limit': page_size }]))
        
    if id is None:
        count_response = list(mainDatabase['fs.files'].aggregate([match, { '$count': 'count' }]))
        results_count = count_response[0]['count'] if len(count_response) > 0 else 0

        # odo_list = list(filter(lambda i: i != -1, odo_list))

        rt_obj = {
            'pages': math.ceil(results_count/page_size),
            'count': results_count,
            'results': result
        }

        return rt_obj

    else:
        if len(result) <= 0: abort(404)
        return result[0]
    
@milesmartServer.route('/user/files/<id>', methods=['DELETE'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
def user_files_delete(id:str, current_user = None):
    obj = dict(mainDatabase['fs.files'].find_one({ '_id': id }, projection={ 'owner': 1 }))
    uid = current_user['_id']
    if obj['owner'] != uid: return { 'error': 'file_not_found' }, 404
    gfs.delete(id)
    return {}
    
# @milesmartServer.route('/user/files/<id>', methods=['PATCH'])
# @requiresAuthPrivilege(AUTH_PRIVILEGE_USER)
# def user_files_delete(id:str):
#     obj = dict(mainDatabase['fs.files'].find_one({ '_id': id }, projection={ 'owner': 1 }))
#     if obj['owner'] != get_current_user_id(): return { 'error': 'file_not_found' }, 404
    
#     if "file" not in request.files: return ({ "error": "form_args_file_not_found" }, 400)
#     if "path" not in request.form: return ({ "error": "form_args_path_not_found" }, 400)

#     path = request.form['path']
#     file_ref = request.files['file']
#     fid = generate_id()
#     gfs.put(file_ref.stream.read(), filename=path, _id=fid, owner=get_current_user_id())

#     match = {
#         '$match': { '_id': fid }
#     }

#     lookup = {
#         '$lookup': {
#             'from': 'User', 
#             'localField': 'owner', 
#             'foreignField': '_id', 
#             'as': 'owner'
#         }
#     }

#     unwind = { '$unwind': { 'path': '$owner' } }

#     result = list(mainDatabase['fs.files'].aggregate([match, lookup, unwind, { "$project": { "chunkSize": 0 } }]))

#     return result[0]
    
@milesmartServer.route('/files/<id>', methods=['DELETE'])
@requiresAuthPrivilege(AUTH_PRIVILEGE_COADMIN)
def user_files_admin_delete(id:str, current_user = None):
    gfs.delete(id)
    return {}