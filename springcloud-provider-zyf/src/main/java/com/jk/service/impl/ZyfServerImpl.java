package com.jk.service.impl;

import com.jk.dao.ZyfServerDao;
import com.jk.service.ZyfServerServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ZyfServerImpl implements ZyfServerServer {

    @Autowired
    private ZyfServerDao zyfServerDao;


    @Override
    public String test() {
        return "success";
    }
}
