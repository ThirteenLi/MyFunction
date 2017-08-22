requirejs.config({
    paths:{
        jquery:"jquery-1.11.2"
    }
});

define(["jquery"],function($){
    function Carousel(settings){
        this.$container=$('<div class="carousel-container"></div>');
        this.$picture=$('<div class="carousel-picture"></div>');
        this.$number=$('<ul class="carousel-number"></ul>');
        this.$left=$('<div class="carousel-left">&lt;</div>');
        this.$right=$('<div class="carousel-right">&gt;</div>');
        this.defaultSettings={
            selector:document.body,
            num:4,
            images:["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg"],
            width:750,
            height:500,
            interval:1000
        };
        $.extend(this.defaultSettings,settings);
    }
    Carousel.prototype.init=function(){
        for(var i=0;i<this.defaultSettings.num;i++){
            this.$picture.append( $("<img src="+ this.defaultSettings.images[i] +"></img>") );
            this.$number.append($("<li>"+(i+1)+"</li>"));
        }
        this.$container.css({
            width:this.defaultSettings.width,
            height:this.defaultSettings.height
        }).append(this.$picture).append(this.$number)
            .append(this.$left).append(this.$right).appendTo(this.defaultSettings.selector);
        $("img",this.$picture).eq(0).addClass("selected");
        $("li",this.$number).eq(0).addClass("selected");
    };




    return Carousel;
});