package com.jk.service.impl;

import com.jk.dao.ZhlServerDao;
import com.jk.model.BankCardBean;
import com.jk.model.UserBean;
import com.jk.service.ZhlServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ZhlServerServiceImpl implements ZhlServerService {

    @Autowired
    private ZhlServerDao zhlServerDao;


    @Override
    public String test() {
        return "success";
    }

    @Override
    public UserBean findUserByName(String username) {
        return zhlServerDao.findUserByName(username);
    }

    @Override
    public UserBean findUserByPhone(String phone) {
        return zhlServerDao.findUserByPhone(phone);
    }

    @Override
    public void addUser(UserBean userBean) {
        zhlServerDao.addUser(userBean);
    }

    @Override
    public Integer findBankId(String bankName) {
        return zhlServerDao.findBankId(bankName);
    }

    @Override
    public void addBank(BankCardBean bankCardBean) {
        zhlServerDao.addBank(bankCardBean);
    }

    @Override
    public Integer findUserId() {
        return zhlServerDao.findUserId();
    }

    @Override
    public void updatepass(String password, String phone) {
        zhlServerDao.updatepass(password,phone);
    }
}
