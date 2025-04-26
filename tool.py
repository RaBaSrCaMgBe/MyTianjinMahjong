from typing import List

# 比较牌值
# 若tile1大于tile2返回True
def compare_tiles(tile1, tile2):
    if tile1[1] == tile2[1]:
        return tile1[0] >= tile2[0]
    if tile1[1] == 'z':
        return True
    if tile1[1] == 's' and tile2[1] != 'z':
        return True
    if tile1[1] == 'p' and tile2[1] == 'm':
        return True
    return False

# 理牌
def sort_tiles(hand, low, high):
    pivot = hand[low]
    i = low
    j = high
    while j > i:
        while compare_tiles(hand[j], pivot) and j > i:
            j -= 1
        hand[i] = hand[j]
        while compare_tiles(pivot, hand[i]) and j > i:
            i += 1
        hand[j] = hand[i]
    hand[i] = pivot
    if i > low+1:
        sort_tiles(hand, low, i-1)
    if i+1 < high:
        sort_tiles(hand, i+1, high)

# 判断某张牌是否为混儿
def is_wild_tile(tile, global_wild_tile):
    # 不同花色
    if tile[1] != global_wild_tile[1]:
        return False
    # 同花色同序数
    if tile == global_wild_tile:
        return True
    # 该牌非字牌
    if tile[1] != 'z':
        if int(tile[0])-1 == int(global_wild_tile[0]) % 9:
            return True
        return False
    # 该牌为东南西北
    if int(tile[0]) < 5:
        if int(global_wild_tile[0]) > 4:
            return False
        if int(tile[0])-1 == int(global_wild_tile[0]) % 4:
            return True
        return False
    # 该牌为中发白
    if int(global_wild_tile[0]) < 5:
        return False
    if int(tile[0])-5 == (int(global_wild_tile[0])-4) % 3:
        return True
    return False

# 判断是否为龙
def is_dragon(completed_hand, global_wild_tile):
    m_dragon = [0, 0, 0]
    p_dragon = [0, 0, 0]
    s_dragon = [0, 0, 0]
    wild_dragon = 0
    for meld in completed_hand:
        if 'z' in meld:
            continue
        if meld[0] == meld[2] and meld[0][0] != '0':
            continue
        cnt = meld.count('0')
        if cnt == 0:
            tmp = int(meld[0])
            if tmp in [1, 4, 7]:
                if meld[1] == 'm':
                    m_dragon[(tmp-1)//3] = 1
                elif meld[1] == 'p':
                    p_dragon[(tmp-1)//3] = 1
                elif meld[1] == 's':
                    s_dragon[(tmp-1)//3] = 1
        elif cnt == 1:
            tmp = int(meld[0])
            if tmp in [1, 2, 4, 5, 7, 8]:
                if meld[1] == 'm':
                    m_dragon[tmp//3] = 1
                elif meld[1] == 'p':
                    p_dragon[tmp//3] = 1
                elif meld[1] == 's':
                    s_dragon[tmp//3] = 1
        elif cnt == 2:
            tmp = int(meld[0])
            if meld[1] == 'm':
                m_dragon[(tmp-1)//3] = 1
            elif meld[1] == 'p':
                p_dragon[(tmp-1)//3] = 1
            elif meld[1] == 's':
                s_dragon[(tmp-1)//3] = 1
        else:
            wild_dragon += 1
    dragon_type = 0
    if m_dragon[0] + m_dragon[1] + m_dragon[2] + wild_dragon >= 3:
        # 万子龙
        if global_wild_tile[1] == 'm':
            return 2
        dragon_type = 1
    if p_dragon[0] + p_dragon[1] + p_dragon[2] + wild_dragon >= 3:
        # 饼子龙
        if global_wild_tile[1] == 'p':
            return 2
        dragon_type = 1
    if s_dragon[0] + s_dragon[1] + s_dragon[2] + wild_dragon >= 3:
        # 条子龙
        if global_wild_tile[1] == 's':
            return 2
        dragon_type = 1
    # 不是龙
    return dragon_type

# 判断是否捉五
def is_catching_five(completed_hand, draw, global_wild_tile):
    # 返回值包含一个列表(用于表示所有形成双混儿五的面子)以及捉五类型
    if draw != '5m' and not is_wild_tile(draw, global_wild_tile):
        return 0, ''
    double_wild_tanki_catching_five_comb = []
    catching_five_type_with_max_score = 0
    for meld in completed_hand:
        if 'z' in meld:
            continue
        if meld[0] == meld[2] and meld[0][0] != '0':
            continue
        cnt = meld.count('0')
        if cnt == 0 and meld[:2] == '4m' and draw == '5m':
            # 46m摸5m的情况
            catching_five_type_with_max_score = 1
        elif cnt == 1:
            if meld[:4] == '4m6m' and is_wild_tile(draw, global_wild_tile):
                # 46m摸混儿的情况
                catching_five_type_with_max_score = 1
            if meld[:4] in ['4m5m', '5m6m'] and draw == '5m':
                # 4m+混儿 混儿+6m 摸5m的情况
                catching_five_type_with_max_score = 1
        elif cnt == 2 and meld[:2] in ['4m', '5m', '6m']:
            if draw == '5m':
                # 双混儿摸5m 此时为双混儿五
                double_wild_tanki_catching_five_comb.append(meld)
                catching_five_type_with_max_score = 2
            else:
                # 4m+混儿 混儿+6m 摸混儿
                catching_five_type_with_max_score = 1
        elif cnt == 3:
            # 双混儿摸混儿
            double_wild_tanki_catching_five_comb.append(meld)
            catching_five_type_with_max_score = 2

    return double_wild_tanki_catching_five_comb, catching_five_type_with_max_score

# 判断是否为双混儿捉五龙
def is_double_wild_tanki_catching_five_dragon(double_wild_tanki_catching_five_comb, completed_hand : List[str],
                                              global_wild_tile):
    for meld in double_wild_tanki_catching_five_comb:
        tmp_completed_hand = completed_hand.copy()
        tmp_completed_hand.remove(meld)
        if is_dragon(tmp_completed_hand, global_wild_tile):
            # 去掉摸牌的搭子依然是龙 此时一定为双混儿捉五龙
            return True
    return False