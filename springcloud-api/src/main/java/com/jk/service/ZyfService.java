package com.jk.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(value = "provider-zyf")
public interface ZyfService {

    @GetMapping("test")
    String test();
}
