package com.jk.service;

import com.jk.model.CarBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;

@FeignClient(value = "provider-fjs")
public interface FjsService {

    @GetMapping("car/findCarBean")
    HashMap<String, Object> findCarBean(@RequestParam("page") Integer page,@RequestParam("rows") Integer rows,@SpringQueryMap CarBean carBean);
}
