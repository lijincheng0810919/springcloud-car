package com.jk;

import com.jk.model.CarBean;
import com.jk.service.FjsServerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

@SpringBootTest
class SpringcloudProviderFjsApplicationTests {

    @Autowired
    private FjsServerService fjsServiceService;
    // 新增
    @Test
    void contextLoads() {

        CarBean carBean = new CarBean();

        carBean.setBeandid(1);
        carBean.setCarAge("15");
        carBean.setCarCityid(1);
        carBean.setCarname("流水");
        carBean.setCarTypeId(1);
        carBean.setColor("红色");
        carBean.setDisplacement("1");
        carBean.setEffluentStandard("2");
        carBean.setFabudate(new Date());
        carBean.setMileage("1");
        carBean.setPicture("1");
        carBean.setSeating("1");
        carBean.setStatus("1");

        fjsServiceService.findCarBean(carBean);
    }

}
