package com.jk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author 顺哥
 * @data 2019-11-12 13:58
 */
@Controller
@RequestMapping("page")
public class PageController {

    @RequestMapping("toIndex")
    public String findIndex(){
        return "list";
    }
}
