/**
 * 添加事件
 * @param elem 绑定对象
 * @param type 事件类型
 * @param handler 方法
 */
function addEvent(elem, type, handler){
    if(elem.addEventListener){//能力检测
        elem.addEventListener(type, handler);
    }else if(elem.attachEvent){
        elem.attachEvent("on" + type, handler);
    }else{
        elem["on" + type] = handler;
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
 * css查找元素
 * @param selector
 * @param context
 * @returns {*}
 */
function $(selector,context){
    context=context||document;
    switch (selector.charAt(0)){
        case '#':
            return [document.getElementById(selector.substring(1))];
            break;
        case '.':
            return getByClass(selector.substring(1),context);
            break;
        default:
            return context.getElementsByTagName(selector);
    }
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
 * @param elem 要获取的对象
 * @param attr 要获取的样式
 * @returns {*}
 */
function getStyle(elem,attr){
    if(elem.currentStyle){//IE
        return elem.currentStyle[attr];
    }else if(window.getComputedStyle){
        return getComputedStyle(elem,false)[attr];
    }else{
        return elem.style[attr];
    }

}