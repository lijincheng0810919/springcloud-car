package com.jk.dao;

import com.jk.model.CarBean;
import com.jk.model.ZlyTreeBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ZlyServerDao {

    @Select("select * from t_car where id =#{value}")
    CarBean queryCarById(int id);

    @Select("select * from zly_tree where pid =#{value}")
    List<ZlyTreeBean> queryTree(int pid);
}
