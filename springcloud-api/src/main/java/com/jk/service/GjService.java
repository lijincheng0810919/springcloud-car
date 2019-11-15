package com.jk.service;

import com.jk.model.BrandBean;
import com.jk.model.CarBean;
import com.jk.model.CityBean;
import com.jk.model.OrderBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(value = "provider-gj")
public interface GjService {

    @RequestMapping("/test")
    String test();

    @RequestMapping("findCity")
    List<CityBean> findCity();

    @RequestMapping("findBrand")
    List<BrandBean> findBrand();

    @RequestMapping("findNewOrder")
    List<OrderBean> findNewOrder();

    @RequestMapping("findCarById")
    CarBean findCarById(@RequestParam("id") int id);

    @RequestMapping("findNewCar")
    List<CarBean> findNewCar();
}
