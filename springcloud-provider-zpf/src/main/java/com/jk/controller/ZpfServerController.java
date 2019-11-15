package com.jk.controller;

import com.jk.service.ZpfServerService;
import com.jk.service.ZpfServie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ZpfServerController implements ZpfServie {

    @Autowired
    private ZpfServerService zpfServerService;

    public String test(){
        return zpfServerService.test();
    }

}
