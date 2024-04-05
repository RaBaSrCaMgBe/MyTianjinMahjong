import socket
import threading
import sys
import json


def prepare():
    while True:
        tmp = input("用户操作为: ")
        sock.sendall(bytes(tmp + ' ' + sys.argv[1], "utf-8"))


if __name__ == '__main__':
    t = threading.Thread(target=prepare)

    HOST, PORT = "localhost", 9999
    data = "join " + sys.argv[1]

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((HOST, PORT))
        sock.sendall(bytes(data, "utf-8"))
        received = str(sock.recv(1024), "utf-8").strip()
        print("Sent:     {}".format(data))
        print("Received: {}".format(received))
        t.start()
        while True:
            received = str(sock.recv(1024), "utf-8").strip()
            received = json.loads(received)
            print(received)
            if received['type'] == 'start':
                sock.sendall(bytes('ok', "utf-8"))
                break
            else:
                # 更新显示
                pass

        while True:
            received = str(sock.recv(1024), "utf-8").strip()
            received = json.loads(received)
            print(received)




