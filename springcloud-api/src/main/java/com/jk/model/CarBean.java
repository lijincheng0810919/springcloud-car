package com.jk.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @author 顺哥
 * @data 2019-11-12 17:02
 */
@Document(collection = "t_car")
public class CarBean {

    @Id
    private Integer id;
    private Integer beandid; // 品牌ID
    private String carname;  //车名称
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date fabudate; //发布时间
    private String mileage; //公里数
    private String color; //颜色
    private String carAge; //车龄
    private Integer carTypeId; //车辆类型id
    private String seating; //座位数
    private String displacement; //排量
    private String effluentStandard; //排放标准
    private Integer fuelTypeId; //燃油类型id
    private Integer carCityid; //车辆所在地id
    private Integer userid; //用户id
    private String picture; //图片
    private String status; // 1 待审核  2 审核通过  3
    private double price;//价格

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }
    private String carPrice;//汽车价格


    public String getCarPrice() {
        return carPrice;
    }

    public void setCarPrice(String carPrice) {
        this.carPrice = carPrice;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBeandid() {
        return beandid;
    }

    public void setBeandid(Integer beandid) {
        this.beandid = beandid;
    }

    public String getCarname() {
        return carname;
    }

    public void setCarname(String carname) {
        this.carname = carname;
    }

    public Date getFabudate() {
        return fabudate;
    }

    public void setFabudate(Date fabudate) {
        this.fabudate = fabudate;
    }

    public String getMileage() {
        return mileage;
    }

    public void setMileage(String mileage) {
        this.mileage = mileage;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getCarAge() {
        return carAge;
    }

    public void setCarAge(String carAge) {
        this.carAge = carAge;
    }

    public Integer getCarTypeId() {
        return carTypeId;
    }

    public void setCarTypeId(Integer carTypeId) {
        this.carTypeId = carTypeId;
    }

    public String getSeating() {
        return seating;
    }

    public void setSeating(String seating) {
        this.seating = seating;
    }

    public String getDisplacement() {
        return displacement;
    }

    public void setDisplacement(String displacement) {
        this.displacement = displacement;
    }

    public String getEffluentStandard() {
        return effluentStandard;
    }

    public void setEffluentStandard(String effluentStandard) {
        this.effluentStandard = effluentStandard;
    }

    public Integer getFuelTypeId() {
        return fuelTypeId;
    }

    public void setFuelTypeId(Integer fuelTypeId) {
        this.fuelTypeId = fuelTypeId;
    }

    public Integer getCarCityid() {
        return carCityid;
    }

    public void setCarCityid(Integer carCityid) {
        this.carCityid = carCityid;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
