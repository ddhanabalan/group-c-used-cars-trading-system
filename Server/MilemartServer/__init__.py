import time
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

def generate_id(id: int|None = None) -> str:
    code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~_"
    string = ""
    n = int(time.time()*100000) if id is None else id
    while n>0:
        rem = n%64
        n //= 64
        string = code[rem] + string
    return string

from . import vehicles, authentication, storage
