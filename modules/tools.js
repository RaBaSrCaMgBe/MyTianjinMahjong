function compare_tiles(tile1, tile2) {
    if (tile1[1] == tile2[1]) {
        return tile1[0] >= tile2[0];
    }
    if (tile1[1] == 'z') {
        return true;
    }
    if (tile1[1] == 's' && tile2[1] != 'z') {
        return true;
    }
    if (tile1[1] == 'p' && tile2[1] == 'm') {
        return true;
    }
    return false;
}

function sort_tiles(hand, low, high) {
    let pivot = hand[low];
    let i = low;
    let j = high;
    while (j > i) {
        while (compare_tiles(hand[j], pivot) && j > i) {
            j -= 1;
        }
        hand[i] = hand[j]
        while (compare_tiles(pivot, hand[i]) && j > i) {
            i += 1;
        }
        hand[j] = hand[i];
    }
    hand[i] = pivot;
    if (i > low + 1) {
        sort_tiles(hand, low, i - 1);
    }
    if (i + 1 < high) {
        sort_tiles(hand, i + 1, high);
    }
}