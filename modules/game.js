// 绘制svg
function draw_svg() {
    // 设置svg尺寸
    let svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xlink:xmlns", "http://www.w3.org/1999/xlink");
    svg.setAttributeNS(null, "width", w);
    svg.setAttributeNS(null, "height", h);

    // 绘制中间的信息框
    let tmp = document.createElementNS(xmlns, "rect");
    tmp.setAttributeNS(null, "x", middleFrameX);
    tmp.setAttributeNS(null, "y", middleFrameY);
    tmp.setAttributeNS(null, "width", tileWidth * 6);
    tmp.setAttributeNS(null, "height", tileWidth * 6);
    tmp.setAttributeNS(null, "fill", "gray");
    svg.appendChild(tmp);

    document.querySelector("body").appendChild(svg);
}


function draw_player_info() {
    // 绘制与玩家座次相关的信息
    let svg =  document.querySelector("svg")

    // 绘制id
    // 绘制自家
    let tmpX = tileHeight + 35;
    let tmpY = h - tileHeightHand;
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = playerID[selfPosition];
    tmp.setAttributeNS(null, "x", tmpX);
    tmp.setAttributeNS(null, "y", tmpY - 40);
    tmp.setAttributeNS(null, "font-size", "30");
    svg.appendChild(tmp);
    // 绘制下家
    tmpX = w - tileHeight - 40;
    tmpY = h - tileHeightHand - 20;
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = playerID[(selfPosition + 1) % 4];
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "30");
    svg.appendChild(tmp);
    let box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", tmpX + 20 - box / 2);
    tmp.setAttributeNS(null, "y", tmpY - box / 2 - 20);
    tmp.setAttributeNS(null, "transform", `rotate(-90,${tmpX + 20}, ${tmpY - box / 2})`);
    // 绘制对家
    tmpX = w - tileHeight - 40;
    tmpY = tileHeight;
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = playerID[(selfPosition + 2) % 4];
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "30");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", tmpX - box);
    tmp.setAttributeNS(null, "y", tmpY);
    tmp.setAttributeNS(null, "transform", `rotate(180,${tmpX - box / 2}, ${tmpY + 20})`);
    // 绘制上家
    tmpX = tileHeight;
    tmpY = tileHeight + 20;
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = playerID[(selfPosition + 3) % 4];
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "30");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", tmpX + 20 - box / 2);
    tmp.setAttributeNS(null, "y", tmpY + box / 2 - 20);
    tmp.setAttributeNS(null, "transform", `rotate(90,${tmpX + 20}, ${tmpY + box / 2})`);

    // 绘制分数
    // 绘制自家
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = playerScore[selfPosition % 4];
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "30");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", w / 2 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY + tileWidth * 6 - 20);
    tmp.setAttributeNS(null, "id", "score0");
    tmp.setAttributeNS(null, "class", "gameInfo");
    // 绘制下家
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = playerScore[(selfPosition + 1) % 4];
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "30");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", middleFrameX + tileWidth * 6 - 10 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY + tileWidth * 3 - 10);
    tmp.setAttributeNS(null, "transform", `rotate(-90,${middleFrameX + tileWidth * 6 - 10}, ${middleFrameY + tileWidth * 3})`);
    tmp.setAttributeNS(null, "id", "score1");
    tmp.setAttributeNS(null, "class", "gameInfo");
    // 绘制对家
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = playerScore[(selfPosition + 2) % 4];
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "30");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", w / 2 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY);
    tmp.setAttributeNS(null, "transform", `rotate(180,${w / 2}, ${middleFrameY + 10})`);
    tmp.setAttributeNS(null, "id", "score2");
    tmp.setAttributeNS(null, "class", "gameInfo");
    // 绘制上家
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = playerScore[(selfPosition + 3) % 4];
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "30");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", middleFrameX + 10 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY + tileWidth * 3 - 10);
    tmp.setAttributeNS(null, "transform", `rotate(90,${middleFrameX + 10}, ${middleFrameY + tileWidth * 3})`);
    tmp.setAttributeNS(null, "id", "score3");
    tmp.setAttributeNS(null, "class", "gameInfo");
}


function draw_init_hand(init_hand, dealer_pos, match_no, wild_card) {
    let svg =  document.querySelector("svg");
    // 绘制玩家手牌
    for (let i = 0; i < 13; i++) {
        tmp = document.createElementNS(xmlns, "image");
        tmp.setAttribute("href", `assets/${init_hand[i]}.jpg`);
        tmp.setAttributeNS(null, "x", selfCurX);
        tmp.setAttributeNS(null, "y", selfHandStartY);
        tmp.setAttributeNS(null, "width", tileWidthHand);
        tmp.setAttributeNS(null, "height", tileHeightHand);
        tmp.setAttributeNS(null, "onclick", `selected_tile("${init_hand[i]}")`);
        tmp.setAttributeNS(null, "class", "selfHand");
        svg.appendChild(tmp);
        selfCurX += tileWidthHand;
    }

    // 绘制场次
    let tmpctx = "";
    tmp = document.createElementNS(xmlns, "text");
    if (match_no == 0) {
        tmpctx += "东";
    }
    else {
        tmpctx += "南";
    }
    if (dealer_pos == 0) {
        tmpctx += "一局";
    }
    else if (dealer_pos == 1) {
        tmpctx += "二局";
    }
    else if (dealer_pos == 2) {
        tmpctx += "三局";
    }
    else {
        tmpctx += "四局";
    }
    tmp.textContent = tmpctx;
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "30");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", w / 2 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY + tileWidth * 2);
    tmp.setAttributeNS(null, "class", "gameInfo");

    // 绘制混儿文字提示
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = "混儿指示牌为:";
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "15");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", w / 2 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY + tileWidth * 3);
    tmp.setAttributeNS(null, "class", "gameInfo");
    // 绘制混儿牌图片
    tmp = document.createElementNS(xmlns, "image");
    tmp.setAttribute("href", `assets/${wild_card}.jpg`);
    tmp.setAttributeNS(null, "x", w / 2 - tileWidth / 2);
    tmp.setAttributeNS(null, "y", middleFrameY + tileWidth * 3.5);
    tmp.setAttributeNS(null, "width", tileWidth);
    tmp.setAttributeNS(null, "height", tileHeight);
    svg.appendChild(tmp);
    tmp.setAttributeNS(null, "class", "gameInfo");
}


