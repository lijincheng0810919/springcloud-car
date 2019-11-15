$(function(){
    // 标记页头选中状态
    var hclass = '';
    if(location.pathname.match(/^\/s(\/\S*)?$/)) {
        hclass = '.a_buypage';
    } else if(location.pathname.match(/^\/sale\/c2b_car(\/\S*)?$/) || location.pathname.match(/^\/sale\/index(\/\S*)?$/) || location.pathname.match(/^\/c2b_car\/(.*?)$/)) {
        hclass = '.a_sellpage';
    } else if(location.pathname.match(/^\/h(\/\S*)?$/)) {
         hclass = '#php_half_city_link';
    } else if(location.pathname.match(/^\/(activity|article|qa)(\/\S*)?$/)) {
         hclass = '.a_question';
    } else if(location.pathname.match(/^\/service(\/\S*)?$/)) {
         hclass = '.a_service';
    } else if(location.pathname.match(/^\/app(\/\S*)?$/)) {
         hclass = '#id_dl_app';
    }
    if(hclass) {
        $(hclass).removeClass('active');
        $(hclass).addClass('active');
    }

    // 页头选择城市模块，展示所有城市、热门城市、周边城市
    function _init_city() {
        if(window.jsvar.init_city_type === true){
            return false;
        }
        window.jsvar.init_city_type = true;
        // 请求接口，获取城市数据
        var cityid = TOP_INFO.location ? TOP_INFO.location.cityid : "";
        $.ajax({
            url: "/apis/Ajax_common/get_home_city/",
            data:{
                    cityid : cityid
                },
            type: 'get',
        }).then(function(res){
            if(res.error_code == 200){
                var _target = document.querySelector('#current_city_id'),
                    city_all = res.data.city_all,
                    hot_city = res.data.hot_city,
                    near_city = res.data.near_city,
                    beforeHref = /che\d{8}\.html/.test(window.location.href) ? window.location.origin : "";
                    city_switch = TOP_INFO.city_switch ? TOP_INFO.city_switch : "",
                    query_string = TOP_INFO.query_string ? TOP_INFO.query_string : "";
                    afterHref = /che\d{8}\.html/.test(window.location.href) ? `/${query_string}` : `/${city_switch}${query_string}`;

                var city = new UXCity({ 
                    target:_target,
                    cities:city_all,
                    hot:hot_city,
                    around:near_city,
                    beforeHref:beforeHref,
                    afterHref:afterHref,
                    extendAttrs:'data-id=$cityid$ data-ename=$ename$ title=$cityname$二手车 rel=nofollow',
                    currentCity:TOP_INFO.location.cityname,
                    afterShow:function(){ 
                        $('.ci_m .ci_m_i2 a:visible').get(0).click();
                    },
                    afterHide:function(){ 
                        $(_target).removeClass('active');
                    },
                    afterInit:function() {
                        var st = 0,et = 0;
                        $(_target).on('mouseenter',function(e){
                            var _this = this;
                            st = (new Date()).getTime();
                            setTimeout(function(){ 
                                if(Math.abs(et - st) < 100) return; 
                                $(_this).addClass('active');
                                city.show(); //鼠标滑入时，显示城市选择面板 
                            },100);
                        }).on('mouseleave',function(){
                            et = (new Date()).getTime(); 
                        });
                        
                        $('.ci_m .ci_m_zb a').attr({ 'data-statistics':'{ "title":"C-城市选择-周边"}','class':'xinStatistics'}).click(function(){
                            var $this = $(this),data;
                                if(data = $this.attr('data-statistics')){
                                    try{
                                        data = $.parseJSON(data);
                                    }catch(e){
                                        console.warn('JSON格式的字符串解析错误',e);
                                        return;
                                    }
                                    var event = data.title || '';
                                    var properties = data.data || '';
                                }
                        });
                        $('.ci_m .ci_m_rm a').each(function(d,e){
                            $(this).attr({ 'data-statistics':'{ "title":"C-城市选择-热门","data":{ "位置":"' + d + '"}}','class':'xinStatistics'}).click(function(){
                                var $this = $(this),data;
                                if(data = $this.attr('data-statistics')){
                                    try{
                                        data = $.parseJSON(data);
                                    }catch(e){
                                        console.warn('JSON格式的字符串解析错误',e);
                                        return;
                                    }
                                    var event = data.title || '';
                                    var properties = data.data || '';
                                }
                            });
                        });
                        
                    },
                    afterSearch:function() {
                        $('.ci_m .ci_m_pop a').attr({ 'data-statistics':'{ "title":"C-城市选择-搜索"}','class':'xinStatistics'}).click(function(){
                            var $this = $(this),data;
                            if(data = $this.attr('data-statistics')){
                                try{
                                    data = $.parseJSON(data);
                                }catch(e){
                                    console.warn('JSON格式的字符串解析错误',e);
                                    return;
                                }
                                var event = data.title || '';
                                var properties = data.data || '';
                            }
                        });  
                    }
                 });
            }

        });
    };
    window.jsvar.init_city = function(){
        _init_city();
    }
});