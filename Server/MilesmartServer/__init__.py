import time
from flask import Flask, Response
from flask_cors import CORS
from pymongo import MongoClient

milesmartServer = Flask(__name__)
milesmartServer.secret_key = "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"
CORS(milesmartServer)

__username = "admin"
__password = "ptUJ75ehwYIYZ3cG"
__uri = f"mongodb+srv://{__username}:{__password}@cluster0.wtgjxax.mongodb.net/?retryWrites=true&w=majority"
mongodbClient = MongoClient(__uri)
mainDatabase = mongodbClient['MilesmartMain2']

def generate_id(id: int|None = None) -> str:
    code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~_"
    string = ""
    n = int(time.time()*100000) if id is None else id
    while n>0:
        rem = n%64
        n //= 64
        string = code[rem] + string
    return string

@milesmartServer.route('/test')
def test():
    return Response(status=204)

from . import vehicles, authentication, storage, users, wishlist
