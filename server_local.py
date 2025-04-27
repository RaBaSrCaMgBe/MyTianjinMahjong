import asyncio
import json
import websockets
from websockets import ConnectionClosedOK

from room import Room
from player import Player
from typing import List

room_list: List[Room] = []

async def handle_room_server(websocket):
    cur_id = ''
    room_idx = -1
    while True:
        try:
            received = await websocket.recv()
        except websockets.ConnectionClosedOK:
            # 用户退出房间
            try:
                player_idx = room_list[room_idx].player_list.index(cur_id)
            except ValueError:
                return
            room_list[room_idx].player_list[player_idx] = ''
            if room_list[room_idx].player_prepare[player_idx] == 1:
                room_list[room_idx].prepared_player_cnt -= 1
            room_list[room_idx].player_prepare[player_idx] = 0
            room_list[room_idx].client_list[player_idx] = None
            room_list[room_idx].player_cnt -= 1
            # 广播有玩家退出房间的消息
            await room_list[room_idx].broadcast_room_status()
            return

        received = json.loads(received)
        print(received)

        # 检查当前是否还有空闲房间
        if room_idx < 0:
            if not room_list:
                room_list.append(Room())
                room_idx = 0
            elif room_list[-1].player_cnt == 4:
                room_list.append(Room())
                room_idx = len(room_list) - 1
            else:
                room_idx = len(room_list) - 1
        game = room_list[room_idx].game

        await room_list[room_idx].room_lock.acquire()
        if received['type'] == 'join':
            cur_id = received['user_id']
            player_idx = room_list[room_idx].player_list.index('')
            room_list[room_idx].player_list[player_idx] = cur_id
            room_list[room_idx].client_list[player_idx] = websocket
            room_list[room_idx].player_cnt += 1
            # 广播有新玩家加入房间的消息
            await room_list[room_idx].broadcast_room_status()
        elif received['type'] == 'prepare':
            player_idx = room_list[room_idx].player_list.index(received['user_id'])
            room_list[room_idx].player_prepare[player_idx] = 1
            room_list[room_idx].prepared_player_cnt += 1
            # 广播有玩家准备的消息
            await room_list[room_idx].broadcast_room_status()
        elif received['type'] == 'unprepare':
            player_idx = room_list[room_idx].player_list.index(received['user_id'])
            room_list[room_idx].player_prepare[player_idx] = 0
            room_list[room_idx].prepared_player_cnt -= 1
            # 广播有玩家取消准备的消息
            await room_list[room_idx].broadcast_room_status()

        # 检测准备人数是否为4
        if room_list[room_idx].prepared_player_cnt == 4 and not room_list[room_idx].game_active:
            room_list[room_idx].game_active = True
            response = json.dumps({'type': 'start'})
            for client in room_list[room_idx].client_list:
                await client.send(response)
            print("游戏成功启动")
            received = await websocket.recv()
            received = json.loads(received)
            print(received)

        if room_list[room_idx].game_active:
            room_list[room_idx].room_lock.release()
            break

        room_list[room_idx].room_lock.release()

    # 游戏启动
    # 实例化玩家对象
    await room_list[room_idx].room_lock.acquire()
    tmp_player = Player(cur_id)
    cur_position = len(game.player_list)
    game.player_list.append(tmp_player)
    game.player_lock.append(asyncio.Semaphore(0))
    game.client_idx.append(player_idx)
    room_list[room_idx].room_lock.release()
    # 所有玩家已就绪 传递玩家座次信息
    await room_list[room_idx].room_barrier.wait()
    print("所有玩家准备就绪")
    response = {'type': 'sit_info', 'sit': []}
    for player in game.player_list:
        response['sit'].append(player.user_id)
    response = json.dumps(response)
    await websocket.send(response)

    # 开始游戏
    while True:
        try:
            # 开始新一轮游戏并初始化信号量
            received = await websocket.recv()
            await room_list[room_idx].room_lock.acquire()
            if game.status == 0:
                game.init_a_new_round()
                game.status = 1
                game.player_lock[game.dealer_pos].release()
                room_list[room_idx].room_barrier = asyncio.Barrier(4)
            if game.status == 1:
                response = {
                    'type': 'init_hand',
                    'hand': [],
                    'wild_card': game.wild_card,
                    'dealer_pos': game.dealer_pos,
                    'match_no': game.match_no
                }
                for tile in game.player_list[cur_position].hand:
                    response['hand'].append(tile)
                response = json.dumps(response)
                await websocket.send(response)
            elif game.status == 2:
                break
            room_list[room_idx].room_lock.release()
            await room_list[room_idx].room_barrier.wait()
            # 开始一轮游戏
            while True:
                # 拿锁
                await game.player_lock[cur_position].acquire()
                if game.status == 1:
                    # 若游戏还在进行 则表示该玩家进入回合 开始操作
                    await game.step(websocket, room_list[room_idx].client_list)
                    # 归还锁
                    if game.status == 1:
                        # 若游戏还在进行 则解开下回合行动玩家的锁
                        game.player_lock[game.turn].release()
                    else:
                        # 否则归还所有人的锁 以便进入下一轮
                        for i in range(4):
                            if i == cur_position:
                                continue
                            game.player_lock[i].release()
                        break
                else:
                    # 本轮游戏结束 退出循环
                    break
        except ConnectionClosedOK:
            room_list[room_idx] = Room()
            break

async def main():
    async with websockets.serve(handle_room_server, "", 9999):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())