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