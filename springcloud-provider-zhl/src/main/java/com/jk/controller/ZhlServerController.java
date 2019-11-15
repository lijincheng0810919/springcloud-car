package com.jk.controller;

import com.jk.model.BankCardBean;
import com.jk.model.UserBean;
import com.jk.service.ZhlServerService;
import com.jk.service.ZhlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ZhlServerController implements ZhlService {

    @Autowired
    private ZhlServerService zhlServerService;

    public String test(){
        return zhlServerService.test();
    }

    @Override
    public UserBean findUserByName(String username) {
        return zhlServerService.findUserByName(username);
    }

    @Override
    public UserBean findUserByPhone(String phone) {
        return zhlServerService.findUserByPhone(phone);
    }

    @Override
    public void addUser( UserBean userBean) {
        zhlServerService.addUser(userBean);
    }

    @Override
    public Integer findBankId(String bankName) {
        return zhlServerService.findBankId(bankName);
    }

    @Override
    public void addBank( BankCardBean bankCardBean) {
        zhlServerService.addBank(bankCardBean);
    }

    @Override
    public Integer findUserId() {
        return zhlServerService.findUserId();
    }

    @Override
    public void updatepass(String password, String phone) {
        zhlServerService.updatepass(password,phone);
    }
}
