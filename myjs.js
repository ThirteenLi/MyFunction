/**
 * 添加事件
 * @param elem 绑定对象
 * @param type 事件类型
 * @param fn 方法
 */
function addEvent(elem,type,fn){
    if(addEventListener){
        elem.addEventListener(type,fn,false);
    }else if(attachEvent){
        elem[type+fn]=function(){
            fn.callee(elem);
        };
        elem.attachEvent('on'+type,elem[type+fn]);
    }else{
        elem['on'+type]=fn;
    }
}
/**
 * 移除事件
 * @param elem
 * @param type
 * @param fn
 */
function removeEvent(elem,type,fn){
    if(removeEventListener){
        elem.removeEventListener(type,fn,false);
    }else if(detachEvent){
        elem.detachEvent('on'+type,elem[type+fn]);
    }else{
        elem['on'+type]=null;
    }
}
/**
 * 根据id查找元素
 * @param sId
 * @returns {Element}
 */
function id(sId){
    return document.getElementById(sId);
}
/**
 * 根据标签查找元素对象
 * @param sTagName
 * @param context
 * @returns {NodeList}
 */
function tag(sTagName,context){
    context=context||document;
    return context.getElementsByTagName(sTagName);
}
/**
 * 根据className查找元素
 * @param className
 * @param context
 * @returns {Array}
 */
function getByClass(className,context){
    context=context||document;
    var arr=context.getElementsByTagName("*");
    var result=[];
    var re=new RegExp("\\b"+className+"\\b");
    for(var i=0;i<arr.length;i++){
        if(re.test(arr[i])){
            result.push(arr[i]);
        }
    }
    return result;
}
/**
 * 深克隆封装函数
 * @param obj
 * @returns {{}}
 */
function cloneObj(obj){
    var newObj={};
    for(var p in obj){
        if(typeof obj[p]==='object'){
            newObj[p]= arguments.callee(obj[p]);
        }else{
            newObj[p]=obj[p];
        }
    }
    return newObj;
}
/**
 * 合并对象
 * @param target 被合并的目标对象
 * @param obj 要合并的对象
 * @return 返回合并的新的对象
 */
function extend(target, obj) {
    for(var p in obj){
        if(typeof obj[p] === 'object'){
            target[p] = cloneObj(obj[p]);
        }else{
            target[p] = obj[p];
        }
    }
    return target;
}
/**
 * 下一个元素兄弟
 * @param elem
 * @returns {*}
 */
function next(elem){
    do{
        elem=elem&&elem.nextSibling;
    }while(elem&&elem.nodeType!=1);
    return elem;
}
/**
 * 上一个元素兄弟
 * @param elem
 * @returns {*}
 */
function prev(elem){
    do{
        elem=elem&&elem.previousSibling;
    }while(elem&&elem.nodeType!=1);
    return elem;
}
/**
 * 查找指定元素的第一个孩子节点
 * @param elem
 */
function first(elem) {
    elem = elem.firstChild;
    return elem && elem.nodeType == 1 ? elem : next(elem);
}
/**
 * 查找指定元素的最后一个孩子节点
 * @param elem
 */
function last(elem) {
    elem = elem.lastChild;
    return elem && elem.nodeType == 1 ? elem : prev(elem);
}
/**
 * 在给定的当前元素的前面插入一个新元素
 * @param elem 当前元素
 * @param newNode 新元素
 */
function before(elem, newNode) {
    elem.parentNode.insertBefore(newNode, elem);
}
/**
 * 在给定的当前元素的后面面插入一个新元素
 * @param elem 当前元素
 * @param newNode 新元素
 */
function after(elem, newNode) {
    if(elem.nextSibling){
        before(elem.nextSibling, newNode);
    }else{
        elem.parentNode.appendChild(newNode);
    }
}
/**
 * 删除给定的元素（删除自己）
 * @param elem
 */
function remove(elem) {
    elem.parentNode.removeChild(elem);
}
/**
 * 找到当前元素的所有兄弟
 * @param elem 当前元素
 * @return {Array} 返回当前元素的元素节点
 */
function siblings(elem) {
    var arr = [];
    var elements = elem.parentNode.children;
    for(var i=0; i<elements.length; i++){
        if(elements[i] != elem){
            arr.push(elements[i]);
        }
    }
    return arr;
}
/**
 * 去首尾空格
 * @param str
 * @returns {XML|string|void}
 */
function trim(str){
    return str.replace(/^\s+|\s+$/g,"");
}
/**
 * 获取css样式
 * @param elem 获取的元素对象
 * @param attr 获取的属性
 * @returns {*}
 */
function getStyle(elem,attr){
    if(elem.currentStyle){
        return elem.currentStyle[attr];
    }else if(window.getComputedStyle){
        return getComputedStyle(elem,false)[attr];
    }else{
        return elem.style[attr];
    }
}
/**
 * 修改css样式
 * @param elem
 * @param attr 对象或属性
 * @param value  undefined或属性值
 */
function css(elem,attr,value){
    if(value){

        elem.style[attr]=value;

    }else{
        for(var p in attr){
            switch (p){
                case 'width':
                case 'height':
                case 'padding':
                case 'paddingLeft':
                case 'paddingRight':
                case 'paddingTop':
                case 'paddingBottom':
                    value=/\%/.test(attr[p])?attr[p]:Math.max(parseInt(attr[p]),0)+'px';
                    break;
                case 'left':
                case 'top':
                case 'bottom':
                case 'right':
                case 'margin':
                case 'marginLeft':
                case 'marginRight':
                case 'marginTop':
                case 'marginBottom':
                    value=/\%/.test(attr[p])?attr[p]:parseInt(attr[p])+'px';
                    break;
                default :
                    value=attr[p];
            }

            elem.style[p]=value;

        }

    }
}
/**
 * $函数
 * @param selector
 * @param context
 * @returns {{click: Function, mouseover: Function, mouseout: Function, next: Function, getstyle: Function, css: Function}}
 */
function $(selector,context){
    context=context||document;
    var elements=[];
    switch(selector.charAt(0)){
        case '#':
            elements=[document.getElementById(selector.substring(1))];
            break;
        case '.':
            elements=getByClass(selector.substring(1),context);
            break;
        default :
            elements=context.getElementsByTagName(selector);
    }
    return {
        click:function(fn){
            for(var i=0;i<elements.length;i++){
                addEvent(elements[i],'click',fn);
            }
            return this;
        },
        mouseover:function(fn){
            for(var i=0;i<elements.length;i++){
                addEvent(elements[i],'mouseover',fn);
            }
            return this;
        },
        mouseout:function(fn){
            for(var i=0;i<elements.length;i++){
                addEvent(elements[i],'mouseout',fn);
            }
            return this;
        },
        next:function(){
            return next(elements[0]);
        },
        getstyle:function(attr){
            return getStyle(elements[0],attr);
        },
        css:function(attr,value){
            for(var i=0;i<elements.length;i++){
                css(elements[i],attr,value);
            }
            return this;
        }

    }
}

