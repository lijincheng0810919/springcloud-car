//弹出层效果
function show_popup(popupname, closename, type) {
    var sh = $(window).scrollTop(), dw = $(window).width(),
        dy = $(window).height(), w = $(popupname).width(),
        y = Math.min($(popupname).height(), dy), bh = $('body').height();
    var overlay = $('<div class="shade"></div>');
    if(!$(".shade").length && type != 'album')
    {
      $('body').append(overlay);
    }
    overlay.css({'height':bh - dy > 0 ? bh : dy + 'px','z-index':'100', opacity: .6,'filter':'alpha(opacity=60)'}).fadeIn(100);
    $(popupname).is(':visible') ? $(popupname).hide() : $(popupname).show();
    $(popupname).show().css({
       'left': '50%','top': '50%','marginLeft':'-'+ (w/2)+'px','marginTop':'-'+ (y/2)+'px'
    });
    if ('undefined' == typeof(document.body.style.maxHeight)){
        var timeout = false;
        //$(window).scroll(function () {
            if (timeout) {
                clearTimeout(timeout);
            }
            function t(){
                //do
                var scroll_sh = $(window).scrollTop(), scroll_bh = $('body').height();
                $(popupname).css({ 'position': 'absolute', 'top': (scroll_bh / 2 - y / 2 - scroll_sh) + 'px' });
            };
            timeout = setTimeout(t, 100);
    //    });
    }
    $(popupname).click(function(e){
        e.stopImmediatePropagation();
    });
    $(closename).unbind("click").click(function(e){
        if($("#warmTip10").is(":visible") && ($("#lookFor").is(":visible") || $("#stroeUp").is(":visible"))){
            if($(this).text() == "关闭"){
                return;
            }else{
                $("#warmTip10").hide();
            }
        }else{
            $('.shade').remove();
            $(popupname).hide();
            // $('html').removeClass('sidebar-move');
            // $(document).scrollTop(flos);
            return false;
        }
    });
};