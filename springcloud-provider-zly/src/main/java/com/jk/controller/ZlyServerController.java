package com.jk.controller;

import com.jk.model.CarBean;
import com.jk.model.ZlyTreeBean;
import com.jk.service.ZlyServerService;
import com.jk.service.ZlyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ZlyServerController  implements ZlyService {

    @Autowired
    private ZlyServerService zlyServerService;

    public String test(){
        return zlyServerService.test();
    }

    @Override
    public CarBean queryCarById(int id) {
        return zlyServerService.queryCarById(id);
    }

    @Override
    public List<ZlyTreeBean> queryTree() {
        return zlyServerService.queryTree();
    }

    @Override
    public Map queryCarBrowse(int userid, Integer page, Integer rows) {
        return zlyServerService.queryCarBrowse(userid,page,rows);
    }

}
