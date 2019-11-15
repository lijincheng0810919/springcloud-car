package com.jk.controller;

import com.jk.model.*;
import com.jk.service.ZyfService;
import com.jk.utils.OSSClientUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("zyf")
public class ZyfClientController {

    @Autowired
    private ZyfService zyfService;

    @RequestMapping("test")
    @ResponseBody
    public String test(){
        return zyfService.test();
    }

    /**
     * 市
     * @param provinceCode
     * @return
     */
    @RequestMapping("findCityList")
    @ResponseBody
    public List<BaseCityBean> findCityList(String provinceCode){
        List<BaseCityBean> cityList = zyfService.findCityList(provinceCode);
        return cityList;
    }

    /**
     * 省
     * @return
     */
    @RequestMapping("findProvinceList")
    @ResponseBody
    public List<ProvinceBean> findProvinceList(){

        return zyfService.findProvinceList();
    }

    /**
     * 区/县
     * @param cityCode
     * @return
     */
    @RequestMapping("findCountyList")
    @ResponseBody
    public List<CountyBean> findCountyList(String cityCode){

        return zyfService.findCountyList(cityCode);
    }

    /**
     * 车系
     * @param brandCode
     * @return
     */
    @RequestMapping("findSeriesList")
    @ResponseBody
    public List<SeriesBean> findSeriesList(String brandCode){
        return zyfService.findSeriesList(brandCode);
    }

    /**
     * 品牌
     * @return
     */
    @RequestMapping("findBrandList")
    @ResponseBody
    public List<BrandBean> findBrandList(){

        return zyfService.findBrandList();
    }

    /**
     * 车型
     * @param seriesCode
     * @return
     */
    @RequestMapping("findCarTypeList")
    @ResponseBody
    public List<CarTypeBean> findCarTypeList(String seriesCode){

        return zyfService.findCarTypeList(seriesCode);
    }

    /**
     * 获取短信
     * @param phone
     * @return
     */
    @RequestMapping("gainCodeMsg")
    @ResponseBody
    public String gainCodeMsg(String phone){

        return zyfService.gainCodeMsg(phone);
    }

    /**
     * 如果有快捷登录的话调用
     * @param phone
     * @param code
     * @return
     */
    @RequestMapping("quickLogin")
    @ResponseBody
    public String quickLogin(String phone, String code){

        return zyfService.quickLogin(phone,code);
    }

    /**
     * 估价
     */
    @RequestMapping("evaluate")
    @ResponseBody
    public void evaluate(){

    }

    /**
     * oss上传图片
     * @param imgfile
     * @param request
     * @return
     * @throws IOException
     */
    @RequestMapping("uploadimg")
    @ResponseBody
    public Map upload(MultipartFile imgfile, HttpServletRequest request) throws IOException {
        OSSClientUtil ossClient = new OSSClientUtil();
        String name = ossClient.uploadImg2Oss(imgfile);
        String fileUpload = ossClient.getImgUrl(name);
        HashMap<String, Object> result = new HashMap<>();
        result.put("img", fileUpload);
        return result;
    }

    /*@RequestMapping("toSellcar")
    public String findSellCar(Model model){
        //查询城市
        List<CityBean> cityList = zyfService.findCityList();
        model.addAttribute("cityList",cityList);


        return "sellcar";
    }*/
}
