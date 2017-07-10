/**
 * Created by a on 2017/7/5.
 */
//添加事件（对象，类型，方法）
function addEvent(elem, type, handler){
    if(elem.addEventListener){//能力检测
        elem.addEventListener(type, handler);
    }else if(elem.attachEvent){
        elem.attachEvent("on" + type, handler);
    }else{
        elem["on" + type] = handler;
    }
}
//根据id查找元素对象
function id(sId){
    return document.getElementById(sId);
}
//根据标签查找元素对象
function tag(sTagName,context){
    context=context||document;
    return context.getElementsByTagName(sTagName);
}
