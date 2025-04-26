import json
import random
from winning_card_detect import check_hand
from tool import sort_tiles, is_wild_tile


class Game:
    def __init__(self):
        self._init_tiles_stack()
        self.player_list = []               # 玩家列表
        self.client_idx = []            # 客户端索引 用来查找客户端 client_idx[玩家列表中编号] = client_list索引
        self.player_lock = []           # 用来控制玩家行动顺序的信号量
        self.dealer_pos = 0             # 亲家位置 可以通过这个判断目前是东几局
        self._repeat_cnt = 0            # 连庄次数 可以通过这个判断目前是几本场
        self.match_no = 0              # 第几圈
        self._cur_tile_idx = 0          # 下一张牌
        self.wild_card = ''            # 混儿指示牌
        self.status = 0                 # 当前局面 0.等待新一轮 1.游戏中 2.游戏结束
        self.turn = 0                  # 当前行动玩家
        self._round_pts = [0, 0, 0, 0]  # 本轮各玩家分数
        self.is_rinshan = False         # 是否岭上
        self.from_pon = False           # 是否处于碰完之后的状态

    def _init_tiles_stack(self):
        self.tiles_stack = []
        for suit in ['m', 'p', 's']:
            for number in range(9):
                for i in range(4):
                    self.tiles_stack.append(str(number+1)+suit)
        for number in range(7):
            for i in range(4):
                self.tiles_stack.append(str(number+1)+'z')
        return self.tiles_stack

    def _shuffle(self):
        random.shuffle(self.tiles_stack)

    def _deal(self):
        for player in self.player_list:
            for i in range(13):
                player.draw_a_tile(self.tiles_stack[self._cur_tile_idx])
                self._cur_tile_idx += 1
            player.sort_hand()

    def _end_a_round(self, from_win):
        for i, player in enumerate(self.player_list):
            player.reset(self._round_pts[i])

        if self.turn == self.dealer_pos and from_win:
            self._repeat_cnt += 1
        else:
            self.dealer_pos += 1
            if self.dealer_pos == 4:
                if self.match_no == 0:
                    self.match_no += 1
                    self.dealer_pos = 0
                else:
                    self.status = 2
                    print('游戏结束')
                    return
            self._repeat_cnt = 0

        self.status = 0

    def _get_valid_action_in_turn(self, ori_hand, completed_hand, draw, is_rinshan):
        actions = [0]
        # 检测是否和牌
        hand = ori_hand[:]
        sort_tiles(hand, 0, len(hand) - 1)
        score, pattern = check_hand(hand, completed_hand, draw, self.wild_card, is_rinshan)
        if pattern:
            actions.append(1)
        # 检测是否可以暗/明杠
        concealed_quad_option = []
        exposed_quad_option = []
        tmp = ''
        repeat_num = 0
        for tile in hand:
            if is_wild_tile(tile, self.wild_card):
                continue
            if tile == tmp:
                repeat_num += 1
                if repeat_num == 4:
                    concealed_quad_option.append(tmp)
                    if 2 not in actions:
                        actions.append(2)
            else:
                tmp = tile
                repeat_num = 1
                if tmp * 3 in completed_hand:
                    exposed_quad_option.append(tmp)
                    if 3 not in actions:
                        actions.append(3)
        return actions, score, pattern, concealed_quad_option, exposed_quad_option

    def _get_valid_action_off_turn(self, hand, discarded_tile):
        actions = []
        # 检测是否可以明杠
        if hand.count(discarded_tile) >= 3:
            actions.append(3)
        # 检测是否可以碰
        if hand.count(discarded_tile) >= 2:
            actions.append(4)
        return actions

    def init_a_new_round(self):
        self._cur_tile_idx = 0
        self._shuffle()
        self._deal()
        self.wild_card = self.tiles_stack[self._cur_tile_idx]
        self._cur_tile_idx += 1
        self._round_pts = [0, 0, 0, 0]
        self.turn = self.dealer_pos
        self.is_rinshan = False
        self.from_pon = False

    async def step(self, request, client_list):
        # 广播当前回合玩家
        response = json.dumps({'type': 'new_turn', 'player': self.turn})
        for client in client_list:
            await client.send(response)

        if not self.from_pon:
            # 摸牌
            draw = self.tiles_stack[self._cur_tile_idx]
            self.player_list[self.turn].draw_a_tile(draw)
            self._cur_tile_idx += 1

            # 获取手牌/副露 检测可执行操作
            hand, completed_hand = self.player_list[self.turn].get_hand()
            response = json.dumps({'type': 'draw', 'draw': draw})
            await request.send(response)
            actions, score, pattern, concealed_quad_option, exposed_quad_option = \
                self._get_valid_action_in_turn(hand, completed_hand, draw, self.is_rinshan)

            # 最后一张牌不能杠
            if self._cur_tile_idx == 136:
                if 2 in actions:
                    actions.remove(2)
                if 3 in actions:
                    actions.remove(3)
            # 打混儿之后无法和牌
            if self.player_list[self.turn].discard_wild_card:
                if 1 in actions:
                    actions.remove(1)

            # 处理用户操作相关信息
            info = {'type': 'act'}
            for action in actions:
                match action:
                    case 1:
                        info['score'] = score
                        info['pattern'] = pattern
                    case 2:
                        info['concealed_quad_option'] = concealed_quad_option
                    case 3:
                        info['exposed_quad_option'] = exposed_quad_option
            info['action'] = actions

            # 让用户进行决策
            selected_action, option = await self.player_list[self.turn].act(info, True, request)
            # 解析决策
            match selected_action:
                case 1:
                    # 和牌
                    for i in range(4):
                        if i == self.turn:
                            self._round_pts[i] += score * 3
                        else:
                            self._round_pts[i] -= score
                    response = {
                        'type': 'win',
                        'player': self.turn,
                        'pattern': pattern,
                        'score': score,
                        'round_pts': self._round_pts,
                        'hand': hand,
                        'completed_hand': completed_hand,
                        'draw': draw
                    }
                    response = json.dumps(response)
                    for client in client_list:
                        await client.send(response)
                    self._end_a_round(from_win=True)
                    return
                case 2:
                    # 暗杠
                    for i in range(4):
                        if i == self.turn:
                            self._round_pts[i] += 6
                        else:
                            self._round_pts[i] -= 2
                    self.is_rinshan = True
                    self.from_pon = False
                    response = json.dumps({'type': 'concealed_quad', 'player': self.turn, 'tile': option})
                    for client in client_list:
                        await client.send(response)
                    return
                case 3:
                    # 明杠
                    for i in range(4):
                        if i == self.turn:
                            self._round_pts[i] += 3
                        else:
                            self._round_pts[i] -= 1
                    self.is_rinshan = True
                    self.from_pon = False
                    response = json.dumps({'type': 'exposed_quad', 'player': self.turn, 'tile': option})
                    for client in client_list:
                        await client.send(response)
                    return
        else:
            # 玩家碰完之后执行操作
            selected_action, option = await self.player_list[self.turn].act({'type': 'act', 'action': [0]}, True, request)

        # 玩家打出了一张牌 广播这张牌
        response = json.dumps({'type': 'discard', 'player': self.turn, 'tile': option})
        for client in client_list:
            await client.send(response)
        # 修改岭上/碰状态
        self.is_rinshan = False
        self.from_pon = False
        # 若当前打出的是最后一张牌 则流局
        if self._cur_tile_idx == 136:
            response = {
                'type': 'exhaustive_draw',
                'round_pts': self._round_pts
            }
            response = json.dumps(response)
            for client in client_list:
                await client.send(response)
            self._end_a_round(from_win=False)
            return
        # 若当前打出的是混儿 则不进行任何响应
        if is_wild_tile(option, self.wild_card):
            self.player_list[self.turn].discard_wild_card = True
            self.turn = (self.turn + 1) % 4
            return
        
        # 响应玩家打出的牌
        for i, player in enumerate(self.player_list):
            if i == self.turn:
                continue
            hand, completed_hand = player.get_hand()
            if actions := self._get_valid_action_off_turn(hand, option):
                info = {'type': 'act'}
                if 3 in actions:
                    info['exposed_quad_option'] = [option]
                if 4 in actions:
                    info['pon_option'] = [option]
                actions.append(5)
                info['action'] = actions
                
                target_idx = self.client_idx[i]
                selected_action, option = await player.act(info, False, client_list[target_idx])
                match selected_action:
                    case 3:
                        for j in range(4):
                            if j == i:
                                self._round_pts[j] += 3
                            else:
                                self._round_pts[j] -= 1
                        response = json.dumps({'type': 'exposed_quad', 'player': i, 'tile': option})
                        for client in client_list:
                            await client.send(response)
                        self.is_rinshan = True
                        self.turn = i
                        return
                    case 4:
                        response = json.dumps({'type': 'pon', 'player': i, 'tile': option})
                        for client in client_list:
                            await client.send(response)
                        self.from_pon = True
                        self.turn = i
                        return
        
        # 打出的牌未被响应 轮次加1
        self.turn = (self.turn + 1) % 4
