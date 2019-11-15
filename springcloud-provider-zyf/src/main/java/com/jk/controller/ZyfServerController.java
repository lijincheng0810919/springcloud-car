package com.jk.controller;

import com.jk.service.ZyfServerServer;
import com.jk.service.ZyfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ZyfServerController implements ZyfService {

    @Autowired
    private ZyfServerServer zyfServerServer;

    public String test(){
        return zyfServerServer.test();
    }

}
