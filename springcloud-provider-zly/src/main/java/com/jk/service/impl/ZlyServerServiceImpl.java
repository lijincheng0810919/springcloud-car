package com.jk.service.impl;

import com.jk.dao.ZlyServerDao;
import com.jk.model.CarBean;
import com.jk.model.ZlyTreeBean;
import com.jk.service.ZlyServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ZlyServerServiceImpl implements ZlyServerService {

    @Autowired
    private ZlyServerDao zlyServerDao;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public String test() {
        return "success";
    }

    @Override
    public CarBean queryCarById(int id) {
        return zlyServerDao.queryCarById(id);
    }

    //查询质检报告树
    @Override
    public List<ZlyTreeBean> queryTree() {
        int pid =-1;

        return findnodes(pid);
    }

    @Override
    public Map queryCarBrowse(int userid, Integer page, Integer rows) {
        HashMap<String, Object> result = new HashMap<>();
        Query query = new Query();
        query.addCriteria(Criteria.where("userid").is(userid));
        //查询count
        long count = mongoTemplate.count(query, CarBean.class);
        result.put("total", count);
        //设置分页
        query.skip((page-1)*rows);
        query.limit(rows);
        /*query.with(new Sort(Direction.DESC, "createTime"));*/
        //查询list
        List<CarBean> find = mongoTemplate.find(query, CarBean.class);
        result.put("rows", find);
       return result;
    }

    private List<ZlyTreeBean> findnodes(int pid) {
        List<ZlyTreeBean> list=zlyServerDao.queryTree(pid);
        for (ZlyTreeBean tree : list) {
            Integer id = tree.getId();
            List<ZlyTreeBean> findnodes = findnodes(id);
            if (findnodes==null || findnodes.size()<=0) {
                tree.setSelectable(true);
            }else{
                tree.setNodes(findnodes);
            }

        }
        return list;
    }


}
