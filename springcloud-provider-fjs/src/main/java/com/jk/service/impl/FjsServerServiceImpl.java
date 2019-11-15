package com.jk.service.impl;

import com.jk.dao.FjsServerDao;
import com.jk.model.CarBean;
import com.jk.service.FjsServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;

@Service
public class FjsServerServiceImpl implements FjsServerService {

    @Autowired
    private FjsServerDao fjsServerDao;

    @Autowired
    private MongoTemplate mongoTemplate;


    @Override
    public HashMap<String, Object> findCar(Integer page ,Integer rows ,CarBean carBean) {
        HashMap<String, Object> map = new HashMap<String, Object>();

        Query query = new Query();

        //条查
        //品牌
        if (carBean.getBeandid() !=null && !"".equals(carBean.getBeandid())){
            query.addCriteria(Criteria.where("beandid").is(carBean.getBeandid()));
        }
        // 车系 名字
        if (carBean.getCarname() !=null && !"".equals(carBean.getCarname())){
            query.addCriteria(Criteria.where("carname").is(carBean.getCarname()));
        }

        //价格
        Criteria c = new Criteria();

        if(carBean.getStartPrice() != null){

            c = Criteria.where("price").gte(carBean.getStartPrice());
        }else{

            c = Criteria.where("price");
        }

        if(carBean.getEndPrice() != null){

            c.lte(carBean.getEndPrice());
        }

        if(carBean.getStartPrice() != null || carBean.getEndPrice() != null){

            query.addCriteria(c);
        }




        long count = mongoTemplate.count(query, CarBean.class);
        query.skip((page-1)*rows);

        query.limit(rows);

        List<CarBean> all = mongoTemplate.find(query,CarBean.class);

        map.put("total",count);
        map.put("rows",all);
        return map;
    }

}
