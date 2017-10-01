var chess = document.getElementById('chess');   //获取画布
var context = chess.getContext('2d');   //设置画布渲染

var colorNow = true;    //棋手标记 true为玩家下棋，false为AI下棋
var chessBoard = [];    //棋盘计数，用于存储棋盘上各个点是否有落子
var over = false;   //判断是否结束
var wins = [];    //赢法数组
var count = 0;    //赢法统计数组，用于统计一共有多少种赢法
var myWin = [];   //玩家的赢法统计
var aiWin = [];   //AI的赢法统计

//棋盘背景
var img = new Image();
img.src = './images/bg.jpg';
img.onload = function() {
    context.drawImage(img, 0, 0, 450, 450);
    drawChessBoard();
}

//绘制棋盘
var drawChessBoard = function() {
    for (var i=0; i<15; i++) {
        //竖线
        context.moveTo(15 + i*30, 15);
        context.lineTo(15 + i*30, 435);
        context.stroke();

        //横线
        context.moveTo(15, 15 + i*30);
        context.lineTo(435, 15 + i*30);
        context.stroke();
    }
}
context.strokeStyle = "#bfbfbf";

//绘制棋子
var oneStep = function(i, j, colorNow) {
        context.beginPath();
        context.arc(15 + i*30, 15 + j*30, 13, 0, 2 * Math.PI);
        context.closePath();
        var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 -2, 13, 15 + i*30 + 2, 15 + j*30, 0);
        if (colorNow) {
            gradient.addColorStop(0, '#0a0a0a');
            gradient.addColorStop(1, '#636766');
        } else {
            gradient.addColorStop(0, '#d1d1d1');
            gradient.addColorStop(1, '#f9f9f9');
        }

        context.fillStyle = gradient;
        context.fill();
}

//遍历棋盘每个点
for (var i=0; i<15; i++) {
    chessBoard[i] = [];
    for (var j=0; j<15; j++) {
        chessBoard[i][j] = 0;
    }
}

//玩家落棋子事件绑定
chess.onclick = function(e) {
    //判断对局是否完成或是否是轮到玩家下棋
    if (over || colorNow == false) {
      return;
    }
    //获取鼠标点击位置坐标，并转换为落点坐标
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    //判断当前落点是否已有棋子，如果没有则落子成功
    if (chessBoard[i][j] === 0) {
        oneStep(i, j, colorNow);
        chessBoard[i][j] = 1;
        for (var k=0; k<count; k++) {
          if (wins[i][j][k]) {
            myWin[k]++;
            aiWin[k] = 6;
            if (myWin[k] == 5) {
              window.alert("你战胜了小渐！");
              over = true;
            }
          }
        }
        //判断对局是否没结束，如果是将换成电脑下子
        if (over == false) {
          colorNow = !colorNow;
          computerAI();
        }
    }
}

//赢法数组：记录了五子棋所有的赢法，三维数组
for (var i=0; i<15; i++) {
    wins[i] = [];
    for (var j=0; j<15; j++) {
        wins[i][j] = [];
    }
}

//横
for (var i=0; i<15; i++) {
    for(var j=0; j<11; j++) {
        for (var k=0; k<5; k++){
            wins[i][j + k][count] = true;
        }
        count++;
    }
}

//竖
for (var i=0; i<15; i++) {
    for(var j=0; j<11; j++) {
        for (var k=0; k<5; k++){
            wins[j + k][i][count] = true;
        }
        count++;
    }
}

//正斜
for (var i=0; i<11; i++) {
    for (var j=0; j<11; j++) {
      for (var k=0; k<5; k++) {
        wins[i + k][j + k][count] = true;
      }
      count++;
    }
}

//反斜
for (var i=0; i<11; i++) {
    for (var j=14; j>3; j--) {
      for (var k=0; k<5; k++) {
        wins[i + k][j - k][count] = true;
      }
      count++;
    }
}

//统计有多少种赢法
console.log(count);

//赢法统计
for (var i=0; i<count; i++) {
  myWin[i] = 0;
  aiWin[i] = 0;
}

//AI方落棋子
var computerAI = function() {
  var myScore = [];
  var computerScore = [];
  var maxScore = 0;   //保存最高分数
  var u = 0, v = 0;   //保存最高分数点的坐标

  //分数统计初始化
  for (var i=0; i<15; i++) {
    myScore[i] = [];
    computerScore[i] = [];
    for (var j=0; j<15; j++) {
      myScore[i][j] = 0;
      computerScore[i][j] = 0;
    }
  }

  for (var i=0; i<15; i++) {
    for (var j=0; j<15; j++) {
      if (chessBoard[i][j] == 0) {
        for (var k=0; k<count; k++) {
          if (wins[i][j][k]) {

            if (myWin[k] == 1) {
              myScore[i][j] += 200;
            } else if (myWin[k] == 2) {
              myScore[i][j] += 400;
            } else if (myWin[k] == 3) {
              myScore[i][j] +=2000;
            } else if (myWin[k] == 4) {
              myScore[i][j] +=10000;
            }

            if (aiWin[k] == 1) {
              computerScore[i][j] += 220;
            } else if (aiWin[k] == 2) {
              computerScore[i][j] += 420;
            } else if (aiWin[k] == 3) {
              computerScore[i][j] +=2200;
            } else if (aiWin[k] == 4) {
              computerScore[i][j] +=20000;
            }
          }
        }

        //通过判断获取最优的落子点
        if (myScore[i][j] > maxScore) {
          maxScore = myScore[i][j];
          u = i;
          v = j;
        } else if (myScore[i][j] == maxScore) {
          if (computerScore[i][j] > computerScore[u][v]) {
            u = i;
            v = j;
          }
        }

        if (computerScore[i][j] > maxScore) {
          maxScore = computerScore[i][j];
          u = i;
          v = j;
        } else if (computerScore[i][j] == maxScore) {
          if (myScore[i][j] > myScore[u][v]) {
            u = i;
            v = j;
          }
        }
      }
    }
  }

  oneStep(u, v, colorNow);
  chessBoard[u][v] = 2;
  for (var k=0; k<count; k++) {
    if (wins[u][v][k]) {
      aiWin[k]++;
      myWin[k] = 6;
      if (aiWin[k] == 5) {
        window.alert("小渐赢了！");
        over = true;
      }
    }
  }
  if (!over) {
    colorNow = !colorNow;
  }
}
