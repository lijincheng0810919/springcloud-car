package com.jk.controller;

import com.jk.model.CarBean;
import com.jk.model.ZlyTreeBean;
import com.jk.service.ZhlService;
import com.jk.service.ZlyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("zly")
public class ZlyClientController{

    @Autowired
    private ZlyService zlyService;

    @RequestMapping("test")
    @ResponseBody
    public String test(){
        return zlyService.test();
    }

    @RequestMapping("queryCarById")
    @ResponseBody
    public CarBean queryCarById(HttpSession session) {
        Object id = session.getAttribute("carId");
        Integer carId = (Integer) id;
        int id1 =1;
        return zlyService.queryCarById(id1);
    }

    /**
     * 查询树
     * @return
     */
    @RequestMapping("queryTree")
    @ResponseBody
    public List<ZlyTreeBean> queryTree(){
        List<ZlyTreeBean> list= zlyService.queryTree();
        return list;
    }

     /**
     * 查询浏览记录
     * @return
     */
    @RequestMapping("queryCarBrowse")
    @ResponseBody
    public Map queryCarBrowse(Integer page,Integer rows){
           int userid=1;
        return zlyService.queryCarBrowse(userid,page,rows);
    }


}
