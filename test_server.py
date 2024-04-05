from lobby import Lobby, LobbyServer, LobbyServerHandler
from room import Room, RoomServer, RoomServerHandler


if __name__ == '__main__':
    HOST, PORT = 'localhost', 9999
    lobby = Lobby()
    with RoomServer((HOST, PORT), RoomServerHandler) as server:
        server.serve_forever()