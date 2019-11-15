package com.jk.service;

import com.jk.model.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.List;

@FeignClient(value = "provider-zyf")
public interface ZyfService {

    @GetMapping("test")
    String test();

    @GetMapping("findCityList")
    List<BaseCityBean> findCityList(@RequestParam String provinceCode);

    @GetMapping("findProvinceList")
    List<ProvinceBean> findProvinceList();

    @GetMapping("findCountyList")
    List<CountyBean> findCountyList(@RequestParam String cityCode);

    @GetMapping("findBrandList")
    List<BrandBean> findBrandList();

    @GetMapping("findSeriesList")
    List<SeriesBean> findSeriesList(@RequestParam String brandCode);

    @GetMapping("findCarTypeList")
    List<CarTypeBean> findCarTypeList(@RequestParam String seriesCode);

    @GetMapping("gainCodeMsg")
    String gainCodeMsg(@RequestParam String phone);

    @GetMapping("quickLogin")
    String quickLogin(@RequestParam("phone") String phone, @RequestParam("code") String code);
}
