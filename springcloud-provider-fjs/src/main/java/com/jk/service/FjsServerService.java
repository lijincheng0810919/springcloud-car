package com.jk.service;

import com.jk.model.CarBean;

import java.util.HashMap;
import java.util.List;

public interface FjsServerService {


    HashMap<String, Object> findCar(Integer page, Integer rows, CarBean carBean);
}
