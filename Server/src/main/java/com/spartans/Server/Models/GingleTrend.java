package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Gingle_trend")
public class GingleTrend {

    @Id
    private String id;

    @Field("state")
    private String state;

    @Field("dataType")
    private String dataType;

    @Field("region_type")
    private String regionType;

    @Field("x_smooth")
    private double xSmooth;

    @Field("Democratic_Trend")
    private double democraticTrend;

    @Field("Republican_Trend")
    private double republicanTrend;

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

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public String getRegionType() {
        return regionType;
    }

    public void setRegionType(String regionType) {
        this.regionType = regionType;
    }

    public double getxSmooth() {
        return xSmooth;
    }

    public void setxSmooth(double xSmooth) {
        this.xSmooth = xSmooth;
    }

    public double getDemocraticTrend() {
        return democraticTrend;
    }

    public void setDemocraticTrend(double democraticTrend) {
        this.democraticTrend = democraticTrend;
    }

    public double getRepublicanTrend() {
        return republicanTrend;
    }

    public void setRepublicanTrend(double republicanTrend) {
        this.republicanTrend = republicanTrend;
    }
}
