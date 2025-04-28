import copy
from tool import is_wild_tile, is_catching_five, is_dragon, is_double_wild_tanki_catching_five_dragon

def check_hand(hand, completed_hand, draw, global_wild_tile, is_rinshan):
    # 判断玩家手牌是否满足和牌型
    score = 0
    pattern = []
    best_hand = []
    # 把混儿挑出来
    normal_hand = []             # 不包含混儿的手牌
    num_wild_card_total = 0      # 混儿的数量
    for tile in hand:
        if is_wild_tile(tile, global_wild_tile):
            num_wild_card_total += 1
        else:
            normal_hand.append(tile)
    len_normal_hand = len(normal_hand)        # 去除混儿之后的手牌数
    is_selected_tile = [0] * len_normal_hand  # 记录每个手牌被选取的情况
    num_wild_card = num_wild_card_total

    # 找出可能的雀头
    eyes_idx = 0           # 用来遍历手牌选择雀头的索引
    eyes_melds_stack = []  # 用来遍历搜索雀头/面子的栈 其中元素为[所用牌的索引, 混儿的数量, 遍历层数]
    while eyes_idx < len_normal_hand:
        if num_wild_card >= 1:
            # 若混儿的数量大于等于1 则将该牌和混儿组成雀头
            eyes_melds_stack.append([[eyes_idx], 1, 0])
        if eyes_idx < len_normal_hand - 1 and normal_hand[eyes_idx] == normal_hand[eyes_idx + 1]:
            # 若该牌和下一张牌一样 则用这两张牌组成雀头
            eyes_melds_stack.append([[eyes_idx, eyes_idx + 1], 0, 0])
            # 找出下一张与该牌不同的牌
            next_diff_tile_idx = eyes_idx + 2
            while next_diff_tile_idx < len_normal_hand and normal_hand[next_diff_tile_idx] == normal_hand[eyes_idx]:
                next_diff_tile_idx += 1
            eyes_idx = next_diff_tile_idx
        else:
            eyes_idx += 1
    if num_wild_card >= 2:
        # 若混儿的数量大于等于2 则将两张混儿组成雀头
        eyes_melds_stack.append([[], 2, 0])

    # 找出可能的面子
    while eyes_melds_stack:
        # 取栈顶元素
        tmp_stack_item = eyes_melds_stack[-1]
        # 将栈顶元素中用到的牌挑出来
        tmp_eyes_meld = ''  # 栈顶元素对应的搭子
        for selected_tile_idx in tmp_stack_item[0]:
            is_selected_tile[selected_tile_idx] = 1
            tmp_eyes_meld += normal_hand[selected_tile_idx]
        tmp_eyes_meld += '0a' * tmp_stack_item[1]
        completed_hand.append(tmp_eyes_meld)
        # 将混儿挑出来
        num_wild_card -= tmp_stack_item[1]
        # 寻找第一张未被选中的牌
        try:
            tile_idx = is_selected_tile.index(0)
        except ValueError:
            # 手牌中所有牌均已选中 此时必然和牌 进入役种判断程序
            tmp_score, tmp_pattern = check_pattern(completed_hand, num_wild_card_total, draw, global_wild_tile, is_rinshan)
            if tmp_score > score:
                score = tmp_score
                pattern = tmp_pattern
                best_hand = copy.deepcopy(completed_hand)
            eyes_melds_stack.pop()
            for selected_tile_idx in tmp_stack_item[0]:
                is_selected_tile[selected_tile_idx] = 0
            completed_hand.pop()
            num_wild_card += tmp_stack_item[1]

            while eyes_melds_stack and eyes_melds_stack[-1][2] != tmp_stack_item[2]:
                # 若当前出栈元素为该层最后一个元素 则将下一个元素也出栈
                tmp_stack_item = eyes_melds_stack.pop()
                for selected_tile_idx in tmp_stack_item[0]:
                    is_selected_tile[selected_tile_idx] = 0
                completed_hand.pop()
                num_wild_card += tmp_stack_item[1]
            continue

        new_meld_found = False
        # 寻找由第一张牌组成的顺子
        if normal_hand[tile_idx][1] != 'z':
            chow = find_meld(normal_hand, is_selected_tile, tile_idx, 'chow_0w', tmp_stack_item[2] + 1)
            if chow[0]:
                eyes_melds_stack.append(chow)
                new_meld_found = True
            if num_wild_card >= 1:
                chow = find_meld(normal_hand, is_selected_tile, tile_idx, 'chow_1w_f', tmp_stack_item[2] + 1)
                if chow[0]:
                    eyes_melds_stack.append(chow)
                    new_meld_found = True
                chow = find_meld(normal_hand, is_selected_tile, tile_idx, 'chow_1w_s', tmp_stack_item[2] + 1)
                if chow[0]:
                    eyes_melds_stack.append(chow)
                    new_meld_found = True

        # 寻找由第一张牌组成的刻子
        pong = find_meld(normal_hand, is_selected_tile, tile_idx, 'pong_0w', tmp_stack_item[2] + 1)
        if pong[0]:
            eyes_melds_stack.append(pong)
            new_meld_found = True
        if num_wild_card >= 1:
            pong = find_meld(normal_hand, is_selected_tile, tile_idx, 'pong_1w', tmp_stack_item[2] + 1)
            if pong[0]:
                eyes_melds_stack.append(pong)
                new_meld_found = True

        # 由第一张牌和两张混儿组成的面子
        if num_wild_card >= 2:
            eyes_melds_stack.append([[tile_idx], 2, tmp_stack_item[2] + 1])
            new_meld_found = True

        # 由三张混儿组成的面子
        if num_wild_card >= 3:
            eyes_melds_stack.append([[], 3, tmp_stack_item[2] + 1])
            new_meld_found = True

        if not new_meld_found:
            # 若未找到新面子 则执行出栈操作 归还已占有的牌
            eyes_melds_stack.pop()
            for selected_tile_idx in tmp_stack_item[0]:
                is_selected_tile[selected_tile_idx] = 0
            completed_hand.pop()
            num_wild_card += tmp_stack_item[1]

            while eyes_melds_stack and eyes_melds_stack[-1][2] != tmp_stack_item[2]:
                # 若当前出栈元素为该层最后一个元素 则将下一个元素也出栈
                tmp_stack_item = eyes_melds_stack.pop()
                for selected_tile_idx in tmp_stack_item[0]:
                    is_selected_tile[selected_tile_idx] = 0
                completed_hand.pop()
                num_wild_card += tmp_stack_item[1]

    print(score)
    print(pattern)
    print(best_hand)
    return score, pattern