function draw_new_turn (new_pos) {
    // 将当前行动玩家分数标为绿色
    document.getElementById(`score${(curPos + 4 - selfPosition) % 4}`).setAttributeNS(null, "fill", "black");
    document.getElementById(`score${(new_pos + 4 - selfPosition) % 4}`).setAttributeNS(null, "fill", "chartreuse");
}


function draw_option_area(received, isBack) {
    // 绘制玩家可执行选项
    if (isBack) {
        allowQuad = false;
        clear_option_area();
    }
    let svg = document.querySelector("svg");
    let optionNo = 0;
    let tmpx = optionAreaStartX;
    let tmpy = optionAreaStartY;
    let actionFunctionList = [() => {win();}, () => {concealed_quad(received);}, () => {exposed_quad(received);}, () => {pon(received);}, () => {pass();}]

    for (let i = received.action.length - 1; i >= 0 ; i--) {
        if (received.action[i] == 0) {
            // 打牌
            allowDiscard = true;
        }
        else {
            tmp = document.createElementNS(xmlns, "rect");
            tmp.setAttributeNS(null, "x", tmpx);
            tmp.setAttributeNS(null, "y", tmpy);
            tmp.setAttributeNS(null, "width", tileWidthHand * 2);
            tmp.setAttributeNS(null, "height", tileHeightHand);
            tmp.setAttributeNS(null, "fill", "gray");
            tmp.setAttributeNS(null, "class", "optionArea");
            tmp.onclick = actionFunctionList[received.action[i] - 1];
            svg.appendChild(tmp);

            tmp = document.createElementNS(xmlns, "text");
            tmp.textContent = actionNameList[received.action[i] - 1];
            tmp.setAttributeNS(null, "x", 0);
            tmp.setAttributeNS(null, "y", 0);
            tmp.setAttributeNS(null, "font-size", "40");
            svg.appendChild(tmp);
            box = tmp.getBBox().width;
            tmp.setAttributeNS(null, "x", tmpx + tileWidthHand - box / 2);
            tmp.setAttributeNS(null, "y", tmpy + tileHeightHand / 2 + 15);
            tmp.setAttributeNS(null, "class", "optionArea");
            tmp.onclick = actionFunctionList[received.action[i] - 1];
            
            tmpx -= tileWidthHand * 2 + 20;
            optionNo += 1;
            if (optionNo == 2) {
                tmpx = optionAreaStartX;
                tmpy = optionAreaStartY - tileHeight - 40;
            }
        }
    }
}


function draw_return_option(received) {
    // 绘制"返回"选项
    clear_option_area();
    let svg = document.querySelector("svg");
    tmp = document.createElementNS(xmlns, "rect");
    tmp.setAttributeNS(null, "x", optionAreaStartX);
    tmp.setAttributeNS(null, "y", optionAreaStartY);
    tmp.setAttributeNS(null, "width", tileWidthHand * 2);
    tmp.setAttributeNS(null, "height", tileHeightHand);
    tmp.setAttributeNS(null, "fill", "gray");
    tmp.setAttributeNS(null, "class", "optionArea");
    tmp.onclick = () => {draw_option_area(received, true);};
    svg.appendChild(tmp);

    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = "返回";
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "40");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", optionAreaStartX + tileWidthHand - box / 2);
    tmp.setAttributeNS(null, "y", optionAreaStartY + tileHeightHand / 2 + 15);
    tmp.setAttributeNS(null, "class", "optionArea");
    tmp.onclick = () => {draw_option_area(received, true);};
}


function clear_option_area() {
    tmp = document.querySelectorAll(".optionArea");
    for (let i = 0; i < tmp.length; i++) {
        tmp[i].remove();
    }
}


