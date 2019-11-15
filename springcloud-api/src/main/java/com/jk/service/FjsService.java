package com.jk.service;

import com.jk.model.CarBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(value = "provider-fjs")
public interface FjsService {

    @GetMapping("test")
    String test();

    void findCarBean(CarBean carBean);
}