def find_meld(normal_hand, is_selected_tile, tile_idx, mode, layer):
    len_normal_hand = len(normal_hand)
    if mode == 'chow_0w':
        # 不包含混儿的顺子
        first_diff_tile_idx = tile_idx + 1
        while first_diff_tile_idx < len_normal_hand \
                and (normal_hand[first_diff_tile_idx] == normal_hand[tile_idx] or is_selected_tile[first_diff_tile_idx]):
            first_diff_tile_idx += 1
        if first_diff_tile_idx == len_normal_hand \
                or normal_hand[first_diff_tile_idx][1] != normal_hand[tile_idx][1] \
                or int(normal_hand[first_diff_tile_idx][0]) != int(normal_hand[tile_idx][0]) + 1:
            return [[], 0, 0]
        second_diff_tile_idx = first_diff_tile_idx + 1
        while second_diff_tile_idx < len_normal_hand \
                and (normal_hand[second_diff_tile_idx] == normal_hand[first_diff_tile_idx] or is_selected_tile[second_diff_tile_idx]):
            second_diff_tile_idx += 1
        if second_diff_tile_idx == len_normal_hand \
                or normal_hand[second_diff_tile_idx][1] != normal_hand[tile_idx][1] \
                or int(normal_hand[second_diff_tile_idx][0]) != int(normal_hand[tile_idx][0]) + 2:
            return [[], 0, 0]
        return [[tile_idx, first_diff_tile_idx, second_diff_tile_idx], 0, layer]
    elif mode == 'chow_1w_f':
        # 包含一张混儿的顺子 混儿当第三张牌
        first_diff_tile_idx = tile_idx + 1
        while first_diff_tile_idx < len_normal_hand \
                and (normal_hand[first_diff_tile_idx] == normal_hand[tile_idx] or is_selected_tile[first_diff_tile_idx]):
            first_diff_tile_idx += 1
        if first_diff_tile_idx == len_normal_hand \
                or normal_hand[first_diff_tile_idx][1] != normal_hand[tile_idx][1] \
                or (int(normal_hand[first_diff_tile_idx][0]) != int(normal_hand[tile_idx][0]) + 1 \
                and int(normal_hand[first_diff_tile_idx][0]) != int(normal_hand[tile_idx][0]) + 2):
            return [[], 0, 0]
        return [[tile_idx, first_diff_tile_idx], 1, layer]
    elif mode == 'chow_1w_s':
        # 包含一张混儿的顺子 混儿当第二张牌
        first_diff_tile_idx = tile_idx + 1
        while first_diff_tile_idx < len_normal_hand \
                and (normal_hand[first_diff_tile_idx] == normal_hand[tile_idx] or is_selected_tile[first_diff_tile_idx]):
            first_diff_tile_idx += 1
        if first_diff_tile_idx == len_normal_hand \
                or normal_hand[first_diff_tile_idx][1] != normal_hand[tile_idx][1] \
                or int(normal_hand[first_diff_tile_idx][0]) != int(normal_hand[tile_idx][0]) + 1:
            return [[], 0, 0]
        second_diff_tile_idx = first_diff_tile_idx + 1
        while second_diff_tile_idx < len_normal_hand \
                and (normal_hand[second_diff_tile_idx] == normal_hand[first_diff_tile_idx] or is_selected_tile[second_diff_tile_idx]):
            second_diff_tile_idx += 1
        if second_diff_tile_idx == len_normal_hand \
                or normal_hand[second_diff_tile_idx][1] != normal_hand[tile_idx][1] \
                or int(normal_hand[second_diff_tile_idx][0]) != int(normal_hand[tile_idx][0]) + 2:
            return [[], 0, 0]
        return [[tile_idx, second_diff_tile_idx], 1, layer]
    elif mode == 'pong_0w':
        # 不包含混儿的刻子
        first_diff_tile_idx = tile_idx + 1
        while first_diff_tile_idx < len_normal_hand and is_selected_tile[first_diff_tile_idx]:
            first_diff_tile_idx += 1
        if first_diff_tile_idx == len_normal_hand \
                or normal_hand[first_diff_tile_idx] != normal_hand[tile_idx]:
            return [[], 0, 0]
        second_diff_tile_idx = first_diff_tile_idx + 1
        while second_diff_tile_idx < len_normal_hand and is_selected_tile[second_diff_tile_idx]:
            second_diff_tile_idx += 1
        if second_diff_tile_idx == len_normal_hand \
                or normal_hand[second_diff_tile_idx] != normal_hand[tile_idx]:
            return [[], 0, 0]
        return [[tile_idx, first_diff_tile_idx, second_diff_tile_idx], 0, layer]
    elif mode == 'pong_1w':
        # 包含一张混儿的刻子
        first_diff_tile_idx = tile_idx + 1
        while first_diff_tile_idx < len_normal_hand and is_selected_tile[first_diff_tile_idx]:
            first_diff_tile_idx += 1
        if first_diff_tile_idx == len_normal_hand \
                or normal_hand[first_diff_tile_idx] != normal_hand[tile_idx]:
            return [[], 0, 0]
        return [[tile_idx, first_diff_tile_idx], 1, layer]

