package com.jk.controller;

import com.jk.service.FjsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("fjs")
public class FjsClientController {

    @Autowired
    private FjsService fjsService;

    @RequestMapping("test")
    @ResponseBody
    private String test(){
        return fjsService.test();
    }

}
