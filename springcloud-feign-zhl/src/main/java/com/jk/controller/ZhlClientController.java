package com.jk.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jk.config.*;
import com.jk.model.BankCardBean;
import com.jk.model.UserBean;
import com.jk.service.ZhlService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.io.PrintWriter;
import java.io.StringWriter;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Controller
@RequestMapping("zhl")
public class ZhlClientController {

    @Autowired
    private ZhlService zhlService;

    @Autowired
    private RedisTemplate<String,Object> redisTemplate;

    @Bean(value = "zhlService")
    public ZhlService getZhlService() {
        return zhlService;
    }


    @RequestMapping("test")
    @ResponseBody
    public String test() {
        return zhlService.test();
    }

    //跳转登录页面
    @RequestMapping("toLogin")
    public String toLogin() {
        return "page/login";
    }

    //跳转快捷登录页面
    @RequestMapping("kjlogin")
    public String kjlogin() {
        return "page/zhuce";
    }

    //普通登录
    @RequestMapping("login")
    @ResponseBody
    public String login(UserBean userBean, HttpSession session) {
        String password = userBean.getPassword();
        String md532 = Md5Util.getMd532(password);
        userBean.setPassword(md532);
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken upt = new UsernamePasswordToken(userBean.getUsername(), userBean.getPassword());
        try {
            subject.login(upt);
            session.setAttribute(session.getId(),userBean.getId());
            return "登录成功";
        } catch (UnknownAccountException e) {
            return "账号不存在";
        } catch (IncorrectCredentialsException e) {
            return "密码错误";
        } catch (AuthenticationException e) {
            return "用户认证失败";
        }
    }

    //登录获取手机验证码
    @RequestMapping("yanZhengMa")
    @ResponseBody
    public String yanZhengMa(String phone){
        String key1="loginSuo"+phone;
        if(redisTemplate.hasKey(key1)){
            return "五分钟之后再试";
        }
        if(!redisTemplate.hasKey(key1)){
            redisTemplate.opsForValue().set(key1,1,5, TimeUnit.MINUTES);
        }

    UserBean user = zhlService.findUserByPhone(phone);
        if(user ==null) {
        return "手机号不存在";
    }

    long round = Math.round(Math.random() * 899999 + 100000);
        System.out.println("随机数："+round);
    //TODO b、调用短信接口发送短信
    String url = "https://api.netease.im/sms/sendcode.action";
    HashMap<String, Object> params = new HashMap<String, Object>();
        params.put("mobile",phone);//手机号
    //params.put("templateid", 14836057);//模板编号(如不指定则使用配置的默认模版)
        params.put("authCode",round);//客户自定义验证码，长度为4～10个数字
    //放header中的公共参数
    HashMap<String, Object> headerParam = new HashMap<>();
        headerParam.put("AppKey",CommonConf.APP_KEY);//开发者平台分配的appkey
    String nonce = UUID.randomUUID().toString();
        headerParam.put("Nonce",nonce);//随机数（最大长度128个字符）
    String curTime = String.valueOf(System.currentTimeMillis() / 1000);
        headerParam.put("CurTime",curTime);//当前UTC时间戳，从1970年1月1日0点0 分0 秒开始到现在的秒数(String)
    //SHA1(AppSecret + Nonce + CurTime)，三个参数拼接的字符串，进行SHA1哈希计算，转化成16进制字符(String，小写)
    String appSecret = CommonConf.APP_SECRET;
        headerParam.put("CheckSum", CheckSumBuilder.getCheckSum(appSecret,nonce,curTime));
    String str = HttpClientUtil.post2(url, params, headerParam);
    JSONObject parseObject = JSON.parseObject(str);
    int code = parseObject.getIntValue("code");
        if(code !=200)
    {//发送失败
        return "短信发送失败！";
    }
    //3.
    String key = "login"+phone;
        redisTemplate.opsForValue().set(key, round);
        return"短信发送成功！";
    }

    //快捷登录
    @RequestMapping("kuaiJielogin")
    @ResponseBody
    public String kuaiJielogin(String phone,Integer code) {
        //获取实体bean
        UserBean user = zhlService.findUserByPhone(phone);
        if(user ==null) {
            return "手机号不存在";
        }
        //判断验证码师傅正确
        String key = "login"+phone;
        Object o = redisTemplate.opsForValue().get(key);
        Integer code1=(Integer) o;
        if (!code.equals(code1)) {
            return "验证码不正确";
        }
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken upt = new UsernamePasswordToken(user.getUsername(), user.getPassword());
        try {
            subject.login(upt);
            return "登录成功";
        } catch (UnknownAccountException e) {
            return "账号不存在";
        } catch (IncorrectCredentialsException e) {
            return "密码错误";
        } catch (AuthenticationException e) {
            return "用户认证失败";
        }
    }

