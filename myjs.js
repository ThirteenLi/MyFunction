/**
 * Created by a on 2017/7/5.
 */
//����¼����������ͣ�������
function addEvent(elem, type, handler){
    if(elem.addEventListener){//�������
        elem.addEventListener(type, handler);
    }else if(elem.attachEvent){
        elem.attachEvent("on" + type, handler);
    }else{
        elem["on" + type] = handler;
    }
}
//����id����Ԫ�ض���
function id(sId){
    return document.getElementById(sId);
}
//���ݱ�ǩ����Ԫ�ض���
function tag(sTagName,context){
    context=context||document;
    return context.getElementsByTagName(sTagName);
}
