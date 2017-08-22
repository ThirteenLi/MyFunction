requirejs.config({
    paths:{
        jquery:"jquery-1.11.2"
    }
});

require(["jquery","dialog"],function($,Dialog){
var index=1;
$("#open").on("click",function(){
    var settings={
        width:800,
        height:600,
        title:"我的弹出层"+index
    };
    index++;
    var dialog=new Dialog(settings);
    dialog.open();
});
$("#close").on("click",function(){
    $(".dialog-container:eq(-1)").remove();
    if(index>1){
        index--;
    }
});
    $("#close-all").on("click",function(){
        $(".dialog-container").remove();
        index=1;
    });
});