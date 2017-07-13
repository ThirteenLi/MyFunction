/**
 * ����¼�
 * @param elem �󶨶���
 * @param type �¼�����
 * @param fn ����
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
 * �Ƴ��¼�
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
 * �ϲ�����
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
 * ȥ��β�ո�
 * @param str
 * @returns {XML|string|void}
 */
function trim(str){
    return str.replace(/^\s+|\s+$/g,"");
}
/**
 * ��ȡcss��ʽ
 * @param elem ��ȡ��Ԫ�ض���
 * @param attr ��ȡ������
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
 * �޸�css��ʽ
 * @param elem
 * @param attr ���������
 * @param value  undefined������ֵ
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
 * $����
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

