package com.jk.service;

import com.jk.model.BrandBean;
import com.jk.model.CarBean;
import com.jk.model.CityBean;
import com.jk.model.OrderBean;

import java.util.List;

public interface GjServerService {
    String test();

    List<CityBean> findCity();

    List<BrandBean> findBrand();

    List<OrderBean> findNewOrder();

    CarBean findCarById(int id);

    List<CarBean> findNewCar();
}
