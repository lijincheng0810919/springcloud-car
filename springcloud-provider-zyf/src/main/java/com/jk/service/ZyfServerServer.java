package com.jk.service;

import com.jk.model.*;

import java.util.List;

public interface ZyfServerServer {
    String test();

    List<BaseCityBean> findCityList(String provinceCode);

    List<ProvinceBean> findProvinceList();

    List<CountyBean> findCountyList(String cityCode);

    List<BrandBean> findBrandList();

    List<SeriesBean> findSeriesList(String brandCode);

    List<CarTypeBean> findCarTypeList(String seriesCode);
}