def check_pattern(completed_hand, num_wild_card_total, draw, global_wild_tile, is_rinshan):
    # print(completed_hand)
    # print(num_wild_card)
    # print(draw)
    # print(global_wild_tile)
    # print(is_rinshan)
    pattern = []
    base_score = 1
    doubles = 1
    # 先补全手牌
    new_melds = 5 - len(completed_hand)
    for i in range(new_melds):
        completed_hand.append('0a0a0a')
    # 然后判定役种
    # 清
    if num_wild_card_total == 0:
        pattern.append('清')
        doubles *= 2
    # 杠开
    if is_rinshan:
        pattern.append('杠开')
        doubles *= 2
    # 龙
    if dragon_type := is_dragon(completed_hand, global_wild_tile):
        pattern.append('龙')
        base_score = 4
        if dragon_type == 2:
            pattern.append('本混儿')
            doubles *= 2
    # 混儿钓 1.雀头中包含混儿 2.a抓到的牌非混儿 雀头中包含抓到的牌 2.b抓到的牌为混儿 雀头为两个混儿
    has_wild_tanki = False
    if not is_wild_tile(draw, global_wild_tile) and draw + '0a' in completed_hand:
        pattern.append('混儿钓')
        doubles *= 2
        has_wild_tanki = True
    elif is_wild_tile(draw, global_wild_tile) and '0a0a' in completed_hand:
        pattern.append('混儿钓')
        doubles *= 2
        has_wild_tanki = True
    # 双混儿钓 摸上来的牌和两个混儿组成搭子
    has_double_wild_tanki = False
    if not is_wild_tile(draw, global_wild_tile) and draw + '0a0a' in completed_hand:
        has_double_wild_tanki = True
    elif is_wild_tile(draw, global_wild_tile) and '0a0a0a' in completed_hand:
        has_double_wild_tanki = True

    # 捉五 注意混儿钓和捉五不能共存 若没有龙则选捉五 其余情况选混儿钓
    double_wild_tanki_catching_five_comb, catching_five_type_with_max_score = is_catching_five(completed_hand, draw,
                                                                                               global_wild_tile)
    if catching_five_type_with_max_score:
        if has_wild_tanki or has_double_wild_tanki:
            if dragon_type == 0:
                # 当前满足混儿钓 而无法形成龙 此时不计混儿钓 计捉五/双混儿五
                if has_wild_tanki:
                    pattern.pop()
                    doubles = doubles // 2
                if catching_five_type_with_max_score == 1:
                    # 此时一定没龙 只能定捉五
                    pattern.append('捉五')
                    base_score = 3
                else:
                    pattern.append('双混儿五')
                    base_score = 6
            elif catching_five_type_with_max_score == 2:
                # 当前满足混儿钓龙 检查是否存在双混儿捉五龙
                if is_double_wild_tanki_catching_five_dragon(double_wild_tanki_catching_five_comb, completed_hand,
                                                             global_wild_tile):
                    pattern.append('双混儿五')
                    base_score = 7
                    doubles *= 2
                elif dragon_type != 2:
                    pattern.append('双混儿五')
                    base_score = 3
                    doubles *= 2
                    pattern.remove('龙')
        elif dragon_type:
            # 捉五龙
            pattern.append('捉五')
            base_score = 7
        elif catching_five_type_with_max_score == 2:
            # 双混儿五
            pattern.append('双混儿五')
            base_score = 6
        else:
            # 捉五
            pattern.append('捉五')
            base_score = 3

    # print(completed_hand)
    # print(pattern)
    # print(base_score * doubles)
    for i in range(new_melds):
        completed_hand.pop()

    return base_score * doubles, pattern

if __name__ == '__main__':
    # 手牌 = 1万1万 2-8饼 678条
    # hand = ['1p', '1p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '1z', '1z', '5m'] # 双混儿捉五本
    hand = ['4s', '4s', '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', '1z', '1z', '1z'] # 捉五本混儿龙
    # hand = ['1m', '1m', '1m', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '1z', '1z', '5m'] # 双混儿捉五龙
    # hand = ['4s', '4s', '1p', '1p', '1p', '4m', '4m', '5m', '7m', '8m', '9m', '1z', '1z', '1z']
    completed_hand = []
    # hand = ['4m', '5m', '6m', '3p', '4p', '5p', '2s', '4s', '4s', '5s', '6s', '7s', '8s', '9s']
    draw = '5m'
    global_wild_tile = '1m'
    is_rinshan = False
    check_hand(hand, completed_hand, draw, global_wild_tile, is_rinshan)
