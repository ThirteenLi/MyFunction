requirejs.config({
    paths:{
        jquery:"jquery-1.11.2"
    }
});

define(["jquery"],function($){
function Dialog(settings){
    this.defaultSettings={
        width:500,
        height:400,
        title:"弹出层"
    };
    $.extend(this.defaultSettings,settings);
    this.$container=$('<div class="dialog-container"></div>');
    this.$mask=$('<div class="dialog-mask"></div>');
    this.$main=$('<div class="dialog-main"></div>');
    this.$title=$('<div class="dialog-title"></div>');
    this.$item=$('<div class="dialog-title-item"></div>');
    this.$close=$('<div class="dialog-title-close">[X]</div>');
    this.$content=$('<div class="dialog-content"></div>');
}
    Dialog.prototype.open=function(){
        this.$container.append(this.$mask).append(this.$main).appendTo(document.body);
        this.$main.append(this.$title).append(this.$content);
        this.$title.append(this.$item).append(this.$close);
        this.$close.on("click",function(){
            this.$container.remove();
        }.bind(this));
        this.$main.css({
            width:this.defaultSettings.width,
            height:this.defaultSettings.height
        });
        this.$item.html(this.defaultSettings.title);
    };
    Dialog.prototype.close = function(){
        this.$container.remove();
    };
return Dialog;
});