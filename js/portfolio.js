$(document).ready(function(){
    $(window).scroll(function(){
        if($(this).scrollTop() > 40){
            $('#backToTop').fadeIn();
        }
        else{
            $('#backToTop').fadeOut();
        }
    });       

    $("#backToTop").click(function(){
        $('html ,body').animate({scrollTop : 0},800);
    });
});