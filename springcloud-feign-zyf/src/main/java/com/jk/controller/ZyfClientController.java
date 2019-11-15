package com.jk.controller;

import com.jk.service.ZyfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("zyf")
public class ZyfClientController {

    @Autowired
    private ZyfService zyfService;

    @RequestMapping("test")
    @ResponseBody
    public String test(){
        return zyfService.test();
    }
}
