package com.jk.model;

public class OrderBean {

    private Integer id;

    private String buserName;//买家

    private String suserName;//卖家

    private Double price;//价钱

    private String orderTime;//交易时间

    private Integer orderStatus;//订单状态

    private String carName;//汽车名称

    private String carImg;//汽车图片

    private String carPrice;//汽车价格

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBuserName() {
        return buserName;
    }

    public void setBuserName(String buserName) {
        this.buserName = buserName;
    }

    public String getSuserName() {
        return suserName;
    }

    public void setSuserName(String suserName) {
        this.suserName = suserName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public Integer getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(Integer orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getCarName() {
        return carName;
    }

    public void setCarName(String carName) {
        this.carName = carName;
    }

    public String getCarImg() {
        return carImg;
    }

    public void setCarImg(String carImg) {
        this.carImg = carImg;
    }

    public String getCarPrice() {
        return carPrice;
    }

    public void setCarPrice(String carPrice) {
        this.carPrice = carPrice;
    }
}
