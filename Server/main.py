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

@app.route('/storage/<path:path>', methods=["POST", "GET", "DELETE"])
def storage_service(path):
    if request.method == "POST":
        file = request.files['file']
        dir = os.path.dirname(f'storage/{path}')
        if not os.path.exists(dir): os.mkdir(dir)
        file.save('storage/' + path)
        return {}, 200
    elif request.method == "GET":
        if not os.path.exists(f'storage/{path}'): abort(404)
        return send_file(f'storage/{path}', as_attachment=True)
    elif request.method == "DELETE":
        if not os.path.exists(f'storage/{path}'): abort(404)
        os.remove(f'storage/{path}')
        return {}, 200

@app.route('/files/<path:path>', methods=["GET"])
def files_service(path):
	if not os.path.exists(f'storage/{path}'): abort(404)
	return send_file(f'storage/{path}', as_attachment=False)

if __name__ == '__main__':
	app.run(debug=True)
