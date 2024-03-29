import time

def generate_id() -> str:
    code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    string = ""
    n = int(time.time()*100000)
    while n>0:
        rem = n%64
        n //= 64
        string = code[rem] + string
    return string