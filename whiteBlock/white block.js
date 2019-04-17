var start = document.getElementsByClassName('start')[0];
var main = document.getElementsByClassName('main')[0];
var start2 = document.getElementsByClassName("start2")[0];
var timer = null;
var speed = 4;
var num = 0;
var lock = true;

addEvent(start, "click", Start);
function Start() {
    start.style.display = "none";
    console.log(start.offsetTop)
    startMove(start2, { top: start2.offsetTop - 600 }, function () {
        start2.style.display = "none";
        move();
    });
}

function move() {
    timer = setInterval(function () {
        main.style.top = main.offsetTop + speed + "px";
        if (main.offsetTop >= 0) {
            main.style.top = "-150px";
            append();
        }
        var len = main.children.length;//需要写在定时器内,该值不是实时变化的！
        if (len == 6) {
            for (var j = 0; j < 4; j++) {
                if (main.children[len - 1].children[j].className == "black") {
                    console.log("over")
                    clearInterval(timer);
                    alert("游戏结束，得分" + num + "，希望你能反省一下你自己！");
                    var lock = true;
                }
            }
            main.children[len - 1].remove();
        }
    }, 10)
}

function append() {
    var quilt = document.createElement('div');
    var index = Math.floor(Math.random() * 4);
    for (var i = 0; i < 4; i++) {
        var box = document.createElement("div");
        quilt.appendChild(box);
        box.setAttribute("class", "btn");
        var dom = quilt.children;
        if (index == i) {
            dom[index].className = "black";
            console.log("a")
        }
    }
    if (!main.children) {
        main.appendChild(qulit);
    } else {
        main.insertBefore(quilt, main.children[0]);
    }
    click(quilt);
}

function click(quilt) {
    if (lock) {
        quilt.onclick = function (e) {
            console.log(e);
            var target = e.target || e.srcElement;
            if (target.getAttribute("class") == "black") {
                target.setAttribute("class", "btn2");
                // console.log("aaa");
                num++
            } else {
                clearInterval(timer);
                alert("游戏结束，得分" + num + "，希望你能反省一下你自己！")
                lock = false;
            }
            if (num % 10 == 0) {
                speed++;
            }
        }
    }
}