    //推送邮箱
/*    @RequestMapping("send")
    @ResponseBody
    public void send() throws MessagingException {
        try {
            SendMessages.sendMail("3288584242@qq.com","低价二手车","向日葵");
            // 接收者的邮箱账号，与发送的内容

        } catch (AddressException e) {
            //TODO Auto-generated catch block
            e.printStackTrace();
        }
    }*/

    //查询填写的银行卡是那个银行的
    @RequestMapping("yanZHKaHao")
    @ResponseBody
    public String findKahao(String kahao) throws Exception {
        HashMap<String, Object> map = new HashMap<>();
        map.put("cardNo",kahao);
        map.put("cardBinCheck","true");
        String get = HttpClientUtil.get("https://ccdcapi.alipay.com/validateAndCacheCardInfo.json", map);
        JSONObject jsonObject = JSON.parseObject(get);
        String bank = jsonObject.getString("bank");
        return bank;
    }

    //注册
    @RequestMapping("zhuce")
    @ResponseBody
    public void zhuce(UserBean userBean,String bankNo,String bankName,BankCardBean bankCardBean) throws MessagingException {
        String password = userBean.getPassword();
        String md532 = Md5Util.getMd532(password);
        userBean.setPassword(md532);
        zhlService.addUser(userBean);
        Integer userid= zhlService.findUserId();
        Integer bankid=zhlService.findBankId(bankName);
        bankCardBean.setUserid(userid);
        bankCardBean.setBankid(bankid);
        zhlService.addBank(bankCardBean);
        if(userBean.getSex().equals(1)){
            SendMessages.sendMail(userBean.getEmail(),"欢迎"+userBean.getRealname()+"先生注册成功！","向日葵");
        }
        else{
            SendMessages.sendMail(userBean.getEmail(),"欢迎"+userBean.getRealname()+"女士注册成功！","向日葵");
        }
    }

    //忘记密码   获取手机验证码
    @RequestMapping("huoquYan")
    @ResponseBody
    public String huoquYan(String phone){
        String key1="loginWangSuo"+phone;
        if(redisTemplate.hasKey(key1)){
            return "五分钟之后再试";
        }
        if(!redisTemplate.hasKey(key1)){
            redisTemplate.opsForValue().set(key1,1,5, TimeUnit.MINUTES);
        }

        UserBean user = zhlService.findUserByPhone(phone);
        if(user ==null) {
            return "请先注册";
        }

        long round = Math.round(Math.random() * 899999 + 100000);
        System.out.println("随机数："+round);
        //TODO b、调用短信接口发送短信
        String url = "https://api.netease.im/sms/sendcode.action";
        HashMap<String, Object> params = new HashMap<String, Object>();
        params.put("mobile",phone);//手机号
        //params.put("templateid", 14836057);//模板编号(如不指定则使用配置的默认模版)
        params.put("authCode",round);//客户自定义验证码，长度为4～10个数字
        //放header中的公共参数
        HashMap<String, Object> headerParam = new HashMap<>();
        headerParam.put("AppKey",CommonConf.APP_KEY);//开发者平台分配的appkey
        String nonce = UUID.randomUUID().toString();
        headerParam.put("Nonce",nonce);//随机数（最大长度128个字符）
        String curTime = String.valueOf(System.currentTimeMillis() / 1000);
        headerParam.put("CurTime",curTime);//当前UTC时间戳，从1970年1月1日0点0 分0 秒开始到现在的秒数(String)
        //SHA1(AppSecret + Nonce + CurTime)，三个参数拼接的字符串，进行SHA1哈希计算，转化成16进制字符(String，小写)
        String appSecret = CommonConf.APP_SECRET;
        headerParam.put("CheckSum", CheckSumBuilder.getCheckSum(appSecret,nonce,curTime));
        String str = HttpClientUtil.post2(url, params, headerParam);
        JSONObject parseObject = JSON.parseObject(str);
        int code = parseObject.getIntValue("code");
        if(code !=200)
        {//发送失败
            return "短信发送失败！";
        }
        //3.
        String key = "loginwang"+phone;
        redisTemplate.opsForValue().set(key, round);
        return"短信发送成功！";
    }

    //修改密码
    @RequestMapping("wangjimima")
    @ResponseBody
    public String wangjimima(String code,String password1,UserBean userBean){
        UserBean user = zhlService.findUserByPhone(userBean.getPhone());
        if(user ==null) {
            return "手机号为空";
        }
        String key = "loginwang"+userBean.getPhone();
        Object o = redisTemplate.opsForValue().get(key);
        String code1=(String) o;
        if(!code1.equals(code)){
            return "验证码不正确";
        }
        if(!password1.equals(userBean.getPassword())){
            return "两次密码不一样";
        }
        String md532 = Md5Util.getMd532(userBean.getPassword());

        userBean.setPassword(md532);
        zhlService.updatepass(userBean.getPassword(),userBean.getPhone());
        return "修改成功";
    }
}
