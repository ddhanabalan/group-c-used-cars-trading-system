#!.venv/bin/python3

from MilemartServer import milemartServer

if __name__ == '__main__':
    milemartServer.run(debug=True, host='0.0.0.0')
