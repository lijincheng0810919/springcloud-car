$(function(){
	//遍历ul是否溢出
	$(".sitemap_ul").each(function(){
		if(hasOverflow($(this))){
			$(this).children(".sitemap_icon").show();
		}
	});

	//查看是否溢出
	function hasOverflow(dom){
		var ul = dom;
		var y = ul.children("li:last-child").position().top;
		if(y != 0){
			return true;
		}else{
			return false;
		}
	}

	//点击展开
	$(".sitemap_icon").on('click',function(){
		$(this).toggleClass("clicked");
		if($(this).parent().css("height") != "25px"){
			$(this).parent().css("height","25px");
		}else{
			$(this).parent().css("height","auto");
		}
	});
})
