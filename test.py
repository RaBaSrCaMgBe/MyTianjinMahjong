from tool import sort_tiles
from winning_card_detect import check_hand

import random

# 初始化牌堆
tiles_stack = []
for suit in ['m', 'p', 's']:
    for number in range(9):
        for i in range(4):
            tiles_stack.append(str(number+1)+suit)
for number in range(7):
    for i in range(4):
        tiles_stack.append(str(number+1)+'z')

# 码牌 发牌 翻混儿
random.shuffle(tiles_stack)
hand = tiles_stack[:14]
global_wild_tile = tiles_stack[14]

# 理牌
# hand = ['1m', '1m', '2p', '1p', '1p', '1p', '3p', '4p', '5p', '6p', '6s', '7s', '8s', '1p']
# global_wild_tile = '9p'
sort_tiles(hand, 0, len(hand)-1)
print(hand)
print(global_wild_tile)

#is_winning_hand(hand, '1p', global_wild_tile)

ii = 15
while True:
    if ii == 15:
        check_hand(hand, [], tiles_stack[13], global_wild_tile, False)
    else:
        check_hand(hand, [], tiles_stack[ii-1], global_wild_tile, False)
    a = input('请输入要打的牌: ')
    if a == 'q':
        break
    b = hand.index(a)
    hand.pop(b)
    hand.append(tiles_stack[ii])
    print(hand)
    sort_tiles(hand, 0, len(hand)-1)
    ii += 1