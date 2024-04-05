import asyncio
import json


class Room:
    def __init__(self):
        self.player_list = ['' for i in range(4)]
        self.client_list = [None for i in range(4)]
        self.player_prepare = [0 for i in range(4)]
        self.prepared_player_cnt = 0
        self.game_active = False
        self.room_lock = asyncio.Lock()
        self.room_barrier = asyncio.Barrier(4)

    async def broadcast_room_status(self):
        response = {'type': 'room_update', 'player_list': self.player_list, 'player_prepare': self.player_prepare}
        response = json.dumps(response)
        for client in self.client_list:
            if client is None:
                continue
            await client.send(response)

