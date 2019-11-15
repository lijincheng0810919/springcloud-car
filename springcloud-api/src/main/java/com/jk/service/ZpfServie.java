package com.jk.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(value = "provider-zpf")
public interface ZpfServie {

    @GetMapping("test")
    String test();
}
