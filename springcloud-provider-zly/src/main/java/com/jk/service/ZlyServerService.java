package com.jk.service;

import com.jk.model.CarBean;
import com.jk.model.ZlyTreeBean;

import java.util.List;
import java.util.Map;

public interface ZlyServerService {
    String test();

    CarBean queryCarById(int id);

    List<ZlyTreeBean> queryTree();

    Map queryCarBrowse(int userid, Integer page, Integer rows);
}
