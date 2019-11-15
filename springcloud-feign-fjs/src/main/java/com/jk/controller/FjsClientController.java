package com.jk.controller;

import com.jk.model.CarBean;
import com.jk.service.FjsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
@RequestMapping("fjs")
public class FjsClientController {

    @Autowired
    private FjsService fjsService;

    @RequestMapping("findCarBean")
    @ResponseBody
    public HashMap<String,Object> findCarBean(Integer page, Integer rows , CarBean carBean){
        System.out.println(carBean.getCarname());
        return fjsService.findCarBean(page,rows,carBean);
    }

}
