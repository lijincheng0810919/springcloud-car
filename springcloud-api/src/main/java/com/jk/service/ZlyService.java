package com.jk.service;

import com.jk.model.CarBean;
import com.jk.model.ZlyTreeBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@FeignClient(value = "provider-zly")
public interface ZlyService {

    @GetMapping("test")
    String test();

    @GetMapping("zly/queryCarById")
    CarBean queryCarById(int id);

    @GetMapping("zly/queryTree")
    List<ZlyTreeBean> queryTree();

    @GetMapping("zly/queryCarBrowse")
    Map queryCarBrowse(int userid,Integer page,Integer rows);
}
