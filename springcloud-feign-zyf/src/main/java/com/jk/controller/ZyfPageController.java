package com.jk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("zyfpage")
public class ZyfPageController {

    /**
     * 跳转到买车页面
     * @return
     */
    @RequestMapping("toIndex2")
    public String toIndex2(){
        return "index2";
    }

    /**
     * 跳转到卖车页面  新增
     * @return
     */
    @RequestMapping("toSellCar")
    public String toSellCar(){
        return "sellcar";
    }

    /**
     * 跳转到服务保障
     * @return
     */
    @RequestMapping("toIndex5")
    public String toIndex5(){
        return "index5";
    }

    /**
     * 跳转到质保服务
     * @return
     */
    @RequestMapping("toQualityguarantee")
    public String toQualityguarantee(){
        return "qualityguarantee";
    }

    /**
     * 调用手机快捷登录
     * @return
     */
    @RequestMapping("toPhoneCode")
    public String toPhoneCode(){
        return "phoneCode";
    }

    @RequestMapping("toImg")
    public String toImg(){
        return "imgtest";
    }
}
