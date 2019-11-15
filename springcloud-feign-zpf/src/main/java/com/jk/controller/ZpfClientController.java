package com.jk.controller;

import com.jk.service.ZpfServie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("zpf")
public class ZpfClientController {

    @Autowired
    private ZpfServie zpfServie;

    @RequestMapping("test")
    @ResponseBody
    private String test(){
        return zpfServie.test();
    }
}