function draw_pon(received) {
    // 将这张牌从牌河中拿出去
    curDiscardElement.remove();
    playerDiscard[curPos] -= 1;
    
    let svg =  document.querySelector("svg");
    let tmppos = (received.player + 4 - selfPosition) % 4;
    if (tmppos == 0) {
        // 把牌从手牌中挑出去
        let tmpidx = selfHand.indexOf(received.tile);
        selfHand.splice(tmpidx, 2);
        // 清除之前的手牌
        tmp = document.querySelectorAll(".selfHand");
        for (let i = 0; i < tmp.length; i++) {
            tmp[i].remove();
        }
        // 绘制更新后的手牌
        selfCurX = selfHandStartX;
        for (let i = 0; i < selfHand.length; i++) {
            tmp = document.createElementNS(xmlns, "image");
            tmp.setAttribute("href", `assets/${selfHand[i]}.jpg`);
            tmp.setAttributeNS(null, "x", selfCurX);
            tmp.setAttributeNS(null, "y", selfHandStartY);
            tmp.setAttributeNS(null, "width", tileWidthHand);
            tmp.setAttributeNS(null, "height", tileHeightHand);
            tmp.setAttributeNS(null, "onclick", `selected_tile("${selfHand[i]}")`);
            tmp.setAttributeNS(null, "class", "selfHand");
            svg.appendChild(tmp);
            selfCurX += tileWidthHand;
        }

        // 将碰牌加入副露列表
        playerCompletedhand[selfPosition].push(received.tile + received.tile + received.tile);
        // 绘制副露区
        for (let i = 0; i < 3; i++) {
            tmp = document.createElementNS(xmlns, "image");
            tmp.setAttribute("href", `assets/${received.tile}.jpg`);
            tmp.setAttributeNS(null, "x", selfFuluCurX);
            tmp.setAttributeNS(null, "y", selfFuluAreaY);
            tmp.setAttributeNS(null, "width", tileWidth);
            tmp.setAttributeNS(null, "height", tileHeight);
            tmp.setAttributeNS(null, "class", "selfFulu");
            svg.appendChild(tmp);
            selfFuluCurX -= tileWidth;
        }
        selfFuluCurX -= tileWidth * 0.25;
    }
    else {
        // 修改玩家副露区
        playerCompletedhand[received.player].push(received.tile + received.tile + received.tile);
        if (tmppos == 1){
            for (let i = 0; i < 3; i++) {
                tmp = document.createElementNS(xmlns, "image");
                tmp.setAttribute("href", `assets/${received.tile}.jpg`);
                tmp.setAttributeNS(null, "x", rightFuluAreaX + (tileHeight - tileWidth) / 2);
                tmp.setAttributeNS(null, "y", rightCurY + (tileWidth - tileHeight) / 2);
                tmp.setAttributeNS(null, "width", tileWidth);
                tmp.setAttributeNS(null, "height", tileHeight);
                tmp.setAttributeNS(null, "transform", `rotate(-90,${rightFuluAreaX + tileHeight / 2}, ${rightCurY + tileWidth / 2})`);
                tmp.setAttributeNS(null, "class", "rightFulu");
                svg.appendChild(tmp);
                rightCurY += tileWidth;
            }
            rightCurY += tileWidth * 0.25;
        } else if (tmppos == 2) {
            for (let i = 0; i < 3; i++) {
                tmp = document.createElementNS(xmlns, "image");
                tmp.setAttribute("href", `assets/${received.tile}.jpg`);
                tmp.setAttributeNS(null, "x", oppositeCurX);
                tmp.setAttributeNS(null, "y", oppositeFuluAreaY);
                tmp.setAttributeNS(null, "width", tileWidth);
                tmp.setAttributeNS(null, "height", tileHeight);
                tmp.setAttributeNS(null, "transform", `rotate(180,${oppositeCurX + tileWidth / 2}, ${oppositeFuluAreaY + tileHeight / 2})`);
                tmp.setAttributeNS(null, "class", "oppositeFulu");
                svg.appendChild(tmp);
                oppositeCurX += tileWidth;
            }
            oppositeCurX += tileWidth * 0.25; 
        } else if (tmppos == 3) {
            for (let i = 0; i < 3; i++) {
                tmp = document.createElementNS(xmlns, "image");
                tmp.setAttribute("href", `assets/${received.tile}.jpg`);
                tmp.setAttributeNS(null, "x", leftFuluAreaX + (tileHeight - tileWidth) / 2);
                tmp.setAttributeNS(null, "y", leftCurY + (tileWidth - tileHeight) / 2);
                tmp.setAttributeNS(null, "width", tileWidth);
                tmp.setAttributeNS(null, "height", tileHeight);
                tmp.setAttributeNS(null, "transform", `rotate(90,${leftFuluAreaX + tileHeight / 2}, ${leftCurY + tileWidth / 2})`);
                tmp.setAttributeNS(null, "class", "leftFulu");
                svg.appendChild(tmp);
                leftCurY -= tileWidth;
            }
            leftCurY -= tileWidth * 0.25; 
        }
    }
}


