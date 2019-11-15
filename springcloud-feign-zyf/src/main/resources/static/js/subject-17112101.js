$(function() {
	var bannerLi = $(".banner li"),
		conDiv = $(".car-box");
	var subjecttabs = function(e1) {
		var e1 = $(e1);
		e1.click(function() {
			if (!$(this).hasClass('active')) {
				e1.removeClass('active');
				$(this).addClass('active');
				var idx = e1.index(this);
				if ($(this).parent().prop("className") == "nav-wrap") {
					$(".dot li").removeClass('active');
					$(".dot li").eq(idx).addClass('active');
				}
				if ($(this).parent().prop("className") == "dot") {
					$(".nav-wrap li").removeClass('active');
					$(".nav-wrap li").eq(idx).addClass('active');
				}
				conDiv.fadeOut(0);
				bannerLi.fadeOut(100);
				$(conDiv[idx]).fadeIn(0);
				$(bannerLi[idx]).fadeIn(100);
			}
		});
		e1.click(function() {
			return false;
		})
	}
	subjecttabs('.nav-wrap li');
	subjecttabs('.dot li');

	/*活动页面首页效果*/
	var divHtml = $("<div class='hover'></div>");
	$(".item ul li").each(function(index) {
		$(this).hover(function() {
			$(this).css("z-index", "10");
			divHtml.append($(this).html());
			$(this).append(divHtml);
		}, function() {
			$(this).css("z-index", "1");
			$(".hover").html("");
			$(".hover").remove();
		})
	})

	//隔行换色
	function changeTabelColor(outerName, innerName, everyrow, changeColor) {
		// outerName 需要隔行换色的外层类名
		// innerName 内层类名 比如 ul
		//everyrow 需要换色的行 比如 li  tr
		// changeColor 增加的颜色
		var outerName = $(outerName),
			innerName = outerName.find(innerName);
		innerName.find(everyrow + ':odd').addClass(changeColor);
	}
	changeTabelColor(".rank", "table", "tr", "odd");

	/*底部图片切换*/
	var start = 0;
	$("#necessPic0").jCarouselLite({
		auto: 0,
		visible: 3,
		scroll:3,
		btnNext: ".n-next",
		btnPrev: ".n-prev"
	});
	$(".necess-pic ul li").each(function(index) {
		$(this).hover(function() {
			$(this).parent().css("z-index",20);
			$(".mask").hide();
			$(".mask").eq(index).show();
		}, function() {
			$(".necess-pic ul").css("z-index",1);
			$(".mask").hide();
		})
	});
	var tabs = function(e1, e2, e3) {
		var e1 = $(e1);
		var e2 = $(e2);
		e1.click(function() {
			if (!$(this).hasClass('active')) {
				e1.removeClass('active');
				$(this).addClass('active');
				var idx = e1.index(this);
				e2.fadeOut(0);
				$(e2[idx]).fadeIn(0);

				if ($("#necessaryCon1").css("display") == "block") {
					if(start == 1){return;}
					$("#necessPic1").jCarouselLite({
						auto: false,
						visible: 3,
						scroll:3,
						btnNext: ".n-next",
						btnPrev: ".n-prev"
					});
					$(".necess-pic ul li").each(function(index) {
						$(this).hover(function() {
							$(this).parent().css("z-index",20);
							$(".mask").hide();
							$(".mask").eq(index).show();
						}, function() {
							$(".necess-pic ul").css("z-index",1);
							$(".mask").hide();
						})
					});
					start = 1;
				}
				$(e3).attr('href', $(this).attr('href'));
			}
		});
		e1.click(function() {
			return false;
		})
	}
	tabs(".necessary-nav li", ".necessary-con");
})