function draw_room() {
    // 绘制房间界面
    let topUserArea = document.createElement("div");
    topUserArea.setAttribute("id", "topUserArea");
    for (let i = 0; i < 2; i++) {
        tmp = document.createElement("div");
        tmp.setAttribute("class", "userArea");
        tmp_text_div = document.createElement("div");
        tmp_text_div.setAttribute("class", "textDiv");
        tmp_text = document.createElement("text");
        tmp_text.textContent = "";
        tmp_text_div.appendChild(tmp_text);
        tmp_text = document.createElement("text");
        tmp_text.textContent = "";
        tmp_text_div.appendChild(tmp_text);
        tmp.appendChild(tmp_text_div);
        topUserArea.appendChild(tmp);
    }

    let bottomUserArea = document.createElement("div");
    bottomUserArea.setAttribute("id", "bottomUserArea");
    for (let i = 0; i < 2; i++) {
        tmp = document.createElement("div");
        tmp.setAttribute("class", "userArea");
        tmp_text_div = document.createElement("div");
        tmp_text_div.setAttribute("class", "textDiv");
        tmp_text = document.createElement("text");
        tmp_text.textContent = "";
        tmp_text_div.appendChild(tmp_text);
        tmp_text = document.createElement("text");
        tmp_text.textContent = "";
        tmp_text_div.appendChild(tmp_text);
        tmp.appendChild(tmp_text_div);
        bottomUserArea.appendChild(tmp);
    }
    
    let perpareButton = document.createElement("div");
    perpareButton.setAttribute("id", "perpareButton");
    tmp = document.createElement("button");
    tmp.setAttribute("onclick", "prepare()");
    tmp.textContent = "准备";
    perpareButton.appendChild(tmp);

    let container = document.getElementById("container");
    container.appendChild(topUserArea);
    container.appendChild(perpareButton);
    container.appendChild(bottomUserArea);
}

// 更新房间状态
function room_update(received) {
    tmp = document.getElementById("topUserArea").childNodes;
    for (let i = 0; i < received.player_list.length; i++) {
        if (received.player_list[i] == '') {
            tmp[i%2].firstChild.firstChild.textContent = "";
            tmp[i%2].firstChild.lastChild.textContent = "";
            if (i == 1) {
                tmp = document.getElementById("bottomUserArea").childNodes;
            }
            continue;
        }
        if (received.player_prepare[i] == 1) {
            tmp[i%2].firstChild.firstChild.textContent = received.player_list[i];
            tmp[i%2].firstChild.lastChild.textContent = "已准备"
        }
        else {
            tmp[i%2].firstChild.firstChild.textContent = received.player_list[i];
            tmp[i%2].firstChild.lastChild.textContent = "未准备"
        }
        if (i == 1) {
            tmp = document.getElementById("bottomUserArea").childNodes;
        }
    }
}