function draw_concealed_quad(received) {
    let svg =  document.querySelector("svg");
    let tmppos = (received.player + 4 - selfPosition) % 4;

    if (tmppos == 0) {
        // 把牌从手牌中挑出去
        sort_tiles(selfHand, 0, selfHand.length - 1);
        let tmpidx = selfHand.indexOf(received.tile);
        selfHand.splice(tmpidx, 4);
        // 清除之前的手牌
        tmp = document.querySelectorAll(".selfHand");
        for (let i = 0; i < tmp.length; i++) {
            tmp[i].remove();
        }
        document.getElementById("draw").remove();
        // 绘制更新后的手牌
        selfCurX = selfHandStartX;
        for (let i = 0; i < selfHand.length; i++) {
            tmp = document.createElementNS(xmlns, "image");
            tmp.setAttribute("href", `assets/${selfHand[i]}.jpg`);
            tmp.setAttributeNS(null, "x", selfCurX);
            tmp.setAttributeNS(null, "y", selfHandStartY);
            tmp.setAttributeNS(null, "width", tileWidthHand);
            tmp.setAttributeNS(null, "height", tileHeightHand);
            tmp.setAttributeNS(null, "onclick", `selected_tile("${selfHand[i]}")`);
            tmp.setAttributeNS(null, "class", "selfHand");
            svg.appendChild(tmp);
            selfCurX += tileWidthHand;
        }

        // 将碰牌加入副露列表
        playerCompletedhand[selfPosition].push(received.tile + received.tile + received.tile + received.tile);
        // 重绘副露区
        tmp = document.querySelectorAll(".selfFulu");
        for (let i = 0; i < tmp.length; i++) {
            tmp[i].remove();
        }
        selfFuluCurX = selfFuluAreaX;
        for (let i = 0; i < playerCompletedhand[selfPosition].length; i++) {
            tmptile = playerCompletedhand[selfPosition][i].slice(0, 2);
            for (let j = 0; j < playerCompletedhand[selfPosition][i].length / 2; j++) {
                tmp = document.createElementNS(xmlns, "image");
                tmp.setAttribute("href", `assets/${tmptile}.jpg`);
                tmp.setAttributeNS(null, "x", selfFuluCurX);
                tmp.setAttributeNS(null, "y", selfFuluAreaY);
                tmp.setAttributeNS(null, "width", tileWidth);
                tmp.setAttributeNS(null, "height", tileHeight);
                tmp.setAttributeNS(null, "class", "selfFulu");
                svg.appendChild(tmp);
                selfFuluCurX -= tileWidth;
            }
            selfFuluCurX -= tileWidth * 0.25;
        }
    }
    else {
        // 修改玩家副露区
        playerCompletedhand[received.player].push(received.tile + received.tile + received.tile + received.tile);
        if (tmppos == 1){
            tmp = document.querySelectorAll(".rightFulu");
            for (let i = 0; i < tmp.length; i++) {
                tmp[i].remove();
            }
            rightCurY = rightFuluAreaY;
            for (let i = 0; i < playerCompletedhand[received.player].length; i++) {
                tmptile = playerCompletedhand[received.player][i].slice(0, 2);
                for (let j = 0; j < playerCompletedhand[received.player][i].length / 2; j++) {
                    tmp = document.createElementNS(xmlns, "image");
                    tmp.setAttribute("href", `assets/${tmptile}.jpg`);
                    tmp.setAttributeNS(null, "x", rightFuluAreaX + (tileHeight - tileWidth) / 2);
                    tmp.setAttributeNS(null, "y", rightCurY + (tileWidth - tileHeight) / 2);
                    tmp.setAttributeNS(null, "width", tileWidth);
                    tmp.setAttributeNS(null, "height", tileHeight);
                    tmp.setAttributeNS(null, "transform", `rotate(-90,${rightFuluAreaX + tileHeight / 2}, ${rightCurY + tileWidth / 2})`);
                    tmp.setAttributeNS(null, "class", "rightFulu");
                    svg.appendChild(tmp);
                    rightCurY += tileWidth;
                }
                rightCurY += tileWidth * 0.25;
            }
        } else if (tmppos == 2) {
            tmp = document.querySelectorAll(".oppositeFulu");
            for (let i = 0; i < tmp.length; i++) {
                tmp[i].remove();
            }
            oppositeCurX = oppositeFuluAreaX;
            for (let i = 0; i < playerCompletedhand[received.player].length; i++) {
                tmptile = playerCompletedhand[received.player][i].slice(0, 2);
                for (let j = 0; j < playerCompletedhand[received.player][i].length / 2; j++) {
                    tmp = document.createElementNS(xmlns, "image");
                    tmp.setAttribute("href", `assets/${tmptile}.jpg`);
                    tmp.setAttributeNS(null, "x", oppositeCurX);
                    tmp.setAttributeNS(null, "y", oppositeFuluAreaY);
                    tmp.setAttributeNS(null, "width", tileWidth);
                    tmp.setAttributeNS(null, "height", tileHeight);
                    tmp.setAttributeNS(null, "transform", `rotate(180,${oppositeCurX + tileWidth / 2}, ${oppositeFuluAreaY + tileHeight / 2})`);
                    tmp.setAttributeNS(null, "class", "oppositeFulu");
                    svg.appendChild(tmp);
                    oppositeCurX += tileWidth;
                }
                oppositeCurX += tileWidth * 0.25; 
            }
        } else if (tmppos == 3) {
            tmp = document.querySelectorAll(".leftFulu");
            for (let i = 0; i < tmp.length; i++) {
                tmp[i].remove();
            }
            leftCurY = leftFuluAreaY;
            for (let i = 0; i < playerCompletedhand[received.player].length; i++) {
                tmptile = playerCompletedhand[received.player][i].slice(0, 2);
                for (let j = 0; j < playerCompletedhand[received.player][i].length / 2; j++) {
                    tmp = document.createElementNS(xmlns, "image");
                    tmp.setAttribute("href", `assets/${tmptile}.jpg`);
                    tmp.setAttributeNS(null, "x", leftFuluAreaX + (tileHeight - tileWidth) / 2);
                    tmp.setAttributeNS(null, "y", leftCurY + (tileWidth - tileHeight) / 2);
                    tmp.setAttributeNS(null, "width", tileWidth);
                    tmp.setAttributeNS(null, "height", tileHeight);
                    tmp.setAttributeNS(null, "transform", `rotate(90,${leftFuluAreaX + tileHeight / 2}, ${leftCurY + tileWidth / 2})`);
                    tmp.setAttributeNS(null, "class", "leftFulu");
                    svg.appendChild(tmp);
                    leftCurY -= tileWidth;
                }
                leftCurY -= tileWidth * 0.25; 
            }
        }
    }
}


