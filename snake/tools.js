//查看滚动条的滚动距离
    function getScrollOffset(){
        if(window.pageXOffset){
            return{
                x : window.pageXOffset,
                y : window.pageYOffset
            }
        }else{
            return{
                x : document.body.scrollLeft + document.documentElement.scrollLeft,
                y : document.body.scrollTop + document.documentElement.scrollTop
            }
        }
    }


//查看可视窗口尺寸（升级版）
    function getViewportOffset (){
        if(document.compatMode === "backCompat"){
            return{
                w : document.body.clientWidth,
                h : document.body.clientHeight
            }
        }else{
            return{
                w : document.documentElement.clientWidth,
                h : document.documentElement.clientHeight
            }
        }
        if(window.innerWidth){
            return{
                w : window.innerWidth,
                h : window.innerHeight
            }
        }
    }   


//查看可视窗口尺寸（bug版，window.innerWidth会加上滚动条的距离，不好用）
    // function getViewportOffset (){
    //     if(window.innerWidth){
    //         return{
    //             w : window.innerWidth,
    //             h : window.innerHeight
    //         }
    //     }else{
    //         if(document.compatMode === "backCompat"){
    //             return{
    //                 w : document.body.clientWidth,
    //                 h : document.body.clientHeight
    //             }
    //         }else{
    //             return{
    //                 w : document.documentElement.clientWidth,
    //                 h : document.documentElement.clientHeight
    //             }
    //         }
    //     }
    // }




//封装获取元素样式style方法:  getStyle(DOM元素,属性名)；
    function getStyle(elem, prop){
        if(window.getComputedStyle){
            return window.getComputedStyle(elem, null)[prop];
        }else{
            return elem.currentStyle[prop];
        }
    }


//封装事件处理函数:  addEvent（元素, 事件类型, 事件处理函数）;
    function addEvent(elem, type, handle){
        if(elem.addEventListener){
            elem.addEventListener(type, handle, false);
        }else if(elem.attachEvent){
            elem.attachEvent('on' + type, function(){
                handle.call(elem);
            })
        }else{
            elem['on' + type] = handle;
        }
    } 


// 封装解除事件方法
     function removeEvent(elem, type , handle){
        if(removeEventListener){
            elem.removeEventListener(type, handle, false);
        }else if(datachEvent){
            elem.detachEvent("on" + type , handle);
        }else{
            elme["on" + type] = null;
        }
     }


// 封装取消冒泡函数  stopBubble(元素名)
    function stopBubble(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancalBubble = true;
        }
    }


// 封装阻止默认事件方法
    function cancelHandler(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
        event.returnValue = false;
        }
    }


//获取事件触发之后的事件对象信息，以及对象源对象信息兼容写法
// div.onclick = function (e){
//     var event = e || window.event;  //获取事件对象兼容写法
//     var target = event.target || event.srcElement; //获取事件源对象兼容写法
//     console.log(event);   //event  事件对象       target  事件源对象
// }


//封装深度克隆函数
    function deepClone(origin, target){
        var target = target || {},
            toStr = object.prototype.toString,
            arrStr = "[object Array]";
        for(var prop in origin){
            if(origin.hasOwmProperty[prop]){
                if(typeof(origin[prop]) == "object"){
                    if(toStr.call(origin[prop]) == arrStr){
                        target[prop] = [];
                    }else{
                        target[prop] = {};
                    }
                    deepClone(origin[prop], target[prop]);
                }
            }else{
                target[prop] = oriogn[prop];
            }
        }
    }


// 封装拖拽功能；    --->   浅度封装
function drag(elem){
    var disX,
        disY;
    addEvent(elem, 'mousedown',function(e){
        var event = e || window.event;
        disX = event.clientX - parseInt(elem.offsetLeft);
        disY = event.clientY - parseInt(elem.offsetTop);
        addEvent(document, "mousemove",mouseMove);
        addEvent(document, "mouseup" , mouseUp);
        stopBubble(event);
        cancelHandler(event);
    });
    function mouseMove(e){
        var event = e || window.event;
        elem.style.left = event.clientX - disX + "px";
        elem.style.top = event.clientY - disY + "px";
    }
    function mouseUp(e){
        var event = e || window.event;
        removeEvent(document, "mousemove" , mouseMove);
        removeEvent(document, "mouseup", mouseUp);
    }
}


//封装异步加载；？？？？？？？？？？？？？？？？？？？？？
function loadScript(url, callback){
    var script = document.createElementNS("script");
    script.type = "text/javascript";
    if(script.readyState){
        script.onreadystatechange = function(){
            if(script.readyState == "complete"|| script.readyState == "loaded"){
                callback();
            }
        }
    }else{
        script.onload = function (){
            callback();
        }
    }
    script.src = url;
    //注意：需要引用函数来调用执行函数。否则会即使执行而导致报错，如下所示：
    // loadScript("incident2.js",function(){
    //     test();
    // });
    document.head.appendChild(script);

}
   

// //封装链式调动运动（缓冲）方法    --->   浅度封装
// 任意一组对象(对象上面的属性是同时运动，对多个对象来说是链式调动！)  ---->  达到任一组值的 缓冲运动。
// (传入元素组，传入对象值组，ps:微调参数值)；    
    function startMove(obj, json, callback){ 
        clearInterval(obj.timer);
        var speed , icur;
        obj.timer = setInterval(function(){
            var stop = true;
            for( var attr in json){
                if(attr == "opacity"){
                    icur = parseFloat(getStyle(obj, attr)) * 100 ;
                }else{
                    icur = parseInt(getStyle(obj, attr));
                }
                speed = (json[attr] - icur) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if(attr == "opacity"){
                    obj.style.opacity = (icur + speed) / 100;
                }else{
                    obj.style[attr] = icur + speed + "px";
                }
                if(icur != json[attr]){
                    stop = false;
                }
            }
            if(stop){
                clearInterval(obj.timer);
                typeof callback == "function" ? callback() : "";
            }
        }, 30);
    }



// 封装弹性运动(复合型)；   --->   浅度封装
function elas(){
    var test = function (){
        elasticity(this, "left");
    }
    addEvent(obj,"click", test );
    
    var timer = null;
    function elasticity(obj, attr){
        clearInterval(obj.timer);
        var speed = 40, a ,u = 0.8;
        obj.timer = setInterval(function(){
            a = (300 - parseInt(getStyle(obj, attr))) / 8; //分子刚好满足越远越慢，越近越快
            speed = speed + a;//动态加速度
            speed = speed * u;//摩擦系数；
            if(Math.abs(speed) < 1 && Math.abs(300 - parseInt(getStyle(obj, attr))) < 1 ){
                 clearInterval(obj.timer);
                 obj.style[attr] = target + "px";
            }else{
                obj.style[attr] = parseInt(getStyle(obj, attr)) + speed + "px";
            }
        },30);
    }
}


//封装圣杯方法函数；
