
$(function () {
    //创建公钥
    var pubkey = window.jsvar.rsaPublicKey;
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(pubkey);
    
    //footer底部图标懒加载
    var footerFn = require('newcar-www:static/js/common/footer.es6');
    footerFn.footerIcoLazyload();

    window.onload = function(){
        setTimeout(function(){
            if(window.jsvar.init_city){
                window.jsvar.init_city();
            }
        },200);
    }    
    // 搜索框默认字符串
    var defaultSearchStr = ['搜索您想要的车','请输入感兴趣的品牌、车系'];
    //channel合作渠道链接处理
    var channel = UrlTool.getUrlParam('channel');
    //squid-cookie
    var cityname = $.cookie('XIN_LOCATION_CITY') ? $.parseJSON($.cookie('XIN_LOCATION_CITY'))['ename'] : '';
    if (!cityname) {
        cityname = $('._ckcity').length > 0 ? $('._ckcity').data('cityname') : cityname;
    }
    // page has city property
    if ($('._ckcity').length && $('._ckcity').data('type')) {
        cityname = $('._ckcity').data('cityname');
    }
    //通用header-top初始化
    $.post("/ajax/top_load/", {ename: cityname}, function (data) {
        //jira-12921 初始化环信插件
        try{
            cfEasemob.init(data,easemobCallback);
        }catch(e){
            //console.log("没有找到环信初始化方法")
        }
        var old_cityname = TOP_INFO.location.cityname;
        TOP_INFO.user = !data || data.user === 'undefined' || JSON.stringify(data.user) == '[]' ? {} : data.user;
        TOP_INFO.half_city = !data || data.half_city === 'undefined' ? [] : data.half_city;
        //如果请求时添加no_location=true则不对NAV修改（eg 长尾页不需要对城市定位修改nav）
        var noLocation = $('#mainPageScript').data('no-location');
        if (noLocation == 'yes') {
            TOP_INFO.location = TOP_INFO.location;
        } else {
            TOP_INFO.location = data.location ? data.location : TOP_INFO.location;
        }
        if(TOP_INFO.user.mobile && $.cookie('favorite_arr')){
            if(!$.cookie('RELEASE_KEY')){
                $.get("/apis_ajax/sync_data", { carids : $.cookie('favorite_arr') }, function(data){
                    $.cookie('RELEASE_KEY',true);
                })   
            }
            
        }else{
            $.cookie('RELEASE_KEY','');  
        }

        if( TOP_INFO.location.is_rent == 1 ){
            if($(".newcar").length > 0) {
                $('.newcar').attr('href', UrlTool.fixHref($('.newcar').data('url') + TOP_INFO.location.ename + '/'));
            }
            $(".newcar").css("display", "inline-block");
        }else{
            $(".newcar").hide();
        }
        
        $(".a_buypage").attr('href', UrlTool.fixHref($('#php_half_city_link').attr('sname') + "/" + TOP_INFO.location.ename + "/s/"));
        $("#cityWrap ul li a").each(function (i, item) {
            $(this).removeClass('cur');
            if ($(this).text() == TOP_INFO.location.cityname) {
                $(this).addClass('cur');
            }
        });
        init_page_nav(old_cityname);
        typeof (init_pc_page) == 'function' && init_pc_page(TOP_INFO.location.ename);
        if (!$.isEmptyObject(TOP_INFO.user)) {
            //提示成功注册时，执行以下语句
            _hmt.push(['_trackEvent', 'Login', ' Login_auto']);
            var html = '<div class="person-wrap" >' +
                '<p class="phone-info"><b class="ico person-ico"></b>' +
                '<a href="' + UrlTool.fixHref('/i/') + '">' + TOP_INFO.user.mobile + '</a></p>' +
                /*'<a href="' + UrlTool.fixHref('/login/out/') + '" class="exit">退出</a>' +*/
                '<a href="javascript:void(0);" class="exit">退出</a>' +
                '</div>';
            $("#xin_top_userinfo").html(html);
            $(".person-wrap").hover(
                function () {
                    $(this).addClass("person-info");
                },
                function () {
                    $(this).removeClass("person-info");
                }
            );

        } else {
            var html = '<div class="person-wrap" style="top:0px;">' +
                '<a href="javascript:clear_invalid();show_popup(\'#popupLogin\',\'#popupLogin .closeJs\');" id="loginA"  class="login" rel="nofollow">登录</a>/' +
                '<a href="javascript:clear_invalid();show_popup(\'#popupRegister\',\'#popupRegister .closeJs\');" id="regA"  rel="nofollow" class="register">注册</a>' +
                '</div>';
            $("#xin_top_userinfo").html(html);
            $('#loginA,#question_button,#chat_online,#store').bind('click', function (e) {
                if ($(this).attr('id') == 'loginA') { //点击登录，默认切到密码登录
                    $('.logintab a').get(0).click();
                    //setCodeInput();
                }
                $('#popupLogin .PageNum').eq(0).html('<img src="/register/get_vcode/?r=' + (new Date()).getTime()+'" id="vcodeimg_l"/>');
                $('#vcodeimg_l').bind('click', function () {
                    if ($('#vcodeimg_l').next().hasClass('error') || $('#vcodeimg_l').next().hasClass('sure')) {
                        $('#vcodeimg_l').next().remove();
                    }
                    flush_vcode('#vcodeimg_l');
                });
            });
            $('#regA').click(function(){
        		$('#popupLogin .PageNum, #popupRegister .PageNum').html('');
        		$('#popupRegister .PageNum').html('<img src="/register/get_vcode/?r=' + (new Date()).getTime()+'" id="vcodeimg_r"/>');
                $('#vcodeimg_r').bind('click', function () {
                    if ($('#vcodeimg_r').next().hasClass('error') || $('#vcodeimg_r').next().hasClass('sure')) {
                        $('#vcodeimg_r').next().remove();
                    }
                    flush_vcode('#vcodeimg_r');
                });
            });
        }
        //头部信息加载后执行的逻辑
        if (typeof _top_info_end == "function") {
            _top_info_end();
        }

        if (typeof _top_info_star == 'function') {
            _top_info_star();
        }
        if (typeof _top_info_article == 'function') {
            _top_info_article();
        }

        if (typeof _init_buy_car == 'function') {
            _init_buy_car();
        }

        if (typeof _init_city == 'function') {
            _init_city();
        }
    }, "json");

    /**
     * 验证码60秒倒计时功能
     * @param {[type]} o [description]
     */
    function get_code_time(o) {
        if(this.o && this.o.running) return;
        this.wait = 120;
        this.o = o;
        this.timer = null;
        this.exec = function () {
            this.o.running = true;
            if (!$(this.o).is(":visible")) {
                this.wait = 0;
            }
            if (this.wait == 0) {
                this.o.removeAttribute("disabled");
                this.o.value = "获取验证码";
                this.wait = 120;
                this.o.running = false;
                clearTimeout(this.timer);
            } else {
                this.o.setAttribute("disabled", true);
                this.o.value = this.wait + 's后重新发送';
                this.wait--;
                this.timer = setTimeout(function () {
                    this.exec();
                }, 1000);
            }
        };
        this.exec();
    }

    // 获取验证码处理函数
    $("#need_code,#need_code1,#need_code3,#need_code4,#need_code5,#need_code_studio").click(function (e) {
        var o = this;
        var piccode = '';
        var id = $(o).parent().prev().children(":input").attr("id");
        var typeVal = get_type(id);
        if ($(this).attr('id') == 'need_code') {
            var mobile = $('#regi_mobile').val();
            var typeVal = 'reg';
            piccode = $('#piccode').val();
        } else if ($(this).attr('id') == 'need_code1') {
            var mobile = $('#search1').val();
            var typeVal = 'login';
            piccode = $('#piccode_l').val();
        } else if ($(this).attr('id') == 'need_code3') {
            var mobile = $('#search3').val();
            var typeVal = 'get';
            piccode = $('#piccode_g').val();
        } else if ($(this).attr('id') == 'need_code_studio') {
            var mobile = $('#studio_mobile').val();
            var typeVal = 'order';
            piccode = $('#piccode_o').val();
        } else if ($(this).attr('id') == 'need_code5') {
            var mobile = $('#register_mobile').val();
            var typeVal = 'reg';
            piccode = $('#piccode_register').val();
        } else {
            var mobile = $("#" + id).val();
        }
        if (mobile == '请输入手机号') {
            if ($(this).attr('id') == 'need_code') {
                add_hint($('#regi_mobile'), '<b class="error">请输入手机号</b>', 'error');
            } else if ($(this).attr('id') == 'need_code1') {
                add_hint($('#search1'), '<b class="error">请输入手机号</b>', 'error');
            } else if ($(this).attr('id') == 'need_code3') {
                add_hint($('#search3'), '<b class="error">请输入手机号</b>', 'error');
            } else if ($(this).attr('id') == 'need_code_studio') {
                add_hint($('#studio_mobile'), '<b class="error">请输入手机号</b>', 'error');
            } else if ($(this).attr('id') == 'need_code5') {
                add_hint($('#register_mobile'), '<b class="error">请输入手机号</b>', 'error');
            } else {
                add_hint($('#' + id), '<b class="error">请输入手机号</b>', 'error');
            }
            return false;
        }

        if (is_valid_mobile(mobile) != 1) {
            if ($(this).attr('id') == 'need_code') {
                add_hint($('#regi_mobile'), '<b class="error">手机号码格式不正确</b>', 'error');
            } else if ($(this).attr('id') == 'need_code1') {
                add_hint($('#search1'), '<b class="error">手机号码格式不正确</b>', 'error');
            } else if ($(this).attr('id') == 'need_code3') {
                add_hint($('#search3'), '<b class="error">手机号码格式不正确</b>', 'error');
            } else if ($(this).attr('id') == 'need_code_studio') {
                add_hint($('#studio_mobile'), '<b class="error">手机号码格式不正确</b>', 'error');
            } else if ($(this).attr('id') == 'need_code5') {
                add_hint($('#register_mobile'), '<b class="error">手机号码格式不正确</b>', 'error');
            } else {
                add_hint($('#' + id), '<b class="error">手机号码格式不正确</b>', 'error');
            }
            return false;
        }
        if ($(this).attr('id') == 'need_code') {
            var piccode = $('#piccode').val();
            if (piccode == '请输入图片码') {
                add_hint($('#piccode').next(), '<b class="error">请输入图片码</b>', 'error');
                return false;
            }
        } else if ($(this).attr('id') == 'need_code1') {
            var piccode = $('#piccode_l').val();
            if ($('#piccode_l:visible').length>0 && piccode == '请输入图片码') {
                add_hint($('#piccode_l').next(), '<b class="error">请输入图片码</b>', 'error');
                return false;
            }
        } else if ($(this).attr('id') == 'need_code3') {
            var piccode = $('#piccode_g').val();
            if (piccode == '请输入图片码') {
                add_hint($('#piccode_g').next(), '<b class="error">请输入图片码</b>', 'error');
                return false;
            }
        } else if ($(this).attr('id') == 'need_code_studio') {
            var piccode = $('#piccode_o').val();
            if (piccode == '请输入图片码') {
                add_hint($('#piccode_o').next(), '<b class="error pos-error">请输入图片码</b>', 'error');
                return false;
            }
        } else if ($(this).attr('id') == 'need_code5') {
            var piccode = $('#piccode_register').val();
            if (piccode == '请输入图片码') {
                add_hint($('#piccode_register').next(), '<b class="error pos-error">请输入图片码</b>', 'error');
                return false;
            }
        }
        if ($('#need_code1').next().hasClass('error') || $('#need_code3').next().hasClass('error')) {
            return false;
        }

        if(piccode === "请输入图片码"){
            piccode = "";
        }

        //登录防刷 回调成功请求短信验证码接口
        $.ajax({
            type: "post",
            url: "/register/get_login_html/",
            data: {},
            success: function (d) {
                $.post('/register/send/', {'mobile': mobile, 'login': typeVal, 'piccode': piccode, 'type': 'ajax'}, function (data) {
                    if (data == 1) {
                        get_code_time(o);
                        setGetCodeCookie();
                    } else {
                        switch($(o).attr('id')){
                            case 'need_code':
                                add_hint($('#piccode').next(), '<b class="error">手机号已存在或图片码验证码错误</b>', 'error');
                                break;
                            case 'need_code1':
                                if (data == -2) {
                                    add_hint($('#search2').next(), '<b class="error">请输入短信验证码</b>', 'error');
                                    break;
                                }else if(data == -12){
                                    add_hint($('#search2').next(), '<b class="error">请输入短信验证码，或120S后再试</b>', 'error');
                                    break;
                                }else if(data == -11){
                                    $(".code-input").show();
                                    add_hint($('#search2').next(), '<b class="error">请输入图片验证码</b>', 'error');
                                    break;
                                }
                                $(".code-input").show();
                                add_hint($('#piccode_l').next(), '<b class="error">图片验证码错误</b>', 'error');
                                break;
                            case 'need_code3':
                                if($(o).next().length){$(o).next().remove()}
                                if(data == -1){
                                    add_hint($('#piccode_g').next(), '<b class="error">图片验证码错误</b>', 'error');
                                }else if(data == -2){
                                    add_hint($('#search4').next(), '<b class="error">请输入短信验证码</b>', 'error');
                                }else if(data == -12){
                                    add_hint($('#search4').next(), '<b class="error">请输入短信验证码，或120S后再试</b>', 'error');
                                }else{
                                    add_hint($('#search3'), '<b class="error">手机号码不存在</b>', 'error');
                                }
                                break;
                            case 'need_code_studio':
                                add_hint($('#piccode_o').next(), '<b class="error pos-error">图片验证码错误</b>', 'error');
                                break;
                            case 'need_code5':
                                if (data == -2) {
                                    add_hint($('#register_smscode').next(), '<b class="error">请输入短信验证码</b>', 'error');
                                    break;
                                }
                                if (data == -3) {
                                    add_hint($('#register_mobile'), '<b class="error">手机号已注册</b>', 'error');
                                    break;
                                }
                                add_hint($('#piccode_register').next(), '<b class="error pos-error">图片验证码错误</b>', 'error');
                                break;
                        }
                    }
                });
            }
        });
    });

    /**
     * 点击注册
     */
    $("#register_now").click(function () {
        _hmt.push(['_trackEvent', 'Register', 'Register_submit']);
        var mobile = $('#regi_mobile').val();
        var password = $('#psw2').val();
        var setPassword = encrypt.encrypt(JSON.stringify({"encrypt": "yes","password":password}));
        var cpassword = $('#psw4').val();
        var validatecode = $('#validatecode').val();
        var piccode = $('#piccode').val();
        var typeVal = 'reg';
        if (mobile == '请输入手机号') {
            add_hint($('#regi_mobile'), '<b class="error">手机号错误</b>', 'error');
            return false;
        }
        if (piccode == '请输入图片码') {
            add_hint($('#piccode').next(), '<b class="error">请输入图片码</b>', 'error');
            return false;
        }
        if (validatecode == '六位数字验证码') {
            add_hint($('#validatecode').next(), '<b class="error">请输入验证码</b>', 'error');
            return false;
        }
        if ($('#psw1').css("display") == "inline-block") {
            add_hint($('#psw1'), '<b class="error">请输入密码</b>', 'error');
            return false;
        }
        if ($('#psw3').css("display") == "inline-block") {
            add_hint($('#psw3'), '<b class="error">密码不一致</b>', 'error');
            return false;
        }
        if ($('#redeemPrizes .error').length > 0) {
            return false;
        }

        $.post('/register/register_user/', {'mobile': mobile, 'password': setPassword, 'validatecode': validatecode, 'login': typeVal, type: 'ajax', piccode:piccode}, function (data) {
            if (data == -1) {
                add_hint($('#validatecode').next(), '<b class="error">验证码错误</b>', 'error');
            } else if (data == -6) {
                add_hint($('#regi_mobile'), '<b class="error">手机号错误</b>', 'error');
            } else if (data == -2) {
                add_hint($('#validatecode').next(), '<b class="error">验证码已过期</b>', 'error');
            } else {
                _hmt.push(['_trackEvent', 'Register', 'Register_done']);
                install_register(mobile, password);

                //二期打点
                uxl_track('w_reg/register_agree/mobile/' + mobile);

                if (TOP_INFO.location.ename) {
                    window.location.href = UrlTool.fixHref('/' + TOP_INFO.location.ename + '/');
                } else {
                    window.location.href = UrlTool.fixHref('/quanguo/');
                }
            }
        });
    });

    /**
     * 新点击注册
     */
    $("#register_btn").click(function () {
        _hmt.push(['_trackEvent', 'Register', 'Register_submit']);
        var mobile = $.trim($('#register_mobile').val());
        var piccode = $.trim($('#piccode_register').val());
        var password = $.trim($('#register_psw').val());
        var setPassword = encrypt.encrypt(JSON.stringify({"encrypt": "yes","password":password}));
        var validatecode = $.trim($('#register_smscode').val());
        var typeVal = 'reg';
        if (mobile.length == 0 || mobile == '请输入手机号') {
            add_hint($('#register_mobile'), '<b class="error">请输入手机号</b>', 'error');
            return false;
        } else if (is_valid_mobile(mobile) != 1) {
            add_hint($('#register_mobile'), '<b class="error">手机号错误</b>', 'error');
            return false;
        }
        if (piccode.length == 0 || piccode == '请输入图片码') {
            add_hint($('#piccode_register').next(), '<b class="error pos-error">请输入图片码</b>', 'error');
            return false;
        }
        if (validatecode.length == 0 || validatecode == '六位数字验证码') {
            add_hint($('#register_smscode').next(), '<b class="error">请输入验证码</b>', 'error');
            return false;
        }
        if (password == '') {
            add_hint($('#register_psw'), '<b class="error">请输入密码</b>', 'error');
            return false;
        }
        //能匹配的组合为：数字+字母，数字+符号，字母+符号，数字+字母+符号组合，而且不能是纯数字，纯字母，纯符号
        var reg = /^(?![\d]+$)(?![a-zA-Z_]+$)(?![^\w]+$)[\S]{6,20}$/;
        if(!reg.test($('#register_psw').val())){
            add_hint($('#register_psw'), '<b class="error">密码应为6-20位，数字、字母、符号的组合</b>', 'error');
            return false;
        }
        if ($('#popupRegister .error').length > 0) {
            return false;
        }

        $.post('/register/register_user/', {'mobile': mobile, 'password': setPassword, 'validatecode': validatecode, 'login': typeVal, type: 'ajax', piccode: piccode}, function (data) {
            if (data == -1) {
                add_hint($('#register_smscode').next(), '<b class="error">验证码错误</b>', 'error');
                flush_vcode('#vcodeimg_r');
            } else if (data == -6) {
                add_hint($('#register_mobile'), '<b class="error">手机号错误</b>', 'error');
            } else if (data == -9) {
                add_hint($('#piccode_register').next(), '<b class="error">图片验证码错误</b>', 'error');
                flush_vcode('#vcodeimg_r');
            } else if (data == -2) {
                add_hint($('#register_smscode').next(), '<b class="error">验证码已过期</b>', 'error');
                flush_vcode('#vcodeimg_r');
            } else if (data == -3) {
                add_hint($('#register_mobile'), '<b class="error">手机号已注册</b>', 'error');
                $('#piccode_register, #register_smscode, #register_psw').val('');
                flush_vcode('#vcodeimg_r');
            } else if (data == -10) {
                add_hint($('#register_psw').next(), '<b class="error">密码不规范</b>', 'error');
                flush_vcode('#vcodeimg_r');
            } else {
                _hmt.push(['_trackEvent', 'Register', 'Register_done']);
                install_register(mobile, password);

                //二期打点
                uxl_track('w_reg/register_agree/mobile/' + mobile);
                if (TOP_INFO.location.ename) {
                    window.location.reload();
                    return false;
                } else {
                    window.location.href = UrlTool.fixHref('/quanguo/');
                }
            }
        });
    });

    //下一步，
    $("#next_step").click(function () {
        var mobile = $('#search3').val();
        var code = $('#search4').val();
        var piccode = $('#piccode_g').val();
        if ((typeof mobile == 'undefined') || (mobile.toString().length < 1) || (mobile == '请输入手机号')) {
            add_hint($('#search3'), '<b class="error">请输入手机号</b>', 'error');
            return false;
        }
        if (piccode == '请输入图片码') {
            add_hint($('#piccode_g').next(), '<b class="error">请输入图片码</b>', 'error');
            return false;
        }
        if ((typeof code == 'undefined') || (code.toString().length < 1) || (code == '六位数字验证码')) {
            add_hint($('#search4').next(), '<b class="error">请输入验证码</b>', 'error');
            return false;
        }
        if ($('#search3').next().hasClass('error') || $('#search4').next().hasClass('error')) {
            return false;
        }
        var typeVal = 'get';
        $.post('/register/check_vcode/', {'mobile': mobile, 'validatecode': code, 'login': typeVal, 'type': 'ajax', 'forget': 1, 'piccode':piccode}, function (data) {
            switch(data){
                case "1":
                    $(".shade").remove();
                    $("#forPass").hide();
                    show_popup("#forgetNext", "#forgetNext .closeJs");
                    break;
                case "-1":
                    add_hint($('#search4').next(), '<b class="error">验证码错误</b>', 'error');
                    break;
                case "-2":
                    add_hint($('#search4').next(), '<b class="error">验证码已过期</b>', 'error');
                    break;
                case "-5":
                    add_hint($('#search3'), '<b class="error">验证码已过期</b>', 'error');
                    break;
                case "-9":
                    add_hint($('#piccode_g').next(), '<b class="error">图片验证码错误</b>', 'error');
                    break;
            }
        });
    });

    //重置密码
    $("#reset_passwd").click(function () {
        var passwd = $('#psw8').val();
        var setPasswd = encrypt.encrypt(JSON.stringify({"encrypt": "yes","password":passwd}));
        var cpasswd = $('#psw10').val();
        if ($('#psw7').css("display") == "inline-block") {
            add_hint($('#psw7'), '<b class="error">请输入密码</b>', 'error');
            return false;
        }
        if ($('#psw9').css("display") == "inline-block") {
            add_hint($('#psw9'), '<b class="error">请输入密码</b>', 'error');
            return false;
        }
        var b1 = is_valid_pass(passwd);
        if (b1 != 1) {
            add_hint($('#psw9'), '<b class="error">请输入密码</b>', 'error');
            return false;
        }
        var b2 = is_valid_pass(cpasswd);
        if (b2 != 1) {
            add_hint($('#psw10'), '<b class="error">密码格式不正确</b>', 'error');
            return false;
        }
        if (passwd != cpasswd) {
            add_hint($('#psw10'), '<b class="error">两次输入的密码不一致</b>', 'error');
            return false;
        }
        $.post('/getpasswd/reset_passwd/', {'passwd': setPasswd, type: 'ajax'}, function (data) {
            if (data == 1) {
                window.location.reload();
            } else {
                add_hint($('#psw10'), '<b class="error">两次输入的密码不一致</b>', 'error');
            }
        });
    });

    //重置密码
    $("#change_pass").click(function () {
        var oldpwd = $('#psw12').val();
        var passwd = $('#psw14').val();
        var cpasswd = $('#psw16').val();
        var setPasswd = encrypt.encrypt(JSON.stringify({"encrypt": "yes","password":passwd}));
        var setOldpwd = encrypt.encrypt(JSON.stringify({"encrypt": "yes","password":oldpwd}));
        if ($('#psw11').css("display") == "inline-block") {
            add_hint($('#psw11'), '<b class="error">请输入原密码</b>', 'error');
            return false;
        }
        if ($('#psw13').css("display") == "inline-block") {
            add_hint($('#psw13'), '<b class="error">请输入密码</b>', 'error');
            return false;
        }
        if ($('#psw15').css("display") == "inline-block") {
            add_hint($('#psw15'), '<b class="error">请输入密码</b>', 'error');
            return false;
        }
        if (passwd != cpasswd) {
            add_hint($('#psw16'), '<b class="error">两次输入的密码不一致</b>', 'error');
            return false;
        }
        if( passwd == oldpwd ){
            add_hint($('#psw16'), '<b class="error">原密码与新密码不能相同</b>', 'error');
            return false;
        }
        //能匹配的组合为：数字+字母，数字+符号，字母+符号，数字+字母+符号组合，而且不能是纯数字，纯字母，纯符号
        var reg = /^(?![\d]+$)(?![a-zA-Z_]+$)(?![^\w]+$)[\S]{6,20}$/;
        if(!reg.test(passwd)){
            add_hint($('#psw16'), '<b class="error">密码应为6-20位，数字、字母、符号的组合</b>', 'error');
            return false;
        }
        if (is_valid_pass(passwd) != 1) {
            return false;
        }

        if ($('#psw12').next().hasClass('error')) {
            return false;
        }

        $.post('/i/resetpasswd/reset_passwd/', {'passwd': setPasswd, 'oldpwd': setOldpwd, type: 'ajax'}, function (data) {
            if(data==6) {
                add_hint($('#psw16'), '<b class="error">密码应为6-20位，数字、字母、符号的组合</b>', 'error');
                return false;
            }
            var msg = data == 1 ? '主人，密码修改成功啦' : '原密码错误或新密码输入不一致';
            var url = data == 1 ? "window.location.href=UrlTool.fixHref('/i/favorite/')" : 'window.location.reload()';
            $("#warmTip10 .span_xin_msg").text(msg);
            show_popup("#warmTip10", "#warmTip10 .closeJs");
            setTimeout(url, 3000);
        });
    });
    //登录
    $("#login_btn").click(function () {
        if ($(".logintab a").first().hasClass("active")) {
            // 手机号验证码登录
            var mobile = $("#search1").val();
            var password = $("#search2").val();
            var setPassword = password;
            var valid = is_valid_mobile(mobile);
            var piccode = $('#piccode_l').val();
            if (valid != 1) {
                add_hint($('#search1'), '<b class="error">' + valid + '</b>', 'error');
                return false;
            }
            if ($('#piccode_l:visible').length<0) {
                piccode = "";
            }
            if ($('#piccode_l:visible').length>0 && piccode == '请输入图片码') {
                add_hint($('#piccode_l').next(), '<b class="error">请输入图片码</b>', 'error');
                return false;
            }
            if (isNaN(password) && (password.toString().length != 6)) {
                add_hint($('#search2').next(), '<b class="error">验证码错误</b>', 'error');
                return false;
            }
            if (($("#search2").next().next().hasClass('error') == true) || ($('#search1').next().hasClass('error') == true)) {
                return false;
            }
            var login_type = 'c';
        } else {
            //手机号密码登录
            var mobile = $("#search").val();
            var piccode = $('#piccode_r').val();
            var password = $("#psw6").val();
            var setPassword = encrypt.encrypt(JSON.stringify({"encrypt": "yes","password":password}));
            var valid = is_valid_mobile(mobile);
            if (valid != 1) {
                add_hint($('#search'), '<b class="error">' + valid + '</b>', 'error');
                return false;
            }
            if (piccode == '请输入图片码') {
                add_hint($('#piccode_r').next(), '<b class="error">请输入图片码</b>', 'error');
                return false;
            }
            var vapass = is_valid_pass(password);
            if (vapass != 1) {
                add_hint($('#psw6'), '<b class="error">' + vapass + '</b>', 'error');
                return false;
            }
            var login_type = 'p';
        }

        if(piccode === "请输入图片码"){
            piccode = "";
        }

        $.post('/login/check/', {
            'mobile': mobile,
            'password': setPassword,
            'login': login_type,
            'piccode': piccode,
            'type': 'ajax'
        }, function (data) {
            if (data < 0) {
                flush_vcode('#vcodeimg_r');
                flush_vcode('#vcodeimg_l');
            }
            if (data == -1) {
                add_hint($('#search2').next(), '<b class="error">验证码错误</b>', 'error');
            } else if (data == -2) {
                add_hint($('#search2').next(), '<b class="error">验证码已过期</b>', 'error');
            } else if (data == -5) {
                add_hint($('#search1'), '<b class="error">手机号错误</b>', 'error');
            } else if (data == -4) {
                add_hint($('#search1'), '<b class="error">手机号不存在</b>', 'error');
            } else if (data == -3) {
                add_hint($('#psw6'), '<b class="error">密码错误</b>', 'error');
            } else if (data == -6) {
                add_hint($('#piccode_l').next(), '<b class="error">图片码验证错误</b>', 'error');
            } else {
                //二期 登录打点
                uxl_track('w_login/login_click/mobile/' + mobile);

                if ((typeof TOP_GET !== 'undefined') && (TOP_GET.backurl)) {
                    var url = TOP_GET.backurl;
                } else {
                    var url = window.location.href;
                }
                if (url.indexOf('/register/') !== -1) {
                    window.location.href = UrlTool.fixHref('/');
                } else {
                    // 处理在线聊天登录跳转逻辑
                    if ($('#chat_online').length && parseInt($('#chat_online').attr('rc-login')) == 1) {
                        location.href = UrlTool.fixHref(location.href.indexOf('rc_login=1') !== -1 ? location.href : (location.href + (location.href.indexOf('?') === -1 ? '?' : '&') + 'rc_login=1'));
                    } else {
                        if (location.href.indexOf('rc_login=1') !== -1) {
                            location.href = UrlTool.fixHref(location.href.replace(/(&rc_login=1)+/gm, '').replace(/(rc_login=1(&)?)+/gm, ''));
                        } else {
                            window.location.reload();
                        }
                    }
                }
                //window.location.reload();
            }
        });
    });

    //二期打点 登录页面 切换登录方式（密码，短信验证码）
    $('.logintab a').on('click', function () {
        var index = $(this).index();
        if (index == 0) {
            //setCodeInput();
            uxl_track('w_login/password');
        } else {
            //$(".code-input").show();
            uxl_track('w_login/message');
        }
    });
    /*
     * 验证码onblur事件
     */
    $("#validatecode,#search4,#valicode1").bind("blur", function () {
        var self = this;
        var code = $(this).val();
        var id = $(this).parent().prev().children(":input").attr('id');
        var typeVal = get_type(id);
        var piccode = '';
        var click_code = '';
        if ($(this).attr('id') == 'validatecode') {
            var mobile = $('#regi_mobile').val();
            piccode = $('#piccode_register');
            click_code = $('#vcodeimg_r');
            typeVal = 'reg';
        } else if ($(this).attr('id') == 'search2') {
            var mobile = $('#search1').val();
            piccode = $('#piccode_r');
            click_code = $('#vcodeimg_r');
            typeVal = 'login';
        } else if ($(this).attr('id') == 'search4') {
            var mobile = $('#search3').val();
            piccode = $('#piccode_g');
            click_code = $('#vcodeimg_g');
            typeVal = 'get';
        } else {
            var mobile = $(this).parent().prev().children(":input").val();
        }
        if ((code == '') || (code == '六位数字验证码')) {
            return false;
        }
        if (isNaN(code) || (code.toString().length != 6)) {
            if ($(this).attr('id') == 'validatecode') {
                add_hint($(this).next(), '<b class="error">验证码格式错误</b>', 'error', 1);
            } else {
                add_hint($(this).next(), '<b class="error">验证码格式错误</b>', 'error');
            }
        } else {
            $.ajax({
                type: "post",
                url: "/register/check_vcode/",
                data: {'mobile': mobile, 'validatecode': code, 'login': typeVal,'piccode':(piccode == '' ? piccode : piccode.val())},
                async: false,
                success: function (data) {
                    if (data == -1) {
                        add_hint($(self).next(), '<b class="error">验证码错误</b>', 'error');
                        click_code.click();
                    } else if (data == -2) {
                        add_hint($(self).next(), '<b class="error">验证码已过期</b>', 'error');
                        click_code.click();
                    } else if (data == -6) {
                        add_hint($(self).next(), '<b class="error">手机号错误</b>', 'error');
                        click_code.click();
                    } else if (data == -9){
                        add_hint($(self).next(), '<b class="error">图片验证码错误</b>', 'error');
                        click_code.click();
                    }else if (data == 1) {
                        add_hint($(self).next(), '<b class="sure"></b>', 'sure');
                    }
                }
            });
        }
    });

    // 禁止对按钮进行拖拽
    $("#login_btn,#register_now,#next_step,#reset_passwd,#need_code3,#need_code1,#need_code2,#need_code4,#need_code5").bind("dragstart", function (e) {
        return false;
    });

    /**
     * 搜索推荐数据处理
     * @param data
     * @returns {Array}
     */
    // function formatSuggest(data) {
    //     if (!data)
    //         return;
    //     var newData = [];
    //     $.each(data, function (i, record) {
    //         if ($.isPlainObject(record.adm) && record.adm.title && record.landingurl) {
    //             record.landingurl = record.landingurl.replace(/^http[s]?:\/\/([^\.]*)\.?www\.([^\.]*)\.?xin\.com/i, '');
    //             if (record.landingurl) {
    //                 var fdStart = record.landingurl.indexOf('/');
    //                 var has_http = record.landingurl.indexOf('://') || (record.landingurl.indexOf('//') != -1);
    //                 if (fdStart !== 0 && !has_http) {
    //                     record.landingurl = '/' + record.landingurl;
    //                 }
    //             }
    //             newData.push({
    //                 // adid: record.tagid,
    //                 label: record.adm.title,
    //                 num: -1,
    //                 query: record.landingurl,
    //                 value: record.adm.title,
    //                 ad_suggest_location: (i + 1) * 2
    //             });
    //         }
    //     });
    //     return newData;
    // }

    /**
     *  两个数组根据位置隔行拼接
     * @param {Array} - default_suggest
     * @param {Array} - ad
     * @returns {Array}
     */
    // function concatCross(default_suggest, ad) {
    //     var isArray = Array.isArray || function(arr) {
    //         return Object.prototype.toString.call(arr) === '[object Array]';
    //     }
    //     if (!isArray(default_suggest) || !isArray(ad)) return;
    //     if (!default_suggest.length) return [];
    //     var sugCopy = default_suggest.slice();
    //     ad.sort(function(a, b) {
    //         return parseInt(a['ad_suggest_location'] - b['ad_suggest_location']);
    //     });
    //     for (var i = 0; i < ad.length; i++) {
    //         var index = parseInt(ad[i]['ad_suggest_location']);
    //         sugCopy.splice(index ? index - 1 : index, 0, ad[i]);
    //     }
    //     return sugCopy;
    // }


    //suggest
    if ($(".Hsearch,.s-input").length > 0) {
        //搜索框点击效果
        var f = "";
        var source = "pc";
        $(".Hsearch,.s-input").focus(function () {
            if ($(this).val() == $(this).attr('data-default')) {
                //$(this).val("").css("color", "#333");
                $(this).val("");
            }
        }).blur(function () {
            if ($(this).val() == '') {
                $(this).val($(this).attr('data-default')).css("color", "#ccc");
            }
        }).blur().keyup(function(){
            $(this).css("color", "#333");
        });
        var halfp = $(".Hsearch,.s-input").attr("flag");
        if (halfp == 'halfprice') {
            f = "halfp";
            source = "halfpc";
        }
        var rbi_type='click';
        var suggest_flag = '';
        /**
         * 搜索框suggest效果
         */
         // 定义搜索返回的关键词和跳转url，去掉之前的302跳转
        var searchObj = {
            keyword : "",
            jumpUrl : "",
            times : 0,
            isAjax:false
        };
        $('.Hsearch,.s-input').each(function (i, item) {
            var addleft = $(this).data('addleft') || '';
            var addtop = $(this).data('addtop') || '';
            var addwidth = parseInt($(this).data('addwidth')) || 0;
            var carcount = parseInt($(this).data('carcount')) || 0;
            var position = {my: "left" + addleft + " top" + addtop};
            var auto = $(this).autocomplete({
                minChars: 1,
                minLength: 1,
                autoFill: false,
                autoFocus: false,
                delay: 10,
                position: position,
                source: function (request, response) {
                    //_hmt.push(['_trackEvent', 'InternalSearch', 'IS_' + request.term]);
                    if($('#ui-id-1').css('display') == 'block' && ($('.s-input').attr('data-default') == $('.s-input').val() || $('.s-input').val().replace(/\s/g,'') == '')){
                        return false;
                    }
                    var sl = $('.Sitem').val();
                    if (sl == '车辆') {
                        $.post('/apis_suggest/suggest/', {w: request.term, c: TOP_INFO.location.cityid, s: 'pc', h: halfp == 'halfprice' ? 1 : 0}, function (data) {
                            if(typeof data === "string"){
                                data = $.parseJSON(data)
                            }
                            if(!searchObj.isAjax){
                                searchObj.isA = true;
                            }
                            searchObj.keyword = data.data.query_info.w;//接口返回的搜索关键词
                            searchObj.jumpUrl = data.data.enter_url;//接口返回的回车跳转地址
                            if(data.error_code !== 200 || !data.data){
                                return;
                            }

                            if(data.data.list.length < 1){
                                return;
                            }
                            
                            var data = data.data.list;
                            $.each(data, function (i, item) {
                                item.numberIndex = i + 1;
                                if (item.query.indexOf('//') != -1){
                                    item.query = UrlTool.fixHref(item.query);
                                }
                            });
                            response(data);
                        });
                    } else {
                        $.post('/apis_suggest/shop/', {w: request.term}, function (data) {
                            if (data) {
                                var data = $.parseJSON(data);
                                $.each(data, function (i, item) {
                                    item.query = UrlTool.fixHref(item.query);
                                });
                                response(data);
                            }
                        });
                    }
                },
                select: function (event, ui) {
                    //检测query中的channel链接信息
                   //ui.item.query = UrlTool.fixHref(ui.item.query);
                    //添加搜索历史
                    var jsonstr = '{"label": "' + ui.item.label + '","num": "-1","query": "' + ui.item.query + '","value": "' + ui.item.value + '"}';

                    _hmt.push(['_trackEvent', 'InternalSearch', 'ISR_' + ui.item.label]);
                    var sl = $('.Sitem').val();
                    suggest_flag = true;
                    if (sl == '车辆') {
                       // search_log(jsonstr);
                        //window.location.href = '/' + TOP_INFO.location.ename + ui.item.query;
                        var url = '/' + TOP_INFO.location.ename + ui.item.query.replace(/\?q=[^&]+/, '');
                        if (url.indexOf('?') !== -1) {
                            url += '&';
                        } else {
                            url += '?';
                        }
                        var step = '';
                        if ($('input.js-search-from-page') && $('input.js-search-from-page').length > 0 && $('input.js-search-from-page').attr('data-search-from-page')){
                            step = '&step=' + $('input.js-search-from-page').attr('data-search-from-page');
                        }
                        rbi_type = 'suggest';
                        url += 'q=' + ui.item.label +'&clk='+rbi_type+step+'&logrank='+ui.item.numberIndex;
                        var input_word = $('input.js-search-from-page').val();
                        if (input_word && input_word.length > 0){
                            url += '&input_word='+input_word;
                        }
                        // if (ui.item.adid) { //广告数据
                        //     if (ui.item.query.indexOf('//') != -1){
                        //         url = ui.item.query;
                        //     }
                        //     setTimeout(function(){ window.location.href = UrlTool.fixHref(url); }, 0);
                        // } else {
                        if (!$('#ui-id-1 li').eq(ui.item.numberIndex - 1).attr('data-tagid')){
                            if(ui.item.label){
                                $.cookie("searchKeyWord",ui.item.label,{  path:'/',domain: '.xin.com' });
                                $.cookie("searchJumpUrl",url,{  path:'/',domain: '.xin.com' });
                            }
                            window.location.href = UrlTool.fixHref(url);
                        }
                        return false;

                    } else {
                        rbi_type='suggest';
                        search_shop_log(jsonstr);
                        //window.location.href = ui.item.query;
                        var url = ui.item.query;
                        window.location.href = UrlTool.fixHref(url);
                    }
                },
                create: function (event, ui) {
                    $(this).bind("click", function () {
                        if ($(this).val() == '' || $(this).val() == $(this).attr('data-default')) {
                            $(this).autocomplete("search", "__history");
                        }
                    });
                },
                close: function (event, ui) {
                    if ($(this).attr('id') == "topSearch") {
                        $(this).bind("blur", function () {
                            var v = $(this).val();
                            if (v == '' || v == $("#topSearch").data('default')) {
                                $(this).parent().removeClass("search-focus");
                                $("#topSearch").hide();
                            }
                        });
                    }
                }
            }).data("ui-autocomplete");
            auto._renderItem = function (ul, item) {
                // var li = $("<li>").css({"padding-left": "10px"}).attr('data-suggest-adid',item.suggest_adid).attr('data-number-index',item.numberIndex).append($("<span>").css({"float": "left"}).text(item.label));
                var li = $("<li>").css({"padding-left": "10px"}).attr('data-number-index',item.numberIndex).append($("<span>").css({"float": "left"}).text(item.label));
                // if (item.adid) { //增加广告数据属性
                //     li.attr('data-tagid', item.adid);
                // }
                if (carcount && item.num >= 0) {
                    // item.num = Math.floor(item.num / 10) * 10;
                    var sl = $('.Sitem').val();
                    if (sl == '车辆') { }

                }
                return li.appendTo(ul);
            }
            auto._resizeMenu = function () {
                var ul = this.menu.element;
                ul.outerWidth(Math.max(
                    ul.width("").outerWidth() + 1 + addwidth,
                    this.element.outerWidth() + addwidth
                ));
                ul.addClass("ui-xin-suggest-result");
            }
        });
    }
    /*顶部搜索栏效果*/
    $(".top-search").hover(
        function () {
            $(this).addClass("search-focus");
            $("#topSearch").show();
        },
        function () {
            var v = $("#topSearch").val();
            var auto = $("#topSearch").autocomplete().data("ui-autocomplete").menu.element.html();
            if ((v == '' || v == $("#topSearch").data('default')) && auto == '') {
                $(this).removeClass("search-focus");
                $("#topSearch").hide();
            }
        });
    // 回车键搜索
    var localHost = "//" +  window.location.hostname +"/"+ cityname;
    $("#topSearch,.Hsearch,.s-input").bind("keydown", function (event) {
        var event = window.event ? window.event : event;
        if (event.keyCode == 13) {
            var id = $(this).attr('id');
            rbi_type='click';
            var keyword = $.trim($(this).val());
            // if(searchObj.keyword){
            //     $.cookie("searchKeyWord",searchObj.keyword,{  path:'/',domain: '.xin.com' });
            //     $.cookie("searchJumpUrl",searchObj.jumpUrl,{  path:'/',domain: '.xin.com' });
            // }
            $("[for='" + id + "']").click();
            // var timer = setInterval(function searchJump(){
            //     if(searchObj.times > 500){
            //          searchObj.times = 0;
            //          clearInterval(timer);
            //          return;
            //     }
            //     if(searchObj.keyword == keyword || $.cookie("searchKeyWord") == keyword){
            //         clearInterval(timer);
            //         // // fix_location(queryUrl + searchObj.jumpUrl);
            //         // window.location.href = UrlTool.fixHref(localHost + searchObj.jumpUrl)
            //         var jumpUrl = searchObj.jumpUrl ? localHost + searchObj.jumpUrl : $.cookie("searchJumpUrl");
            //         // fix_location(queryUrl + searchObj.jumpUrl);
            //         window.location.href = UrlTool.fixHref(jumpUrl);
            //     }else{
            //         searchObj.times ++;
            //     }
            // },10)
        }
    });
    //首页--搜索框-搜索按钮点击事件
    $(".search-btn").click(function () {
        var a_for = $(this).attr('for');
        var input = $("#" + a_for);
        var ui_item = input.data("ui-autocomplete").selectedItem;
        var v = input.val();
        _hmt.push(['_trackEvent', 'InternalSearch', 'IS_' + v]);
        v = v.replace(/\s/g, "");
        var query = "/s/";
        var history = '';
        if (ui_item) {
            query = ui_item.query;
            history = '{"label": "' + ui_item.label + '","num": "-1","query": "' + ui_item.query + '","value": "' + ui_item.value + '"}';
        }

        if (v != "" && v != input.data('default')) {
            //query += '?q=' + v;
            query += ((query.indexOf('?') === -1 ? '?' : '&') + 'q=' + v);
            if (!history) {
                history = '{"label": "' + v + '","num": "-1","query": "' + query + '","value": "' + v + '"}';
            }
        }
        var sl = $('.Sitem').val();
        var kw_reg = new RegExp("[!${}=<>?&']");  // 过滤特殊字符
        var $brandSearch = $('#brandSearch'),
            sBrand_val = $.trim($brandSearch.val());

        if (sl == '车辆') { // 立即搜索 - 车辆
            if (kw_reg.test(sBrand_val) || (sBrand_val.indexOf("\\") > -1)) {
                return false;
            }
            search_log();
            if (isDefaultStr(sBrand_val)) {
                $brandSearch.attr('value', '');
                sBrand_val = '';
            }
            //window.location.href = '/' + TOP_INFO.location.ename + query;
            // var url = '/'+ TOP_INFO.location.ename + query;

            var url = '/' + TOP_INFO.location.ename + '/s/' + (sBrand_val ? '?q=' + sBrand_val : '');
            var url_fix = (url.indexOf('?') === -1) ? '?' : '&' ;
            url_fix += 'step=home&clk='+rbi_type;
            var input_word = $('input.js-search-from-page').val();
            if (input_word && input_word.length > 0){
                url_fix += '&input_word='+input_word;
            }
            // if ($('#brandSearch')[0].length > 0 && $('#brandSearch')[0].hasAttribute('data-tagid')
            //     && $(this).attr('data-default') == $(this).val() ) { //广告数据
            //     setTimeout(function(){ window.location.href = UrlTool.fixHref(url + url_fix); }, 0);
            // } else {
            if ($brandSearch[0].hasAttribute('data-tagid') || ($brandSearch.val() && $brandSearch.attr('data-default') != $brandSearch.val()) ) {
                window.location.href = UrlTool.fixHref(url + url_fix);
            }
        } else {
            if (!v || v == '请输入店铺名称搜索') {
                $('.Sitem').attr('value', '车辆');
                $('.Hsearch').attr('value', '搜索您想要的车');
                window.location.reload();
                return false;
            }
            if (kw_reg.test(v)) {
                v = '';
            }
            search_shop_log(history);
            $.post('/apis_suggest/shop', {'w': v, 'type': 'button'}, function (data) {
                if (data == '404') {
                    var hf = '/search/shop_error/' + v;
                } else {
                    var hf = data;
                }
                window.location.href = UrlTool.fixHref(hf);
            });
        }
        //添加搜索历史
    });

    //买车页--搜索框-搜索按钮点击事件
    $(".s-btn").click(function () {
        if(suggest_flag){
            return;
        }
        var a_for = $(this).attr('for');
        var input = $("#" + a_for);
        var ui_item = input.data("ui-autocomplete").selectedItem;
        var v = input.val();
        _hmt.push(['_trackEvent', 'InternalSearch', 'IS_' + v]);
        v = v.replace(/\s/g, "");
        var query = "/s/";
        var history = '';
        if (ui_item) {
            query = ui_item.query;
            history = '{"label": "' + ui_item.label + '","num": "-1","query": "' + ui_item.query + '","value": "' + ui_item.value + '"}';
        }
        if (v != "" && v != input.data('default')) {
            //query += '?q=' + v;
            query += ((query.indexOf('?') === -1 ? '?' : '&') + 'q=' + v);
            if (!history) {
                history = '{"label": "' + v + '","num": "-1","query": "' + query + '","value": "' + v + '"}';
            }
        }
        var sl = $('.Sitem').val();
        var kw_reg = new RegExp("[\\!${}=<>?&']");  // 过滤特殊字符
        var $search_search = $('#search_search'),
            sSearch_val = $.trim($search_search.val());

        if (sl == '车辆') { // 立即搜索 - 车辆
            if (kw_reg.test(sSearch_val) ||  (sSearch_val.indexOf("\\") > -1) || sSearch_val == '' || $search_search.val() == '搜索您想要的车') {
                return false;
            }
            // search_log(history);
            //window.location.href = '/' + TOP_INFO.location.ename + query;
            // var url = '/'+ TOP_INFO.location.ename + query;
            var halfflag = $(this).attr("flag");
			var seo_city_ename = $(this).attr('data-seo-ename'); //长尾页城市
            var windowLocationHref = window.location.href;
            // var url = "";
            // if(windowLocationHref.indexOf("?q=") > -1){
            //     url = '&clk='+rbi_type;
            // }else{
            //     url = '?q=' + encodeURIComponent(sSearch_val)+'&clk='+rbi_type;
            // }
			var url = '?q=' + encodeURIComponent(sSearch_val)+'&clk='+rbi_type;
			// if (seo_city_ename) //如果是seo长尾页，取长尾页城市
			// {
			// 	// url = '/' + seo_city_ename + '/s/?q=' + encodeURIComponent(sSearch_val)+'&clk='+rbi_type;
   //              url = '?q=' + encodeURIComponent(sSearch_val)+'&clk='+rbi_type;
			// }
            
            if (halfflag == "halfprice") {
                url += '&type=halfp';
            }
            var input_word = $('input.js-search-from-page').val();
            if (input_word && input_word.length > 0){
                url += '&input_word='+input_word;
            }
            var keyword = sSearch_val;
            // 二次点击直接刷新页面
            if($.cookie("searchKeyWord") == keyword){
                var href = "//"+window.location.host+window.location.pathname;
                if($.cookie("lastSearchJumpUrl").indexOf('?')){
                    var lastSearchJumpUrlArr = $.cookie("lastSearchJumpUrl").split("?");
                    if(lastSearchJumpUrlArr[0] === href){
                        window.location.href =  $.cookie("lastSearchJumpUrl");
                        return;
                    }
                }else{
                    if(lastSearchJumpUrl === href){
                        window.location.href =  $.cookie("lastSearchJumpUrl");
                        return;
                    }
                }
            }

            var timer = setInterval(function searchJump(){
                if(searchObj.times > 500){
                     searchObj.times = 0;
                     clearInterval(timer);
                     return;
                }
                // console.log(1);
                // console.log($.cookie("searchKeyWord") == keyword)
                if(searchObj.keyword == keyword){
                    clearInterval(timer);
                    if(searchObj.keyword){
                        $.cookie("searchKeyWord",searchObj.keyword,{  path:'/',domain: '.xin.com' });
                        $.cookie("searchJumpUrl",searchObj.jumpUrl,{  path:'/',domain: '.xin.com' });
                    }
                    // fix_location(queryUrl + searchObj.jumpUrl);
                    // window.location.href = UrlTool.fixHref(localHost + searchObj.jumpUrl)
                    var jumpUrl = searchObj.jumpUrl ? (localHost + searchObj.jumpUrl) : $.cookie("searchJumpUrl");
                        // fix_location(queryUrl + searchObj.jumpUrl);
                    $.cookie("lastSearchJumpUrl",jumpUrl + url,{  path:'/',domain: '.xin.com' });
                    window.location.href = UrlTool.fixHref(jumpUrl + url);
                }else{
                    searchObj.times ++;
                }
            },10)
            return false;

        } else { // 立即搜索 - 商铺
            if (!v || v == '请输入店铺名称搜索') {
                $('.Sitem').attr('value', '车辆');
                $('.s-input').attr('value', '搜索您想要的车');
                window.location.reload();
                return false;
            }
            if (kw_reg.test(v)) {
                v = '';
            }
            search_shop_log(history);
            $.post('/apis_suggest/shop', {'w': v, 'type': 'button'}, function (data) {
                if (data == '404') {
                    var hf = '/search/shop_error/' + v;
                } else {
                    var hf = data;
                }
                window.location.href = UrlTool.fixHref(hf);
            });

        }
        //添加搜索历史
    });

    // 返回顶部按钮自动换色
    $(window).scroll(function () {
        if ($(window).scrollTop() > 10) {
            $('#goTop').addClass("goTopHover");
            $('.fixed-head-wrap').addClass("addShadow");
        } else if ($(window).scrollTop() < 10) {
            $('#goTop').removeClass("goTopHover");
            $('.fixed-head-wrap').removeClass("addShadow");
        }
    });
    //返回顶部
    $('#goTop').click(function () {
        var page_type = is_hf  == 0 ? 2 : 3;
        uxl_track('w_border/totop/page/' + page_type);
        $("html, body").animate({scrollTop: 0}, 200);
    });

    // 登录界面添加回车事件按钮
    $("#popupLogin").keydown(function (e) {
        var e = e || window.event;
        var id = e.target.id;
        remove_hint($('#' + id));
        var curKey = e.which;
        if (curKey == 13) {
            $("#login_btn").click();
            return false;
        }
    });
    // 注册界面添加回车事件按钮
    $("#redeemPrizes").keydown(function (e) {
        var e = e || window.event;
        var id = e.target.id;
        remove_hint($('#' + id));
        var curKey = e.which;
        if (curKey == 13) {
            $("#register_now").click();
            return false;
        }
    });
    // 下一步添加回车事件按钮
    $("#forPass").keydown(function (e) {
        var e = e || window.event;
        var id = e.target.id;
        remove_hint($('#' + id));
        var curKey = e.which;
        if (curKey == 13) {
            $("#next_step").click();
            return false;
        }
    });

    // 提交添加回车按钮事件
    $("#forgetNext").keydown(function (e) {
        var e = e || window.event;
        var id = e.target.id;
        remove_hint($('#' + id));
        var curKey = e.which;
        if (curKey == 13) {
            $("#reset_passwd").click();
            return false;
        }
    });

    // 修改密码界面添加回车事件按钮
    $("#modify_passwd").keydown(function (e) {
        var e = e || window.event;
        var id = e.target.id;
        remove_hint($('#' + id));
        var curKey = e.which;
        if (curKey == 13) {
            $("#change_pass").click();
            return false;
        }
    });

    // 密码确认onblur事件
    $("#psw12,#psw14,#psw16").on("blur", function (e) {
        var id = $(this).attr('id');
        var wid = Number(id.substring(3)) - 1;
        id = Number(id.substring(3)) - 2;
        var pass = $("#psw" + id).val();
        var oldpass=$("#psw12").val();
        var cpass = $(this).val();
        if ((typeof cpass == 'undefined') || (cpass.toString().length < 1)) {
            $('#psw' + wid).show();
            $(this).hide();
            return false;
        }
        if($(this).attr('id') == 'psw16'){
            if (pass != cpass) {
                add_hint($(this), '<b class="error">两次输入的密码不一致</b>', 'error');
            } else {
                //能匹配的组合为：数字+字母，数字+符号，字母+符号，数字+字母+符号组合，而且不能是纯数字，纯字母，纯符号
                var reg = /^(?![\d]+$)(?![a-zA-Z_]+$)(?![^\w]+$)[\S]{6,20}$/;
                if(oldpass == pass){
                    add_hint($('#psw16'), '<b class="error">原密码与新密码不能相同</b>', 'error');
                    return false;
                }else if (!reg.test(pass)) {
                    add_hint($('#psw16'), '<b class="error">密码应为6-20位，数字、字母、符号的组合</b>', 'error');
                    return false;
                } else
                {
                    add_hint($(this), '<b class="sure"></b>', 'sure');
                }
            }
        }
    });

    $("#psw1,#psw3,#psw5,#psw7,#psw11,#psw13,#psw15").on("blur", function (e) {
        var id = $(this).attr('id');
        id = Number(id.substring(3)) + 1;
        $(this).hide();
        $('#' + id).show();
    });
    $('#psw6').blur(function(){
        if(!this.value){
            $(this).hide();
            $('#psw5').show();
        }
    })
    // 手机号input事件，值有变化时触发，清除错误警告信息或正确提示信息
    $("#regi_mobile,#studio_mobile,#search,#search1,#search3,#free_mobile,#consult_mobile,#register_mobile").on("input", function (e) {
        remove_hint($(this));
    });

    // 密码input事件，值有变化时触发，密码超过20位是给出警告信息
    $("#psw2,#psw8,#psw6").on("input", function (e) {
        if ($(this).val().length > 20) {
            //add_hint($(this),'<b class="error">密码长度不能超过20位</b>','error');
            $(this).val($(this).val().substring(0, 20));
            return false;
        }
    });

    // 验证码input事件，一旦验证码个数到达6位，触发blur事件
    $("#validatecode,#search4,#valicode1,#validate_code_studio").on("input", function (e) {
        if ($(this).val().length == 6) {
            $(this).blur();
        }
    });


    /*输入框focus效果*/
    $("#txtValidCode,#search,#search1,#search2,#search3,#search4,#search5,#search6,#search7,#regi_mobile,#studio_mobile,#mobile,#mobile2,#sms_captcha,#suptare,#validatecode,#validate_code_studio,#piccode,#piccode_r,#piccode_l,#piccode_c,#piccode_g,#topSearch,#psw1,#psw3,#psw5,#psw7,#psw9,#psw11,#psw13,#psw15,#update_mobile,#valicode1,#real_name,#real_mobile,#real_carid,#invited_mobile,#invite_code,#user_name2,#user_name1,#id_card,#mobile,#free_mobile,#consult_mobile,#studio_name,#validate_code_studio,#piccode_o,#register_mobile,#piccode_register,#register_smscode,#register_psw").focus(function () {
        //获取焦点时，如果原来有错误警告消息，则删除
        if ($('.con-height2,.con-height1').find('.error').length) {
            $('.error').remove();
        }
        if ($(this).next().hasClass('error_num') == true) {
            $(this).next().remove();
        }
        if ($(this).next().hasClass('error_1') == true) {
            $(this).next().remove();
        }
        if ($(this).next().next().hasClass('error') == true) {
            $(this).next().next().remove();
        }
        if ($(this).attr('id') == 'txtValidCode') {
            $('.error').hide();
        }
        if ($(this).val() == this.defaultValue) {
            $(this).val("").css("color", "#333");
            if ($(this).attr('id') == 'psw1') {
                $("#psw1").hide();
                $("#psw2").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw3') {
                $("#psw3").hide();
                $("#psw4").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw5') {
                $("#psw5").hide();
                $("#psw6").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw7') {
                $("#psw7").hide();
                $("#psw8").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw9') {
                $("#psw9").hide();
                $("#psw10").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw11') {
                $("#psw11").hide();
                $("#psw12").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw13') {
                $("#psw13").hide();
                $("#psw14").show().focus().css("color", "#bfbfbf");
            }
            if ($(this).attr('id') == 'psw15') {
                $("#psw15").hide();
                $("#psw16").show().focus().css("color", "#bfbfbf");
            }
        }
    }).blur(function () {
        if ($(this).val() == '') {
            $(this).val(this.defaultValue).css("color", "#bfbfbf");
        }
    });

    // lazy load for vcode
    var flag_logintab = 0;

    $('.logintab a').click(function () {
        var act_logintab = $(this).attr('data-i');
        if (flag_logintab == act_logintab) {
            return false;
        }
        flag_logintab = act_logintab;
        $('#popupLogin .PageNum').html('');
        $('#popupLogin .PageNum').eq(flag_logintab).html('<img src="/register/get_vcode/?r=' + (new Date()).getTime()+'" id="vcodeimg_r"/>');
        $('#vcodeimg_r').bind('click', function () {
            if ($('#vcodeimg_r').next().hasClass('error') || $('#vcodeimg_r').next().hasClass('sure')) {
                $('#vcodeimg_r').next().remove();
            }
            flush_vcode('#vcodeimg_r');
        });
    });

    $('.forPass a').click(function () {
    	if ($(this).hasClass('forPassA')) {
	        $('#forPass .PageNum').html('<img src="/register/get_vcode/?r=' + (new Date()).getTime()+'" id="vcodeimg_g">');
	        $('#vcodeimg_g').bind('click', function () {
	            if ($('#vcodeimg_g').next().hasClass('error') || $('#vcodeimg').next().hasClass('sure')) {
	                $('#vcodeimg_g').next().remove();
	            }
	            flush_vcode('#vcodeimg_g');
	        });
    	}
    });

    $('.forPassSiwtch').click(function(){
    	var rlbox = $(this).hasClass('forPassRegister') ? 'popupRegister' : 'popupLogin';
    	if (rlbox == 'popupLogin') {
    		$('#popupLogin .PageNum, #popupRegister .PageNum').html('');
    		$('#popupLogin .PageNum').eq(flag_logintab).html('<img src="/register/get_vcode/?r=' + (new Date()).getTime()+'" id="vcodeimg_r"/>');
    	} else {
    		$('#popupLogin .PageNum, #popupRegister .PageNum').html('');
    		$('#popupRegister .PageNum').html('<img src="/register/get_vcode/?r=' + (new Date()).getTime()+'" id="vcodeimg_r"/>');
    	}
        $('#vcodeimg_r').bind('click', function () {
            if ($('#vcodeimg_r').next().hasClass('error') || $('#vcodeimg_r').next().hasClass('sure')) {
                $('#vcodeimg_r').next().remove();
            }
            flush_vcode('#vcodeimg_r');
        });
    });

    /* 修改 城市列表为ajax方式之后,（搜索页面改版，删除 20161201）
    function autoListAdd() {
        var oTar = $("#topSearch");
        if (oTar.length > 0) {
            var auto = $("#topSearch").autocomplete({
                appendTo: "#cityWrap .hot-city",
                position: {my: "left top", at: "left bottom"},
                source: function (request, response) {
                    $.ajax({
                        url: "/location_city/",
                        dataType: "json",
                        data: {
                            q: request.term
                        },
                        success: function (data) {
                            response($.map(data, function (val, i) {
                                return {'label': data[i].cityname, 'value': data[i].cityname, 'ename': data[i].ename};
                            }));
                        }
                    });
                },
                minLength: 1,
                select: function (event, ui) {
                    $('a[data-ename=' + ui.item.ename + ']').click();
                }
            }).data("ui-autocomplete");
            auto._renderItem = function (ul, item) {
                return $("<li>").addClass("CommonSearch").append(item.label).appendTo(ul);
            };
            auto._renderMenu = function (ul, items) {
                var that = this;
                $.each(items, function (index, item) {
                    that._renderItemData(ul, item);
                });
            };
            auto._resizeMenu = function (ul, item) {
                $(this.menu.element).attr('style', 'z-index:299;position:absolute;height:300px;overflow-y:scroll');
                this.menu.element.outerWidth($("#topSearch").css("width"));
            };
            oTar.on({
                'focus': function () {
                    if ($(this).val() == this.defaultValue) {
                        $(this).val("").css("color", "#333");
                    }
                },
                'blur': function () {
                    if ($(this).val() == '') {
                        $(this).css('color', '#bfbfbf');
                    }
                }
            });
        }
    }

    function goBranWord() {
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
            var height = {scrollTop: $(id).offset().top - $("#citySelect").parent().offset().top - 60};
            $("#cityWrap").animate(height, speed);
        });
        $("#cityWrap").mouseup(function () {
            return false;
        });
    }

    autoListAdd();
    goBranWord();
    */
    // 城市切换记录cookie
    $('body').on('click', '#citySelect a, .ci_m .ci_m_l a, .ci_m .ci_m_i1_popup a', function (event) {
        if ($(this).attr('href') && $(this).data('ename')) {
            event.preventDefault();
            event.stopPropagation();
            var href = $(this).attr('href'),
                ename = $(this).data('ename'),
                cityid = $(this).data('id');
            $.post(
                '/ajax/set_cc_location/',
                { ename: ename },
                function (data) {
                    var param = window.location.search ? window.location.search : '';
                    if (/^\/aboutus(\/)?(\?.+)?/.test(window.location.pathname)) { // 关于我们
                        href = window.location.href;
                    } else if (/^\/joinus(\/)?/.test(window.location.pathname)) { // 加入我们
                        href = window.location.href;
                    } else if (/^\/cw_d(\d+)?/.test(window.location.pathname)) { // 三期长尾页
                        href = window.location.href;
                    } else if (/^\/help(\/)?/.test(window.location.pathname)) { // 帮助
                        href = window.location.href;
                    } else if (/^\/feedback(\/)?/.test(window.location.pathname)) { // 反馈
                        href = window.location.href;
                    } else if (/^\/service(\/)?/.test(window.location.pathname)) { // 服务保障
                        href = '/service/' + cityid + '/' + param;
                    } else if (/^\/activity(\/)?/.test(window.location.pathname)) { // 宝典
                        href = '/activity/' + cityid + '/' + param;
                    } else if (/^\/article(\/)?/.test(window.location.pathname)) { // 文章
                        href = window.location.href;
                    } else if (/^\/qa(\/)?/.test(window.location.pathname)) { // 问答
                        href = window.location.href;
                    } else if (/^\/sale(\/)?/.test(window.location.pathname)) { // 卖车
                            href = '/c2b_car_o/' + cityid + '/' + param;
                        //} else if(/^\/(starelite|nissan|volvo)(\/)?/.test(window.location.pathname)) { // 推广店铺
                        //	href = window.location.href;
                    } else if (/^\/d\/\d+\.html/.test(window.location.pathname)) { // 店铺
                        href = window.location.href;
                    } else if (/^\/star(\/)?/.test(window.location.pathname)) { // 明星页
                        href = window.location.href;
                    } else if (/^\/half_detail\/index(\/)?/.test(window.location.pathname)) {// 付一小半介绍
                        href = '/halfprice/guide/' + ename + '/' + param;
                    }
                    window.location.href = UrlTool.fixHref(href);

                    return false;
                }
            );
        }
    });
    // 判断某个字符串是否是是默认的搜索字符串，依赖于变量defaultSearchStr
    // @param {string} str 当前字符串
    // @param {array} arr 默认搜索字符串数组
    // @return {boolean} 结果
    function isDefaultStr(str,arr){
        arr = arr || defaultSearchStr;
        if(arr.indexOf){
            return arr.indexOf(str) !== -1;
        }else{
            for(var i=0,len=arr.length;i<len;i++){
                if(str === arr[i]){
                    return !0;
                }
            }
            return !!0;
        }
    }

    $(".placeholder-em").click(function(){
        $(this).hide();
        $("#register_psw").focus();
    });
    $("#register_psw").focus(function(){
        $(".placeholder-em").hide();
    });
    $("#register_psw").blur(function(){
        if($.trim($(this).val())==""){
            $(".placeholder-em").show();
        }
    });
});
// 初始化页面导航
function init_page_nav(cityname) {
    $('a.logo,a.fixed-logo').attr('href', UrlTool.fixHref('/' + TOP_INFO.location.ename + '/')); // logo
    if (!/sn_[\.\-\w]*(y\d)[\.\-\w]*/.test(location.pathname)) {
        $('#current_city_id').html(TOP_INFO.location.cityname);	// cur城市
    }
	$('.select-city').css('display', $('.select-city').attr('data-hide') == '1' ? 'none' :'block');
    if ($('a.a_buypage').length > 0) {
        $('a.a_buypage').attr('href', UrlTool.fixHref($('a.a_buypage').attr('href').replace(/^\/\w+\//, '/' + TOP_INFO.location.ename + '/'))); // 买车
    }
    if ($(".a_sellpage").length > 0) { // 卖车
        $(".a_sellpage").attr('href', UrlTool.fixHref('/c2b_car_o/' + TOP_INFO.location.cityid + '/'));
    }
    if (typeof TOP_INFO.location.diff_newcar_city != 'undefined' && $(".js-top-banner-newcar") && $(".js-top-banner-newcar").length > 0){
        $('.js-top-banner-newcar').css('display', 'none');
    }
    /*if ($.inArray(parseInt(TOP_INFO.location.cityid), TOP_INFO.half_city) != -1 || TOP_INFO.location.cityid == 0) { 
        // 付一半
        $("#li_halfprice").show();
        $(".php_li_half").show();
        $("#php_half_city_link").show();
        $('#php_half_city_link').attr('href', UrlTool.fixHref($('#php_half_city_link').attr('sname') + '/' + TOP_INFO.location.ename + '/h/'));
    } else {
        $("#li_halfprice").hide();
        $(".php_li_half").hide();
    }*/
	var question_perg = /(\/activity\/\d+\/)|(\/activity\/\/)/;
	if($('a.a_question').length > 0) $('a.a_question').attr('href', UrlTool.fixHref($('a.a_question').attr('href').replace(question_perg, '/activity/' + TOP_INFO.location.cityid + '/'))); // 宝典
	var service_perg = /(\/service\/\d+\/)|(\/service\/\/)/;
	if($('a.a_service').length > 0) $('a.a_service').attr('href', UrlTool.fixHref($('a.a_service').attr('href').replace(service_perg, '/service/' + TOP_INFO.location.cityid + '/'))); // 服务保障
	// home nav
    if ($('.contact_new').length > 0) {
        $('.contact_new a').each(function () {
            $(this).attr('href', UrlTool.fixHref($(this).attr('href')));
        });
    }
}
//搜索历史和搜索日志
function search_log(jsonstr) {
    if (jsonstr) {
        $.cookie('XIN_SUGGEST_HISTORY_ADD', jsonstr, {path: '/', expires: 24 * 60 * 60});
        $.post('/apis_suggest/search_log/', {h: jsonstr, c: TOP_INFO.location.ename});
    }
}
//搜索历史和搜索日志
function search_shop_log(jsonstr) {
    if (jsonstr) {
        $.cookie('XIN_SUGGEST_SHOP_HISTORY_ADD', jsonstr, {path: '/', expires: 24 * 60 * 60});
        $.post('/apis_suggest/search_shop_log/', {h: jsonstr, c: TOP_INFO.location.ename});
    }
}
/**
 * 显示提示信息
 */
function show_tip(msg) {
    $("#warmTip10 .span_xin_msg").text(msg);
    show_popup("#warmTip10", "#warmTip10 .closeJs");
}
/**
 * 验证手机号
 * @param  {[type]} mobile [description]
 * @return {[type]}      [description]
 */
function is_valid_mobile(mobile) {
    if ((mobile == '请输入手机号') || (mobile == '')) {
        return '手机号不能为空';
    }
    var reg = /^1[34578]\d{9}$/;
    if (!reg.test(mobile)) {
        return '手机号码格式不正确';
    }
    return 1;
}
/**
 * 验证密码
 * @param  {[type]}  [description]
 * @return {[type]}      [description]
 */
function is_valid_pass(pass) {
    if (pass == '') {
        return '密码不能为空';
    }
    if ((pass.length > 20) || (pass.length < 6)) {
        return '密码格式不正确';
    }
    return 1;
}

/*
 *验证中文名
 */
function is_valid_name(name) {
    if (name.match(/^[\u4e00-\u9fa5][\u4e00-\u9fa5][\u4e00-\u9fa5]?[\u4e00-\u9fa5]?$/)) {
        return 1;
    }
    return -1;
}

/**
 * 清空验证错误信息和原来输入信息
 */
function clear_invalid() {
    $("#popupLogin .error,#forPass .error,#forgetNext .error,#popupRegister .error").remove();
    $(".sure").remove();
    var curPhone = $.cookie('XIN_CURRENT_SHOW_MOBILE');
    $("#search,#search1,#search3,#update_mobile,#mobile,#free_mobile,#consult_mobile,#register_mobile").val( curPhone || '请输入手机号').css("color", curPhone ? "#333" : "#bfbfbf");
    $("#search2,#search4,#valicode1").val('六位数字验证码').css("color", "#bfbfbf");
    $("#piccode_g,#piccode_r").val('请输入图片码').css("color", "#bfbfbf");
    $("#sms_captcha").val('请输入验证码').css("color", "#bfbfbf");
    $("#psw6,#psw8,#psw10").val('');
    $("#psw1,#psw3,#psw5,#psw7").show();
    $("#psw2,#psw4,#psw6,#psw8,#psw10").hide();
    $('.error_num').remove();
    $('#user_name2,#user_name1').val('');
    $('#invite_code').val('');
    $('#invited_mobile').val('');
}
/*
 * 验证值是否为空
 */
function is_empty(val) {
    if ((typeof val == 'undefined') || (val.toString().length < 1)) {
        return true;
    }
    return false;
}
/**
 * 列表页和详情页点击更多
 */
var scrollChangeVal = 0;
function moreClick(h, m, openHtml, retractHtml, moreActive) {
    var handle = $(h),
		divMore = $(m);
    handle.bind('click', function () {
        var self = $(this);
        if (divMore.css("display") == "block") {
            if (h == '#putaway') {
                if (scrollChangeVal != 0) {
                    $(document).scrollTop(scrollChangeVal);
                } else {
                    $(document).scrollTop(self.parent().attr('scrollVal'));
                }
            }
            divMore.hide();
            handle.html(openHtml).removeClass(moreActive);
        } else if (divMore.css("display") == "none") {
            if (typeof (scrollChangeVal) == "undefined") {
                self.parent().attr('scrollVal', $(document).scrollTop());
            } else {
                scrollChangeVal = $(document).scrollTop();
            }
            divMore.show();
            handle.html(retractHtml).addClass(moreActive);
        }
    })
}

function get_type(id) {
    switch (id) {
        case 'regi_mobile':
            var typeVal = 'reg';
            break;
        case 'search3':
            var typeVal = 'get';
            break;
        case 'search1':
            var typeVal = 'login';
            break;
        case 'update_mobile':
            var typeVal = 'update';
            break;
        case 'studio_mobile':
            var typeVal = 'order';
            break;
    }
    return typeVal;
}

/*
 * 添加验证结果信息
 */
function add_hint(select, msg, type, page) {
    if ((select.next().hasClass('error') == true) || (select.next().hasClass('sure') == true)) {
        select.next().remove();
    }
    if ((select.next().hasClass('error_num') == true) || (select.next().hasClass('sure') == true)) {
        select.next().remove();
    }
    if ((page == 1) || ($('#popupLogin .error').length == 0)) {
        select.after(msg);
    }
}

/*
 * 移除验证结果信息
 */

function remove_hint(select) {
    if (select.next().hasClass('error') || select.next().hasClass('sure')) {
        select.next().remove();
    }
    if (select.next().hasClass('error_num') || select.next().hasClass('sure')) {
        select.next().remove();
    }
    if (select.next().next().hasClass('error') || select.next().next().hasClass('sure')) {
        select.next().next().remove();
    }
}
/**
 * 判断字符的个数
 */
function getByteLen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var a = str.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}

//截取字符串 包含中文处理
//(串,长度,增加...)
function subString(str, len, hasDot) {
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex, "**").length;
    for (var i = 0; i < strLength; i++) {
        singleChar = str.charAt(i).toString();
        if (singleChar.match(chineseRegex) != null) {
            newLength += 2;
        } else {
            newLength++;
        }
        if (newLength > len) {
            break;
        }
        newStr += singleChar;
    }

    if (hasDot && strLength > len) {
        newStr += "...";
    }
    return newStr;
}

var flush_vcode = function (obj) {
    var str = '/register/get_vcode?r=' + new Date();
    $(obj).prop('src', str);
}

/**
 * 安装注册
 *
 * @param {type} u
 * @param {type} p
 * @returns {undefined}
 */
function install_register(u, p) {
    var _mvq = window._mvq || [];
    window._mvq = _mvq;
    _mvq.push(['$setAccount', 'm-155044-0']);
    _mvq.push(['$setGeneral', 'registered', '', /*用户名*/ u, /*用户id*/ p]);
    _mvq.push(['$logConversion']);
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

//点击退出将云端收藏的车辆同步到本地
$(document).on("click",".exit",function(e){
    var  url=UrlTool.fixHref(location.protocol+'//'+location.host+'/login/out/');
    e.stopPropagation();
    e.preventDefault();
    $.ajax({
        type:'get',
        url: "/apis_ajax/sync_user_data",               
        success: function(data) {
            if(data.code==1){
                $.cookie("favorite_arr",data.data,{  path:'/',domain: '.xin.com' });                                           
            }
            window.location.href=url;
        }   
    });  
});

//获取设置点击二维码次数
function setGetCodeCookie(){
    var getCodeTime = $.cookie('getCodeTime') || 0;
    $.cookie('getCodeTime',parseInt(getCodeTime)+1);
}

//显示隐藏图片二维码input
function setCodeInput(){
    var getCodeTime = $.cookie('getCodeTime');
    if(!getCodeTime || getCodeTime<3){
        $(".code-input").hide();
        return false;
    }else{
        $(".code-input").show();
        return true;
    }
}
function easemobCallback(data){
    var getClickIm = $.cookie('clickIm');
    var isSite = $.cookie('s'+window.__json4fe__.cityid);
    if(+getClickIm ===1 && !isSite && ($.cookie("XIN_INFO") || window.semobcf.exemptLogin) ){
        storeJs.init(window.__json4fe__.easemobCf, data, 1);
    }else{
        window.__json4fe__.easemobCf(data);
    }   
}