function draw_exposed_quad(received) {
    // 判断是大明杠还是加杠
    if (received.player == curPos) {
        // 加杠
        draw_exposed_quad_inturn(received);
    }
    else {
        // 大明杠
        draw_exposed_quad_offturn(received);
    }
}


function draw_exposed_quad_inturn(received) {
    let svg =  document.querySelector("svg");
    let tmppos = (received.player + 4 - selfPosition) % 4;

    if (tmppos == 0) {
        // 把牌从手牌中挑出去
        sort_tiles(selfHand, 0, selfHand.length - 1);
        let tmpidx = selfHand.indexOf(received.tile);
        selfHand.splice(tmpidx, 1);
        // 清除之前的手牌
        tmp = document.querySelectorAll(".selfHand");
        for (let i = 0; i < tmp.length; i++) {
            tmp[i].remove();
        }
        document.getElementById("draw").remove();
        // 绘制更新后的手牌
        selfCurX = selfHandStartX;
        for (let i = 0; i < selfHand.length; i++) {
            tmp = document.createElementNS(xmlns, "image");
            tmp.setAttribute("href", `assets/${selfHand[i]}.jpg`);
            tmp.setAttributeNS(null, "x", selfCurX);
            tmp.setAttributeNS(null, "y", selfHandStartY);
            tmp.setAttributeNS(null, "width", tileWidthHand);
            tmp.setAttributeNS(null, "height", tileHeightHand);
            tmp.setAttributeNS(null, "onclick", `selected_tile("${selfHand[i]}")`);
            tmp.setAttributeNS(null, "class", "selfHand");
            svg.appendChild(tmp);
            selfCurX += tileWidthHand;
        }

        // 将碰牌加入副露列表
        tmpidx = playerCompletedhand[selfPosition].indexOf(received.tile + received.tile + received.tile);
        playerCompletedhand[selfPosition][tmpidx] += received.tile;
        // 重绘副露区
        tmp = document.querySelectorAll(".selfFulu");
        for (let i = 0; i < tmp.length; i++) {
            tmp[i].remove();
        }
        selfFuluCurX = selfFuluAreaX;
        for (let i = 0; i < playerCompletedhand[selfPosition].length; i++) {
            tmptile = playerCompletedhand[selfPosition][i].slice(0, 2);
            for (let j = 0; j < playerCompletedhand[selfPosition][i].length / 2; j++) {
                tmp = document.createElementNS(xmlns, "image");
                tmp.setAttribute("href", `assets/${tmptile}.jpg`);
                tmp.setAttributeNS(null, "x", selfFuluCurX);
                tmp.setAttributeNS(null, "y", selfFuluAreaY);
                tmp.setAttributeNS(null, "width", tileWidth);
                tmp.setAttributeNS(null, "height", tileHeight);
                tmp.setAttributeNS(null, "class", "selfFulu");
                svg.appendChild(tmp);
                selfFuluCurX -= tileWidth;
            }
            selfFuluCurX -= tileWidth * 0.25;
        }
    }
    else {
        // 修改玩家副露区
        tmpidx = playerCompletedhand[received.player].indexOf(received.tile + received.tile + received.tile);
        playerCompletedhand[received.player][tmpidx] += received.tile;
        if (tmppos == 1){
            tmp = document.querySelectorAll(".rightFulu");
            for (let i = 0; i < tmp.length; i++) {
                tmp[i].remove();
            }
            rightCurY = rightFuluAreaY;
            for (let i = 0; i < playerCompletedhand[received.player].length; i++) {
                tmptile = playerCompletedhand[received.player][i].slice(0, 2);
                for (let j = 0; j < playerCompletedhand[received.player][i].length / 2; j++) {
                    tmp = document.createElementNS(xmlns, "image");
                    tmp.setAttribute("href", `assets/${tmptile}.jpg`);
                    tmp.setAttributeNS(null, "x", rightFuluAreaX + (tileHeight - tileWidth) / 2);
                    tmp.setAttributeNS(null, "y", rightCurY + (tileWidth - tileHeight) / 2);
                    tmp.setAttributeNS(null, "width", tileWidth);
                    tmp.setAttributeNS(null, "height", tileHeight);
                    tmp.setAttributeNS(null, "transform", `rotate(-90,${rightFuluAreaX + tileHeight / 2}, ${rightCurY + tileWidth / 2})`);
                    tmp.setAttributeNS(null, "class", "rightFulu");
                    svg.appendChild(tmp);
                    rightCurY += tileWidth;
                }
                rightCurY += tileWidth * 0.25;
            }
        } else if (tmppos == 2) {
            tmp = document.querySelectorAll(".oppositeFulu");
            for (let i = 0; i < tmp.length; i++) {
                tmp[i].remove();
            }
            oppositeCurX = oppositeFuluAreaX;
            for (let i = 0; i < playerCompletedhand[received.player].length; i++) {
                tmptile = playerCompletedhand[received.player][i].slice(0, 2);
                for (let j = 0; j < playerCompletedhand[received.player][i].length / 2; j++) {
                    tmp = document.createElementNS(xmlns, "image");
                    tmp.setAttribute("href", `assets/${tmptile}.jpg`);
                    tmp.setAttributeNS(null, "x", oppositeCurX);
                    tmp.setAttributeNS(null, "y", oppositeFuluAreaY);
                    tmp.setAttributeNS(null, "width", tileWidth);
                    tmp.setAttributeNS(null, "height", tileHeight);
                    tmp.setAttributeNS(null, "transform", `rotate(180,${oppositeCurX + tileWidth / 2}, ${oppositeFuluAreaY + tileHeight / 2})`);
                    tmp.setAttributeNS(null, "class", "oppositeFulu");
                    svg.appendChild(tmp);
                    oppositeCurX += tileWidth;
                }
                oppositeCurX += tileWidth * 0.25; 
            }
        } else if (tmppos == 3) {
            tmp = document.querySelectorAll(".leftFulu");
            for (let i = 0; i < tmp.length; i++) {
                tmp[i].remove();
            }
            leftCurY = leftFuluAreaY;
            for (let i = 0; i < playerCompletedhand[received.player].length; i++) {
                tmptile = playerCompletedhand[received.player][i].slice(0, 2);
                for (let j = 0; j < playerCompletedhand[received.player][i].length / 2; j++) {
                    tmp = document.createElementNS(xmlns, "image");
                    tmp.setAttribute("href", `assets/${tmptile}.jpg`);
                    tmp.setAttributeNS(null, "x", leftFuluAreaX + (tileHeight - tileWidth) / 2);
                    tmp.setAttributeNS(null, "y", leftCurY + (tileWidth - tileHeight) / 2);
                    tmp.setAttributeNS(null, "width", tileWidth);
                    tmp.setAttributeNS(null, "height", tileHeight);
                    tmp.setAttributeNS(null, "transform", `rotate(90,${leftFuluAreaX + tileHeight / 2}, ${leftCurY + tileWidth / 2})`);
                    tmp.setAttributeNS(null, "class", "leftFulu");
                    svg.appendChild(tmp);
                    leftCurY -= tileWidth;
                }
                leftCurY -= tileWidth * 0.25; 
            }
        }
    }
}

