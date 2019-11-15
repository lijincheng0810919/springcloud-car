package com.jk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("page")
public class PageController {

    /**
     * 跳转到首页
     * @return
     */
    @RequestMapping("toMain")
    public String toMain(){
        return "page/main";
    }

    /**
     * 跳转到瓜子首页
     * @return
     */
    @RequestMapping("toMain2")
    public String toMain2(){
        return "page/main2";
    }

    /**
     * 跳转到优信备份首页
     * @return
     */
    @RequestMapping("toMain3")
    public String toMain3(){
        return "page/main3";
    }

    /**
     * 跳转到详情页面
     * @param carId
     * @param session
     * @return
     */
    @RequestMapping(value = "toDetails")
    public String toDetails(Integer carId, HttpSession session){
        session.setAttribute("carId",carId);
        return "page/details";
    }

    /**
     * 跳转到详情页面
     * @return
     */
    @RequestMapping(value = "toMy")
    public String toMain4(){
        return "page/my";
    }

    /**
     * 跳转到首页
     * @return
     */
    @RequestMapping(value = "toIndex")
    public String toIndex(){
        return "page/index";
    }
}
