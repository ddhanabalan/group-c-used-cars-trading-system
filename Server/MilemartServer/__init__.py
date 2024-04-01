from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient

milemartServer = Flask(__name__)
milemartServer.secret_key = "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"
CORS(milemartServer)

__username = "admin"
__password = "ptUJ75ehwYIYZ3cG"
__uri = f"mongodb+srv://{__username}:{__password}@cluster0.wtgjxax.mongodb.net/?retryWrites=true&w=majority"
mongodbClient = MongoClient(__uri)

from . import vehicles, authentication, storage