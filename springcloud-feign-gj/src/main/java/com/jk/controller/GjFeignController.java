package com.jk.controller;

import com.jk.model.BrandBean;
import com.jk.model.CarBean;
import com.jk.model.CityBean;
import com.jk.model.OrderBean;
import com.jk.service.GjService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("gj")
public class GjFeignController {

    @Autowired
    private GjService gjService;

    /**
     * 测试
     * @return
     */
    @RequestMapping("test")
    @ResponseBody
    private String test(){
        return gjService.test();
    }

    /**
     * 查询城市
     * @return
     */
    @RequestMapping("findCity")
    @ResponseBody
    private List<CityBean> findCity(){
        return gjService.findCity();
    }

  /**
     * 查询品牌
     * @return
     */
    @RequestMapping("findBrand")
    @ResponseBody
    private List<BrandBean> findBrand(){
        return gjService.findBrand();
    }

    /**
     * 查询最新订单
     * @return
     */
    @RequestMapping("findNewOrder")
    @ResponseBody
    private List<OrderBean> findNewOrder(){

        return gjService.findNewOrder();
    }

    /**
     * 查询最新订单
     * @return
     */
    @RequestMapping("findCarById")
    @ResponseBody
    private CarBean findCarById(HttpSession session){
        Object carId = session.getAttribute("carId");
        //int id = (int) carId;
        int id1 = 1;
        return gjService.findCarById(id1);
    }

    /**
     * 查询最新上架车辆
     * @param session
     * @return
     */
    @RequestMapping("findNewCar")
    @ResponseBody
    private List<CarBean> findNewCar(){

        return gjService.findNewCar();
    }


}
