package com.jk.service.impl;

import com.jk.dao.ZpfServerDao;
import com.jk.service.ZpfServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ZpfServerServiceImpl implements ZpfServerService {


    @Autowired
    private ZpfServerDao zpfServerDao;

    @Override
    public String test() {
        return "success";
    }
}
