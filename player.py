from tool import sort_tiles
import json


class Player:
    def __init__(self, user_id):
        self.hand = []
        self.completed_hand = []
        self.score = 0
        self.user_id = user_id
        self.discard_wild_card = False

    def get_hand(self):
        return self.hand, self.completed_hand

    def reset(self, score):
        self.hand = []
        self.completed_hand = []
        self.score += score
        self.discard_wild_card = False

    def draw_a_tile(self, tile):
        self.hand.append(tile)

    def sort_hand(self):
        sort_tiles(self.hand, 0, len(self.hand) - 1)

    def _discard(self, tile):
        self.hand.remove(tile)

    def _pon(self, pon_tile):
        pon_str = ''
        for i in range(2):
            self.hand.remove(pon_tile)
            pon_str += pon_tile
        self.completed_hand.append(pon_str + pon_tile)

    def _kan(self, kan_tile, mode):
        if mode == 'concealed':
            kan_str = ''
            for i in range(4):
                self.hand.remove(kan_tile)
                kan_str += kan_tile
            self.completed_hand.append(kan_str)

        if mode == 'exposed_inturn':
            self.hand.remove(kan_tile)
            tmp = self.completed_hand.index(kan_tile * 3)
            self.completed_hand[tmp] += kan_tile

        if mode == 'exposed_offturn':
            kan_str = ''
            for i in range(3):
                self.hand.remove(kan_tile)
                kan_str += kan_tile
            self.completed_hand.append(kan_str + kan_tile)

    async def act(self, info, inturn, request):
        # 将信息转发给用户
        info['inturn'] = inturn
        response = json.dumps(info)
        await request.send(response)

        # 接受用户响应并解析
        received = await request.recv()
        received = json.loads(received)
        print(received)
        selected_action = int(received['selected_action'])
        option = received['option']

        match selected_action:
            case 0:
                self._discard(option)
            case 2:
                if len(info['concealed_quad_option']) == 1:
                    kan_tile = info['concealed_quad_option'][0]
                    self._kan(kan_tile, 'concealed')
                else:
                    kan_tile = option
                    self._kan(kan_tile, 'concealed')
            case 3:
                if inturn:
                    if len(info['exposed_quad_option']) == 1:
                        kan_tile = info['exposed_quad_option'][0]
                        self._kan(kan_tile, 'exposed_inturn')
                    else:
                        kan_tile = option
                        self._kan(kan_tile, 'exposed_inturn')
                if not inturn:
                    kan_tile = info['exposed_quad_option'][0]
                    self._kan(kan_tile, 'exposed_offturn')
            case 4:
                pon_tile = info['pon_option'][0]
                self._pon(pon_tile)

        return selected_action, option
