package com.jk.service.impl;

import com.jk.dao.ZyfServerDao;
import com.jk.model.*;
import com.jk.service.ZyfServerServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZyfServerImpl implements ZyfServerServer {

    @Autowired
    private ZyfServerDao zyfServerDao;


    @Override
    public String test() {
        return "success";
    }

    @Override
    public List<BaseCityBean> findCityList(String provinceCode) {
        return zyfServerDao.findCityList(provinceCode);
    }

    @Override
    public List<ProvinceBean> findProvinceList() {
        return zyfServerDao.findProvinceList();
    }

    @Override
    public List<CountyBean> findCountyList(String cityCode) {
        return zyfServerDao.findCountyList(cityCode);
    }

    @Override
    public List<BrandBean> findBrandList() {
        return zyfServerDao.findBrandList();
    }

    @Override
    public List<SeriesBean> findSeriesList(String brandCode) {
        return zyfServerDao.findSeriesList(brandCode);
    }

    @Override
    public List<CarTypeBean> findCarTypeList(String seriesCode) {
        return zyfServerDao.findCarTypeList(seriesCode);
    }
}
