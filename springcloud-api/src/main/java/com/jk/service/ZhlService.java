package com.jk.service;

import com.jk.model.BankCardBean;
import com.jk.model.UserBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "provider-zhl")
public interface ZhlService {

    @GetMapping("test")
    String test();


    @GetMapping("findUserByName")
    UserBean findUserByName(@RequestParam("username") String username);

    @GetMapping("findUserByPhone")
    UserBean findUserByPhone(@RequestParam("phone") String phone);

    @PostMapping("addUser")
    void addUser(@RequestBody UserBean userBean);

    @GetMapping("findBankId")
    Integer findBankId(@RequestParam("bankName") String bankName);

    @PostMapping("addBank")
    void addBank(@RequestBody BankCardBean bankCardBean);

    @GetMapping("findUserId")
    Integer findUserId();

    @GetMapping("updatepass")
    void updatepass(@RequestParam("password") String password, @RequestParam("phone") String phone);


    /*    @GetMapping("user1/findUserList")
    Map findUserList(@RequestParam("page") Integer page, @RequestParam("rows") Integer rows, @SpringQueryMap UserBean userBean);

    @GetMapping("user1/delAll")
    void delAll(@RequestParam("id1") String id1);

    @GetMapping("user1/del")
    void del(@RequestParam("id") Integer id);

    //RequestMapping 传对象必须用SpringQueryMap   getmapping用SpringQueryMap   postmapping用RequestBody
    //                                                                        postmapping接对象用RequestBody
    @PostMapping("user1/addUser")
    void addUser(@SpringQueryMap UserBean userBean);

    @GetMapping("user1/update")
    UserBean update(@RequestParam("id") Integer id);*/
}
