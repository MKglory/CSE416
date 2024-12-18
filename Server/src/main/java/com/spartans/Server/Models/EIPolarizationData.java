package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;
import java.util.Map;

@Document(collection = "EI_polarization")
public class EIPolarizationData {
    @Id
    private String id;

    @Field("state")
    private String state;

    @Field("region_type")
    private String regionType;

    @Field("title")
    private String title;

    @Field("x_label")
    private String xLabel;

    @Field("y_label")
    private String yLabel;

    @Field("x_values")
    private List<Double> xValues;

    @Field("y_values")
    private List<Double> yValues;

    @Field("data")
    private Map<String, Object> data;

    @Field("show_threshold")
    private boolean showThreshold;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getRegionType() {
        return regionType;
    }

    public void setRegionType(String regionType) {
        this.regionType = regionType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getxLabel() {
        return xLabel;
    }

    public void setxLabel(String xLabel) {
        this.xLabel = xLabel;
    }

    public String getyLabel() {
        return yLabel;
    }

    public void setyLabel(String yLabel) {
        this.yLabel = yLabel;
    }

    public List<Double> getxValues() {
        return xValues;
    }

    public void setxValues(List<Double> xValues) {
        this.xValues = xValues;
    }

    public List<Double> getyValues() {
        return yValues;
    }

    public void setyValues(List<Double> yValues) {
        this.yValues = yValues;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public boolean isShowThreshold() {
        return showThreshold;
    }

    public void setShowThreshold(boolean showThreshold) {
        this.showThreshold = showThreshold;
    }
}
