package com.jk.service;

import com.jk.model.BankCardBean;
import com.jk.model.UserBean;

public interface ZhlServerService {
    String test();

    UserBean findUserByName(String username);

    UserBean findUserByPhone(String phone);

    void addUser(UserBean userBean);

    Integer findBankId(String bankName);

    void addBank(BankCardBean bankCardBean);

    Integer findUserId();

    void updatepass(String password, String phone);
}
