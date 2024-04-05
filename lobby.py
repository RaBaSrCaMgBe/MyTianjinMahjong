import socketserver
import json


class Lobby:
    def __init__(self):
        self.cur_room_user_cnt = 0
        self.cur_room_port = None
        self.available_room = [i for i in range(10001, 10010)]

    def create_room(self):
        self.cur_room_user_cnt = 0
        if self.available_room:
            self.cur_room_port = self.available_room.pop()


class LobbyServerHandler(socketserver.BaseRequestHandler):

    def handle(self):
        print(str(self.request.recv(1024), 'utf-8'))
        res_line = "HTTP/1.1 200 OK \r\n"
        res_header = "Server:pwd\r\n"
        res_body = "hello"
        res_data = (res_line + res_header + "\r\n" + res_body).encode()
        print(res_data)
        self.request.sendall(res_data)

        if lobby.cur_room_port is None or lobby.cur_room_user_cnt == 4:
            lobby.create_room()
        lobby.cur_room_user_cnt += 1
        print(lobby.cur_room_user_cnt)
        response = bytes(str(lobby.cur_room_port), 'utf-8')
        self.request.sendall(response)

class LobbyServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass

if __name__ == '__main__':
    HOST, PORT = 'localhost', 9999
    lobby = Lobby()
    with LobbyServer((HOST, PORT), LobbyServerHandler) as server:
        server.serve_forever()
