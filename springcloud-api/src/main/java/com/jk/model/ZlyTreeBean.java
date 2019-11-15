package com.jk.model;

import java.util.List;

/**
 * author:zly
 * create time:2019/11/13
 * email:
 * info:
 **/
public class ZlyTreeBean {
    private Integer id;
    private String text;
    private String path;
    private Integer pid;
    private List<ZlyTreeBean> nodes;
    private Boolean selectable;

    @Override
    public String toString() {
        return "ZlyTreeBean{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", path='" + path + '\'' +
                ", pid=" + pid +
                ", nodes=" + nodes +
                ", selectable=" + selectable +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public List<ZlyTreeBean> getNodes() {
        return nodes;
    }

    public void setNodes(List<ZlyTreeBean> nodes) {
        this.nodes = nodes;
    }

    public Boolean getSelectable() {
        return selectable;
    }

    public void setSelectable(Boolean selectable) {
        this.selectable = selectable;
    }
}
