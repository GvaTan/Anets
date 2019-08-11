$(function(){
	showDetai();
	liWhenClick();
});


function liWhenClick(){
    $(".left .menus li").bind('click',function(){
    	$(this).find('a').addClass("liWhenClickCss");
    	$(this).siblings().find('a').removeClass("liWhenClickCss");
    	$(this).parent().siblings().find('li').find('a').removeClass("liWhenClickCss");
    });
}
function showDetai(){
	$(".showAndHide").bind('click',function(){
		if($(this).next().css('display')=='none'){
			$(this).next().slideDown();
			$(this).siblings(".showAndHide").next().slideUp();
			$(this).siblings(".showAndHide").find(".showAndHideImg").attr('src','../../static/image/small/return.png');

			$(this).parent().siblings().find(".showAndHide").next().slideUp();
			$(this).parent().siblings().find(".showAndHide").find(".showAndHideImg").attr('src','../../static/image/small/return.png');
			$(this).find(".showAndHideImg").attr('src','../../static/image/small/more.png');
		}else{
			// $(".showAndHide").css('background-color','rgba(28,43,54,1)');
            $(this).next().slideUp();
            $(this).find(".showAndHideImg").attr('src','../../static/image/small/return.png');
		}
	})

}
