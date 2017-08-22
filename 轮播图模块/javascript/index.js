requirejs.config({
    paths:{
        jquery:"jquery-1.11.2"
    }
});

require(["jquery","carousel"],function($,Carousel){
var carousel=new Carousel;
    carousel.init();
});