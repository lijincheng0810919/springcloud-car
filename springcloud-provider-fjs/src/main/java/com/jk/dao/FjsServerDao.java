package com.jk.dao;

import com.jk.model.CarBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface FjsServerDao {

    void findCarBean(CarBean carBean);

    Integer findCarCount();

    List<CarBean> findCarList(@Param("start") Integer start, @Param("rows") Integer rows,@Param("carBean") CarBean carBean);
}
