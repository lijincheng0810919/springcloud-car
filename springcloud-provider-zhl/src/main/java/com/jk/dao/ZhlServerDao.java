package com.jk.dao;

import com.jk.model.BankCardBean;
import com.jk.model.UserBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ZhlServerDao {

    @Select("select * from t_user where username=#{username}")
    UserBean findUserByName(String username);

    @Select("select * from t_user where phone=#{phone}")
    UserBean findUserByPhone(String phone);

    void addUser(UserBean userBean);
    
    @Select("select id from t_bank where name=#{bankName}")
    Integer findBankId(String bankName);

    void addBank(BankCardBean bankCardBean);

    @Select("select max(id) from t_user")
    Integer findUserId();

    @Update("update t_user set password=#{password} where phone =#{phone}")
    void updatepass(@Param("password") String password, @Param("phone")String phone);
}
