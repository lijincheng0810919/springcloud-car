package com.jk.controller;

import com.jk.model.CarBean;
import com.jk.service.FjsServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("car")
public class FjsServerController {

    @Autowired
    private FjsServerService fjsServerService;

    public String test(){
        return  fjsServerService.test();
    }

    @GetMapping("findCarBean")
    @ResponseBody
    public HashMap<String ,Object> findCarBean(Integer page , Integer rows , CarBean carBean){
        return fjsServerService.findCar(page,rows,carBean);
    }


}
