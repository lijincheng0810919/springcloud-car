package com.jk.dao;

import com.jk.model.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ZyfServerDao {
    @Select("select * from base_city where provinceCode = #{provinceCode}")
    List<BaseCityBean> findCityList(String provinceCode);

    @Select("select * from base_province")
    List<ProvinceBean> findProvinceList();

    @Select("select * from base_area where cityCode = #{cityCode}")
    List<CountyBean> findCountyList(String cityCode);

    @Select("SELECT * FROM t_brand")
    List<BrandBean> findBrandList();

    @Select("SELECT * FROM car_series WHERE brandCode = #{brandCode}")
    List<SeriesBean> findSeriesList(String brandCode);

    @Select("SELECT * FROM car_type WHERE seriesCode = #{seriesCode}")
    List<CarTypeBean> findCarTypeList(String seriesCode);
}
