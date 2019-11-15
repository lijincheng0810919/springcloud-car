$(function(){
	//点击复制代码

    $(".kind_copy_btn").on('click',function() {
        var test = new clipBoard($(".kind_copy_btn"), {
            beforeCopy: function() {
                
            },
            copy: function() {
                return  $("#kind_link_url").val();
            },
            afterCopy: function() {
                $("#kind_link_url").select();
            }
        });
    });
   //默认填首页的隐藏域
   $(".page_hidden_val").val(1);
   //隐藏品牌
   $($(".kind_brand_text")[0]).hide();
   $(".kind_brand_input").hide();
   $(".brand_clear").hide();
   //隐藏车系
   $($(".kind_brand_text")[1]).hide();
   $(".kind_item3_cc").hide();
   $(".cc_clear").hide();
     //header中北京的选择
    $("#citySelect").hover(function (e) {
        var $this = $(this).children("dt"),
            $cityList = $this.next();
        if ($cityList.length) {
            $cityList.show();
            $this.addClass('active');
            $('#citySelect a').removeClass('cur');
            $('a[data-ename="' + cityname + '"]').addClass('cur');
        }
    }, function (e) {
        var $this = $(this).children("dt"),
            $cityList = $this.next();
        $cityList.hide();
        $this.removeClass('active');
    });
    //城市选择按字母索引
    var Letter = $(".pro-letter em");
    var LetterCon = $(".cityMore");
    Letter.each(function () {
        $(this).attr("title", $(this).text());
    });
    LetterCon.each(function () {
        $(this).attr("id", $(this).find("span:first b").text());
    });
    Letter.click(function () {
        var index = this.title;
        var id = $('#' + index);
        var speed = 300;
        var height = {
            scrollTop : $(id).offset().top - $("#citySelect").parent().offset().top - 60
        };
        $("#cityWrap").animate(height, speed);
    });
    //点击页面选择框
    $(".kind_page_input").on("click",function(){
        var obj = $(".kind_page_list");
        if(obj.is(":hidden")){
            obj.show();
        }else{
            obj.hide();
        }
        $(this).toggleClass("page_selected");
    });
    //点击具体页面
    $(".kind_page_detail").on("click",function(){
        var page = $(this).text();
        var val = $(this).attr("data-id");
        $(this).parent().siblings(".kind_page_input").text(page);
        $(this).parent().siblings(".page_hidden_val").val(val);
        $(".kind_page_list").hide();
        $(".kind_page_input").toggleClass("page_selected");
        if(val != 1 && val != 5){
            //页面不是首页和卖车页显示品牌
            $($(".kind_brand_text")[0]).show();
            $(".kind_brand_input").show();
        }else{
            //隐藏品牌
            $($(".kind_brand_text")[0]).hide();
            $(".kind_brand_input").hide();
            $(".brand_clear").hide();
            $(".kind_brand_input").val('');
            $(".brand_hidden_val").val('');
            $(".brand_clear").hide();
            //隐藏车系
            $($(".kind_brand_text")[1]).hide();
            $(".kind_item3_cc").hide();
            $(".cc_clear").hide();
            $(".kind_cc_input").val('');
            $(".cc_hidden_val").val('');
            $(".cc_clear").hide();
        }
        getURL($(this));
    });

    $($(".kind_city_area")[0]).show();
    $($(".kind_brand_area")[0]).show();
    $($(".kind_cc_area")[0]).show();
    $(".kind_item3_form1 input").on({
        'click':function(){
                if($(this).siblings("div").is(":hidden")){
                    var  letter_class = "",
                        detail_class = "";
                    if($(this).hasClass("kind_city_input")){
                        letter_class = ".kind_city_letter";
                         detail_class = ".kind_city_area";
                    }else if($(this).hasClass("kind_brand_input")){
                        letter_class =  ".kind_brand_letter"
                        detail_class = ".kind_brand_area";
                    }else if($(this).hasClass("kind_cc_input")){
                            letter_class = ".kind_cc_letter";
                        detail_class = ".kind_cc_area";
                    }
                    if($(detail_class).children().length == 0){
                        $(this).siblings("div").hide();
                    }else{
                        $(this).siblings("div").show();
                    }
                    var topCount =  $(this).siblings("div").find(letter_class).height()+$(this).height()+2;
                    $(this).siblings("div").find(detail_class).css("top",topCount);
                 }else{
                    $(this).siblings("div").hide();
                 }
        }
    });
    $(".kind_item3_form1 input[type!='hidden']").attr("readonly","readonly");
    $(".kind_item3_form1 input[type!='hidden']").css("background","white");
    $(document).on("click",function(e){
        var x = e.pageX,
            y = e.pageY,
            //页面下拉区域
            px1 = $(".kind_page_input").offset().left,
            px2 = px1 + $(".kind_page_input").width(),
            py1 = $(".kind_page_input").offset().top,
            py2 = py1 +$(".kind_page_input").height() +$(".kind_page_list").height(),
            not_page = x < px1 || x > px2 || y < py1 || y > py2,
            //城市下拉列表區域
            divX1 = $(".kind_city_input").offset().left,
            divX2 = divX1 + $(".kind_city_area").width(),
            divY1 = $(".kind_city_input").offset().top,
            divY2 = $(".kind_city_input").offset().top +$(".kind_city_input").height()+ $(".kind_city_letter").height() +$(".kind_city_area").height(),
            not_city = x < divX1 || x > divX2 || y < divY1 || y > divY2,
            //品牌區域
            bX1 = $(".kind_brand_input").offset().left,
            bX2 = bX1 + $(".kind_brand_area").width(),
            bY1 = $(".kind_brand_input").offset().top,
            bY2 = $(".kind_brand_input").offset().top +$(".kind_brand_input").height()+ $(".kind_brand_letter").height() + $(".kind_brand_area").height(),
            not_brand = x < bX1 || x > bX2 || y < bY1 || y > bY2,
            //車系區域
            cX1 = $(".kind_cc_input").offset().left,
            cX2 = cX1 + $(".kind_cc_area").width(),
            cY1 = $(".kind_cc_input").offset().top,
            cY2 = $(".kind_cc_input").offset().top +$(".kind_cc_input").height()+$(".kind_cc_area").height(),
            not_cc = x < cX1 || x > cX2 || y < cY1 || y > cY2;
            if(y > divY1 && y < ($(".kind_city_letter").offset().top)){
                if( x > (divX1+$(".kind_city_input").width()) && x < divX2 ){
                    not_city = true;
                }
            }
            if(y > bY1 && y < ($(".kind_brand_letter").offset().top)){
                if( x > (bX1+$(".kind_brand_input").width()) && x < bX2 ){
                    not_brand = true;
                }
            }
            if(y > cY1 && y < ($(".kind_cc_letter").offset().top)){
                if( x > (cX1+$(".kind_cc_input").width()) && x < cX2 ){
                    not_cc = true;
                }
            }

            if(not_city){
                $(".kind_city_panel").hide();
            }
            if(not_brand){
                $(".kind_brand_panel").hide();
            }
            if(not_cc){
                $(".kind_cc_panel").hide();
            }
            if(not_page){
                $(".kind_page_list").hide();
                $(".kind_page_input").toggleClass("page_selected");
            }
    });
    $(".kind_letter_text").parent().siblings().on("click","li",function(){
         var text = $(this).text(),
             id =  $(this).attr("data-id");
         $(this).parent().parent().siblings("input").val(text);
         $(this).parent().parent().siblings("input[type='hidden']").val(id);
         if($(this).attr("data-ename")){
             $(this).parent().parent().siblings(".city_ename_val").val($(this).attr("data-ename"));
         }
         $(this).parent().parent().hide();
         if($(this).hasClass("kind_cc_detail")){
            $(".cc_clear").show();
         }
         //品牌车系联动 - 根据品牌填车系
         if($(this).hasClass("kind_brand_detail")){
            $(".brand_clear").show();
            $(".kind_cc_input").val('');
            $(".cc_hidden_val").val('');
            $(".kind_cc_area").empty();
             var data = window.kind_data;
             var cc = data[id]; 
             if(cc){
                $.each(cc,function(i,item){
                    var li = "<li class='kind_cc_detail' data-id='"+item.scid+"'>"+item.scname+"</li>" ;
                    $(".kind_cc_area").append(li);
                });
                $($(".kind_brand_text")[1]).show();
                $(".kind_item3_cc").show();
             }else{
                $($(".kind_brand_text")[1]).hide();
                $(".kind_item3_cc").hide();
                $(".cc_clear").hide();
             }            
         }
         getURL($(this));
    });
    //清除车系
    $(".cc_clear").on("click",function(){
        //清除车系隐藏值
        $(".kind_cc_input").val('');
        $(".cc_hidden_val").val('');
        $(".cc_clear").hide();
        getURL();
    });
    //清除品牌
    $(".brand_clear").on("click",function(){
        //清除品牌隐藏值
        $(".kind_brand_input").val('');
        $(".brand_hidden_val").val('');
        $(".brand_clear").hide();
        //隐藏车系
        $($(".kind_brand_text")[1]).hide();
        $(".kind_item3_cc").hide();
        $(".cc_clear").hide();
        //清除车系隐藏值
        $(".kind_cc_input").val('');
        $(".cc_hidden_val").val('');
        $(".kind_cc_area").empty();
        getURL();
    });

});