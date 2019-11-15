$(function(){
  /*车辆详情页了解更多*/
  $("#carMsg").hover(
  	function() {
      $(this).addClass("active");
      $("#msgMore").show();
    },
    function() {
      $(this).removeClass("active");
      $("#msgMore").hide();
    });
  $(".day-pic").hover(
  	function() {
      $("#msgMore").show().css({"top":"90px","right":"5px"});
    },
    function() {
      $("#msgMore").hide();
    });

  /*车辆详情页分享到*/
  $("#sMore").hover(
  	function() {
      $("#shareCar").show();
    },
    function() {
      $("#shareCar").hide();
    })
	var tabs = function(e1, e2, e3){//这是定义一个方法，有三个参数
	  var e1 = $('a', e1);//这是定义一个变量，用作获取tabs的第一个参数作为选择器的
	  var e2 = $(e2);
	  e1.click(function(){
	  	$('.error').remove();
	    if(!$(this).hasClass('active')){
	      e1.removeClass('active');
	      $(this).addClass('active');
	      var idx = e1.index(this);
	      e2.fadeOut(0).removeClass('actived');
	      $(e2[idx]).fadeIn(0).addClass('actived');
	      $(e3).attr('href',$(this).attr('href'));
	    }
	  });
	}
	// //横排，竖排显示方式
	tabs('.rec-tit', '.slideRec');
	tabs('.con-nav', '.TabCon');
	tabs('.logintab', '.logincon');
	//tabs('.SaleTabs', '.fpay');
	//tabs('.uxt-wrap .list', '.lDetail');
	tabs('.titTab', '.simTab');
	tabs('.uTit','.uCon');
	tabs('.pic-tab','.car-big');
	tabs('.tab-frame','.list-con');
	tabs('.opt-tab','.car-con');
	tabs('.opt-switch','._list-con');
	tabs('.kind_city_letter','.kind_city_area');//友情链接城市选择
	tabs('.kind_brand_letter','.kind_brand_area');//友情链接品牌选择
	// //列表页图片中间间距
	// $(".car-box .car-crs:even").css("margin-right","16px");
	// $(".car-box .car-vtc:last").css("border-bottom","1px solid #d9d9d9");
})


