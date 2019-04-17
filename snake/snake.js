var start = document.getElementsByClassName('start')[0];
// var box = document.getElementsByClassName('box')[0];
var wrapper = document.getElementsByClassName('wrapper')[0];
var snake = document.getElementsByClassName("snake")[0];
var box = document.getElementById("BOX");


var direction = "null";
var num = 0;
var speed = 150;
var timer = null;
var foods = null;
var snakeS = snake.children;
var arrayX = [];
var arrayY = [];
var snlen = snakeS.length;
var lock = true;



var snakex = Math.floor(Math.random() * (wrapper.offsetWidth - box.offsetWidth + 1));
var snakey = Math.floor(Math.random()* (wrapper.offsetHeight - box.offsetHeight + 1));
var snakeX = snakex- snakex % box.offsetWidth;
var snakeY = snakey- snakey % box.offsetWidth;
box.style.left = snakeX+ "px";
box.style.top = snakeY + "px";


addEvent(start, "click", Start);
function Start (){
    start.style.display = "none";
    direction = "right";
    move(direction);
}

var n;
document.onkeydown = function (e){
    var key = e.keyCode;
    if(key == 37 && n != 2){
        n = 4;
        direction = "left";
    }
    if(key == 39 && n != 4){
        n = 2;
        direction ="right";
    }
    if(key == 38 && n != 3){
        n = 1;
        direction ="top";
    }
    if(key == 40 && n != 1){
        n = 3;
        direction = "bottom";
    }
    move(direction);
}


//蛇头运动
function move (direction){
    var width = box.offsetWidth;
    clearInterval(timer);
    var lenx = arrayX.length;
    var leny = arrayY.length;
    // 改变蛇头方向；
    snkDirction();
//左右方向运动；
    if(direction == "left" || direction == "right"){
        //位置跟踪；
        if(direction == "right"){
            width *= -1;
        }
        timer = setInterval(function (){
            //游戏结束条件；
            if(box.offsetLeft < 0 || box.offsetLeft + box.offsetWidth > wrapper.offsetWidth ){
                clearInterval(timer);
                alert("游戏结束，您一共吃了" + num + "坨屎，被评为吃屎达人！")
            }else{
                box.style.left = parseInt(getStyle(box, "left")) - width + "px";   
            }
            //判断是否在横向运动中吃到食物
            if(box.offsetLeft == foods.offsetLeft && box.offsetTop == foods.offsetTop){
                //消除现有食物 后 添加新食物 后 创建新蛇body 后 改变蛇头方向class
                wrapper.removeChild(wrapper.children[1]); 
                food();
                snakes();
                // 改变蛇头方向；
                snkDirction();
            }
            arrayX.push(box.offsetLeft);
            arrayY.push(box.offsetTop);
            //运动跟踪赋值
            position();
            suicide ();
        },speed); 
    }
//上下方向运动
    if(direction == "top" || direction == "bottom"){
        if(direction == "bottom"){
            width *= -1;
        }
        timer = setInterval(function (){
            if(box.offsetTop < 0 || box.offsetTop + box.offsetHeight > wrapper.offsetHeight ){
                clearInterval(timer);
                alert("游戏结束，您一共吃了" + num + "坨屎，被评为吃屎达人！")
            }else{
                box.style.top = parseInt(getStyle(box, "top")) - width + "px";
            }
            //判断是否在纵向运动中吃到食物
            if(box.offsetLeft == foods.offsetLeft && box.offsetTop == foods.offsetTop){
                 //消除现有食物 后 添加新食物 后 创建新蛇body
                 wrapper.removeChild(wrapper.children[1]); 
                 food();
                 snakes();
                 //控制斜眼方向
                 snkDirction();
            }
            arrayX.push(box.offsetLeft);
            arrayY.push(box.offsetTop);
            //运动跟踪赋值
            position();
            //判断自杀行为
            suicide ()
        },speed); 
    }
}

//改变蛇方向；
function snkDirction(){
    var snlen1 = snakeS.length;
    for(var j = 0 ; j < snlen1; j ++){
        if(direction == "right"){
            snake.children[j].className = "box";
        }
        if(direction == "left"){
            snake.children[j].className = "box1";
        }
    }
}

//添加食物（滑稽）
    function food(){
        var foodx = Math.floor(Math.random() * (wrapper.offsetWidth - box.offsetWidth + 1));
        var foody = Math.floor(Math.random()* (wrapper.offsetHeight - box.offsetHeight + 1));
        var foodX = foodx- foodx % box.offsetWidth;
        var foodY = foody- foody % box.offsetWidth;

        for(var b = 0 ; b < snakeS; b ++){
            if(foodX == snake.children[b].offsetLeft && foodY == snake.children[b].offsetTop){
                lock = false;
                return food();
                console.log("food坐标重复，已自动重新获取随机数！")
            }
        }
        if(lock){
            foods = document.createElement("div");
            foods.style.left = foodX + "px";
            foods.style.top = foodY + "px";
            foods.className = "foods";
            wrapper.appendChild(foods);
        }
    }
    food();


//添加蛇身体
function snakes(){
    var snakeBody = document.createElement("div");
    snakeBody.className = "box";
    snake.appendChild(snakeBody);
    num ++ ;
    // 加速度
    if(num % 5 == 0){
        speed -= 20;
    }
    if(speed <= 40){
        speed = 40;
    }
}

//位置跟踪；
function position(){
    snlen = snakeS.length;
    var X = arrayX.length;
    var Y = arrayY.length;
    for(var i = 1 ; i < snlen; i ++){
        snakeS[i].style.left = arrayX[X - i-1] +"px";
        snakeS[i].style.top = arrayY[Y - i-1] +"px";
    }
}


//判断蛇头是否接触身体，没有什么是一个for循环+一个if解决不了的，如果有，那就两个！
function suicide (){
    snlen = snakeS.length;
    if(snake.children[1]){
        for(var s = 1 ; s < snlen; s ++){
            if(box.offsetLeft == snakeS[s].offsetLeft && box.offsetTop == snakeS[s].offsetTop){
                clearInterval(timer);
                alert("游戏结束，您一共吃了" + num + "坨屎，被评为吃屎达人！")
            }
        }
    }
}

