package com.jk.dao;

import com.jk.model.BrandBean;
import com.jk.model.CarBean;
import com.jk.model.CityBean;
import com.jk.model.OrderBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface GjServerDao {

    @Select("select * from t_city")
    List<CityBean> findCity();

    @Select("select * from t_brand")
    List<BrandBean> findBrand();

    @Select("select * from t_orders order by orderTime desc limit 0,5")
    List<OrderBean> findNewOrder();

    @Select("SELECT * FROM T_CAR WHERE ID = #{value}")
    CarBean findCarById(int id);

    @Select("SELECT * FROM t_car ORDER BY fabudate DESC limit 0,5")
    List<CarBean> findNewCar();
}