function draw_exposed_quad_offturn(received) {
    // 将这张牌从牌河中拿出去
    curDiscardElement.remove();
    playerDiscard[curPos] -= 1;
    
    let svg =  document.querySelector("svg");
    let tmppos = (received.player + 4 - selfPosition) % 4;
    if (tmppos == 0) {
        // 把牌从手牌中挑出去
        let tmpidx = selfHand.indexOf(received.tile);
        selfHand.splice(tmpidx, 3);
        // 清除之前的手牌
        tmp = document.querySelectorAll(".selfHand");
        for (let i = 0; i < tmp.length; i++) {
            tmp[i].remove();
        }
        // 绘制更新后的手牌
        selfCurX = selfHandStartX;
        for (let i = 0; i < selfHand.length; i++) {
            tmp = document.createElementNS(xmlns, "image");
            tmp.setAttribute("href", `assets/${selfHand[i]}.jpg`);
            tmp.setAttributeNS(null, "x", selfCurX);
            tmp.setAttributeNS(null, "y", selfHandStartY);
            tmp.setAttributeNS(null, "width", tileWidthHand);
            tmp.setAttributeNS(null, "height", tileHeightHand);
            tmp.setAttributeNS(null, "onclick", `selected_tile("${selfHand[i]}")`);
            tmp.setAttributeNS(null, "class", "selfHand");
            svg.appendChild(tmp);
            selfCurX += tileWidthHand;
        }

        // 将碰牌加入副露列表
        playerCompletedhand[selfPosition].push(received.tile + received.tile + received.tile + received.tile);
        // 绘制副露区
        for (let i = 0; i < 4; i++) {
            tmp = document.createElementNS(xmlns, "image");
            tmp.setAttribute("href", `assets/${received.tile}.jpg`);
            tmp.setAttributeNS(null, "x", selfFuluCurX);
            tmp.setAttributeNS(null, "y", selfFuluAreaY);
            tmp.setAttributeNS(null, "width", tileWidth);
            tmp.setAttributeNS(null, "height", tileHeight);
            tmp.setAttributeNS(null, "class", "selfFulu");
            svg.appendChild(tmp);
            selfFuluCurX -= tileWidth;
        }
        selfFuluCurX -= tileWidth * 0.25;
    }
    else {
        // 修改玩家副露区
        playerCompletedhand[received.player].push(received.tile + received.tile + received.tile + received.tile);
        if (tmppos == 1){
            for (let i = 0; i < 4; i++) {
                tmp = document.createElementNS(xmlns, "image");
                tmp.setAttribute("href", `assets/${received.tile}.jpg`);
                tmp.setAttributeNS(null, "x", rightFuluAreaX + (tileHeight - tileWidth) / 2);
                tmp.setAttributeNS(null, "y", rightCurY + (tileWidth - tileHeight) / 2);
                tmp.setAttributeNS(null, "width", tileWidth);
                tmp.setAttributeNS(null, "height", tileHeight);
                tmp.setAttributeNS(null, "transform", `rotate(-90,${rightFuluAreaX + tileHeight / 2}, ${rightCurY + tileWidth / 2})`);
                tmp.setAttributeNS(null, "class", "rightFulu");
                svg.appendChild(tmp);
                rightCurY += tileWidth;
            }
            rightCurY += tileWidth * 0.25;
        } else if (tmppos == 2) {
            for (let i = 0; i < 4; i++) {
                tmp = document.createElementNS(xmlns, "image");
                tmp.setAttribute("href", `assets/${received.tile}.jpg`);
                tmp.setAttributeNS(null, "x", oppositeCurX);
                tmp.setAttributeNS(null, "y", oppositeFuluAreaY);
                tmp.setAttributeNS(null, "width", tileWidth);
                tmp.setAttributeNS(null, "height", tileHeight);
                tmp.setAttributeNS(null, "transform", `rotate(180,${oppositeCurX + tileWidth / 2}, ${oppositeFuluAreaY + tileHeight / 2})`);
                tmp.setAttributeNS(null, "class", "oppositeFulu");
                svg.appendChild(tmp);
                oppositeCurX += tileWidth;
            }
            oppositeCurX += tileWidth * 0.25; 
        } else if (tmppos == 3) {
            for (let i = 0; i < 4; i++) {
                tmp = document.createElementNS(xmlns, "image");
                tmp.setAttribute("href", `assets/${received.tile}.jpg`);
                tmp.setAttributeNS(null, "x", leftFuluAreaX + (tileHeight - tileWidth) / 2);
                tmp.setAttributeNS(null, "y", leftCurY + (tileWidth - tileHeight) / 2);
                tmp.setAttributeNS(null, "width", tileWidth);
                tmp.setAttributeNS(null, "height", tileHeight);
                tmp.setAttributeNS(null, "transform", `rotate(90,${leftFuluAreaX + tileHeight / 2}, ${leftCurY + tileWidth / 2})`);
                tmp.setAttributeNS(null, "class", "leftFulu");
                svg.appendChild(tmp);
                leftCurY -= tileWidth;
            }
            leftCurY -= tileWidth * 0.25; 
        }
    }
}

