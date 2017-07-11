/**
 * ����¼�
 * @param elem �󶨶���
 * @param type �¼�����
 * @param handler ����
 */
function addEvent(elem, type, handler){
    if(elem.addEventListener){//�������
        elem.addEventListener(type, handler);
    }else if(elem.attachEvent){
        elem.attachEvent("on" + type, handler);
    }else{
        elem["on" + type] = handler;
    }
}
/**
 * ����id����Ԫ��
 * @param sId
 * @returns {Element}
 */
function id(sId){
    return document.getElementById(sId);
}
/**
 * ���ݱ�ǩ����Ԫ�ض���
 * @param sTagName
 * @param context
 * @returns {NodeList}
 */
function tag(sTagName,context){
    context=context||document;
    return context.getElementsByTagName(sTagName);
}
/**
 * ����className����Ԫ��
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
 * ���¡��װ����
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
 * @param target ���ϲ���Ŀ�����
 * @param obj Ҫ�ϲ��Ķ���
 * @return ���غϲ����µĶ���
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
 * ��һ��Ԫ���ֵ�
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
 * ��һ��Ԫ���ֵ�
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
 * ����ָ��Ԫ�صĵ�һ�����ӽڵ�
 * @param elem
 */
function first(elem) {
    elem = elem.firstChild;
    return elem && elem.nodeType == 1 ? elem : next(elem);
}
/**
 * ����ָ��Ԫ�ص����һ�����ӽڵ�
 * @param elem
 */
function last(elem) {
    elem = elem.lastChild;
    return elem && elem.nodeType == 1 ? elem : prev(elem);
}
/**
 * �ڸ����ĵ�ǰԪ�ص�ǰ�����һ����Ԫ��
 * @param elem ��ǰԪ��
 * @param newNode ��Ԫ��
 */
function before(elem, newNode) {
    elem.parentNode.insertBefore(newNode, elem);
}
/**
 * �ڸ����ĵ�ǰԪ�صĺ��������һ����Ԫ��
 * @param elem ��ǰԪ��
 * @param newNode ��Ԫ��
 */
function after(elem, newNode) {
    if(elem.nextSibling){
        before(elem.nextSibling, newNode);
    }else{
        elem.parentNode.appendChild(newNode);
    }
}
/**
 * ɾ��������Ԫ�أ�ɾ���Լ���
 * @param elem
 */
function remove(elem) {
    elem.parentNode.removeChild(elem);
}
/**
 * �ҵ���ǰԪ�ص������ֵ�
 * @param elem ��ǰԪ��
 * @return {Array} ���ص�ǰԪ�ص�Ԫ�ؽڵ�
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
 * css����Ԫ��
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
 * ȥ��β�ո�
 * @param str
 * @returns {XML|string|void}
 */
function trim(str){
    return str.replace(/^\s+|\s+$/g,"");
}
/**
 * ��ȡcss��ʽ
 * @param elem Ҫ��ȡ�Ķ���
 * @param attr Ҫ��ȡ����ʽ
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