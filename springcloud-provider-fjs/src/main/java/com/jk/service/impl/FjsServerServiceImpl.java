package com.jk.service.impl;

import com.jk.dao.FjsServerDao;
import com.jk.model.CarBean;
import com.jk.service.FjsServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class FjsServerServiceImpl implements FjsServerService {

    @Autowired
    private FjsServerDao fjsServerDao;

    @Autowired


    @Override
    public String test() {
        return "success";
    }

    @Override
    public void findCarBean(CarBean carBean) {
        fjsServerDao.findCarBean(carBean);
    }

    @Override
    public HashMap<String, Object> findCar(Integer page, Integer rows, CarBean carBean) {
        Integer total = fjsServerDao.findCarCount();
        Integer start = (page-1)*rows;
        List<CarBean> list = fjsServerDao.findCarList(start , rows ,carBean);
        HashMap<String, Object> map = new HashMap<>();
        map.put("total",total);
        map.put("rows",list);
        return map;
    }
}