function draw_win(received) {
    let svg =  document.querySelector("svg");
    // 绘制背景
    tmp = document.createElementNS(xmlns, "rect");
    tmp.setAttributeNS(null, "x", middleFrameX - 7 * tileWidth);
    tmp.setAttributeNS(null, "y", middleFrameY - 3 * tileWidth);
    tmp.setAttributeNS(null, "width", tileWidth * 20);
    tmp.setAttributeNS(null, "height", tileWidth * 12);
    tmp.setAttributeNS(null, "fill", "gray");
    tmp.setAttributeNS(null, "class", "gameInfo");
    svg.appendChild(tmp);
    // 绘制和牌玩家信息
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = playerID[received.player] + "  和牌";
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "50");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", w / 2 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY - 30);
    tmp.setAttributeNS(null, "class", "gameInfo");
    // 手牌处理
    let hand = received.hand;
    let completed_hand = received.completed_hand;
    let draw = received.draw;
    let pattern = received.pattern;
    let score = received.score;
    hand.splice(hand.indexOf(draw), 1);
    sort_tiles(hand, 0, hand.length - 1);
    // 绘制手牌
    let tmpTotalLen = hand.length + 1.25;
    for (let i = 0; i < completed_hand.length; i++) {
        tmpTotalLen += completed_hand[i].length / 2 + 0.25;
    }
    let curWinX = w / 2 - tmpTotalLen * tileWidth / 2;
    for (let i = 0; i < completed_hand.length; i++) {
        tmptile = completed_hand[i].slice(0, 2);
        for (let j = 0; j < completed_hand[i].length / 2; j++) {
            tmp = document.createElementNS(xmlns, "image");
            tmp.setAttribute("href", `assets/${tmptile}.jpg`);
            tmp.setAttributeNS(null, "x", curWinX);
            tmp.setAttributeNS(null, "y", middleFrameY + 40);
            tmp.setAttributeNS(null, "width", tileWidth);
            tmp.setAttributeNS(null, "height", tileHeight);
            tmp.setAttributeNS(null, "class", "gameInfo");
            svg.appendChild(tmp);
            curWinX += tileWidth;
        }
        curWinX += 0.25 * tileWidth;
    }
    for (let i = 0; i < hand.length; i++) {
        tmp = document.createElementNS(xmlns, "image");
        tmp.setAttribute("href", `assets/${hand[i]}.jpg`);
        tmp.setAttributeNS(null, "x", curWinX);
        tmp.setAttributeNS(null, "y", middleFrameY + 40);
        tmp.setAttributeNS(null, "width", tileWidth);
        tmp.setAttributeNS(null, "height", tileHeight);
        tmp.setAttributeNS(null, "class", "gameInfo");
        svg.appendChild(tmp);
        curWinX += tileWidth;
    }
    curWinX += 0.25 * tileWidth;
    tmp = document.createElementNS(xmlns, "image");
    tmp.setAttribute("href", `assets/${draw}.jpg`);
    tmp.setAttributeNS(null, "x", curWinX);
    tmp.setAttributeNS(null, "y", middleFrameY + 40);
    tmp.setAttributeNS(null, "width", tileWidth);
    tmp.setAttributeNS(null, "height", tileHeight);
    tmp.setAttributeNS(null, "class", "gameInfo");
    svg.appendChild(tmp);
    // 绘制番种
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = pattern.join(" ");
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "50");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", w / 2 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY + 180);
    tmp.setAttributeNS(null, "class", "gameInfo");
    // 绘制分数
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = score + "分";
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "50");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", w / 2 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY + 280);
    tmp.setAttributeNS(null, "class", "gameInfo");
}

