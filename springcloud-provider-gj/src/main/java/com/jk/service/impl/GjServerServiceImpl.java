package com.jk.service.impl;

import com.jk.dao.GjServerDao;
import com.jk.model.BrandBean;
import com.jk.model.CarBean;
import com.jk.model.CityBean;
import com.jk.model.OrderBean;
import com.jk.service.GjServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.List;

@Service
public class GjServerServiceImpl implements GjServerService {

    @Autowired
    private GjServerDao gjServerDao;

    @Override
    public String test() {
        return "success";
    }

    @Override
    public List<CityBean> findCity() {
        return gjServerDao.findCity();
    }

    @Override
    public List<BrandBean> findBrand() {
        return gjServerDao.findBrand();
    }

    @Override
    public List<OrderBean> findNewOrder() {
        List<OrderBean> newOrder = gjServerDao.findNewOrder();
        for (int i = 0; i < newOrder.size(); i++) {
            OrderBean orderBean = newOrder.get(i);
            double price = orderBean.getPrice();
            price = price /10000;
            /*String s = Double.toString(val);
            String substring = s.substring(0,s.lastIndexOf(".")+3);*/

            orderBean.setCarPrice(price+"万");

            String orderTime = orderBean.getOrderTime();
            String time = orderTime.substring(0, orderTime.lastIndexOf("."));
            orderBean.setOrderTime(time);
        }

        return newOrder;
    }

    @Override
    public CarBean findCarById(int id) {
        CarBean carBean = gjServerDao.findCarById(id);
        double price = carBean.getPrice();
        price = price /10000;
        carBean.setCarPrice(Double.toString(price));
        return carBean;
    }

    @Override
    public List<CarBean> findNewCar() {
        return gjServerDao.findNewCar();
    }

}
