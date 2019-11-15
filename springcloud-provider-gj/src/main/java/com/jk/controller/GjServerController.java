package com.jk.controller;

import com.jk.model.BrandBean;
import com.jk.model.CarBean;
import com.jk.model.CityBean;
import com.jk.model.OrderBean;
import com.jk.service.GjServerService;
import com.jk.service.GjService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GjServerController implements GjService {

    @Autowired
    private GjServerService gjServerService;

    @Override
    public String test() {
        return gjServerService.test();
    }

    @Override
    public List<CityBean> findCity() {
        return gjServerService.findCity();
    }

    @Override
    public List<BrandBean> findBrand() {
        return gjServerService.findBrand();
    }

    @Override
    public List<OrderBean> findNewOrder() {
        return gjServerService.findNewOrder();
    }

    @Override
    public CarBean findCarById(int id) {
        return gjServerService.findCarById(id);
    }

    @Override
    public List<CarBean> findNewCar() {
        return gjServerService.findNewCar();
    }
}
