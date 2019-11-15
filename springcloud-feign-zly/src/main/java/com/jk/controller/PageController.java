package com.jk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

/**
 * author:zly
 * create time:2019/11/12
 * email:
 * info:
 **/
@Controller
@RequestMapping("page")
public class PageController {

    /**
     * page去详情页面
     */
    @RequestMapping("toDetails")
    public String toDetails(Integer carId, HttpSession session){
        session.setAttribute("carId",carId);
        return "zly/details";
    }

    /**
     * page去详情页面
     */
    @RequestMapping("toMain")
    public String toMain(){
        return "zly/main";
    }

    /**
     * page去浏览页面
     */
    @RequestMapping("toBrowse")
    public String toBrowse(){
        return "zly/browse";
    }

    /**
     * page去卖车详情页面
     */
    @RequestMapping("toSelling")
    public String toSelling (){
        return "zly/selling";
    }

    /**
     * page去收藏页面
     */
    @RequestMapping("toCollection")
    public String toCollection(){
        return "zly/collection";
    }



}