function reset_all_variable(clearDraw) {
    let svg =  document.querySelector("svg");
    // 清除自家手牌
    tmp = document.querySelectorAll(".selfHand");
    for (let i = 0; i < tmp.length; i++) {
        tmp[i].remove();
    }
    if (curPos == selfPosition && clearDraw) {
        document.getElementById("draw").remove();
    }
    selfHand = [];
    selfCurX = selfHandStartX;

    // 清除副露区
    playerCompletedhand = [[], [], [], []];
    // 清除自家副露区
    tmp = document.querySelectorAll(".selfFulu");
    for (let i = 0; i < tmp.length; i++) {
        tmp[i].remove();
    }
    selfFuluCurX = selfFuluAreaX;
    // 清除下家
    tmp = document.querySelectorAll(".rightFulu");
    for (let i = 0; i < tmp.length; i++) {
        tmp[i].remove();
    }
    rightCurY = rightFuluAreaY;
    // 清除对家
    tmp = document.querySelectorAll(".oppositeFulu");
    for (let i = 0; i < tmp.length; i++) {
        tmp[i].remove();
    }
    oppositeCurX = oppositeFuluAreaX;
    // 清除上家
    tmp = document.querySelectorAll(".leftFulu");
    for (let i = 0; i < tmp.length; i++) {
        tmp[i].remove();
    }
    leftCurY = leftFuluAreaY;

    // 清除牌河
    tmp = document.querySelectorAll(".discard");
    for (let i = 0; i < tmp.length; i++) {
        tmp[i].remove();
    }
    playerDiscard = [0, 0, 0, 0];

    // 重置游戏信息
    tmp = document.querySelectorAll(".gameInfo");
    for (let i = 0; i < tmp.length; i++) {
        tmp[i].remove();
    }

    // 重新绘制分数
    // 绘制自家
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = playerScore[selfPosition % 4];
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "30");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", w / 2 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY + tileWidth * 6 - 20);
    tmp.setAttributeNS(null, "id", "score0");
    tmp.setAttributeNS(null, "class", "gameInfo");
    // 绘制下家
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = playerScore[(selfPosition + 1) % 4];
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "30");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", middleFrameX + tileWidth * 6 - 10 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY + tileWidth * 3 - 10);
    tmp.setAttributeNS(null, "transform", `rotate(-90,${middleFrameX + tileWidth * 6 - 10}, ${middleFrameY + tileWidth * 3})`);
    tmp.setAttributeNS(null, "id", "score1");
    tmp.setAttributeNS(null, "class", "gameInfo");
    // 绘制对家
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = playerScore[(selfPosition + 2) % 4];
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "30");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", w / 2 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY);
    tmp.setAttributeNS(null, "transform", `rotate(180,${w / 2}, ${middleFrameY + 10})`);
    tmp.setAttributeNS(null, "id", "score2");
    tmp.setAttributeNS(null, "class", "gameInfo");
    // 绘制上家
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = playerScore[(selfPosition + 3) % 4];
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "30");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", middleFrameX + 10 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY + tileWidth * 3 - 10);
    tmp.setAttributeNS(null, "transform", `rotate(90,${middleFrameX + 10}, ${middleFrameY + tileWidth * 3})`);
    tmp.setAttributeNS(null, "id", "score3");
    tmp.setAttributeNS(null, "class", "gameInfo");
}

function draw_exhaustive_draw() {
    let svg =  document.querySelector("svg");
    // 绘制背景
    tmp = document.createElementNS(xmlns, "rect");
    tmp.setAttributeNS(null, "x", middleFrameX - 7 * tileWidth);
    tmp.setAttributeNS(null, "y", middleFrameY - 3 * tileWidth);
    tmp.setAttributeNS(null, "width", tileWidth * 20);
    tmp.setAttributeNS(null, "height", tileWidth * 12);
    tmp.setAttributeNS(null, "fill", "gray");
    tmp.setAttributeNS(null, "class", "gameInfo");
    svg.appendChild(tmp);
    // 绘制和牌玩家信息
    tmp = document.createElementNS(xmlns, "text");
    tmp.textContent = "流局";
    tmp.setAttributeNS(null, "x", 0);
    tmp.setAttributeNS(null, "y", 0);
    tmp.setAttributeNS(null, "font-size", "50");
    svg.appendChild(tmp);
    box = tmp.getBBox().width;
    tmp.setAttributeNS(null, "x", w / 2 - box / 2);
    tmp.setAttributeNS(null, "y", middleFrameY - 180);
    tmp.setAttributeNS(null, "class", "gameInfo");
}