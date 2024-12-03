package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Gingle_scatter")
public class GingleScatter {

    @Id
    private String id;

    @Field("state")
    private String state;

    @Field("dataType")
    private String dataType;

    @Field("region_type")
    private String regionType;

    @Field("x_scatter")
    private double xScatter;

    @Field("vote_share_democratic")
    private double voteShareDemocratic;

    @Field("vote_share_republican")
    private double voteShareRepublican;

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

    public double getxScatter() {
        return xScatter;
    }

    public void setxScatter(double xScatter) {
        this.xScatter = xScatter;
    }

    public double getVoteShareDemocratic() {
        return voteShareDemocratic;
    }

    public void setVoteShareDemocratic(double voteShareDemocratic) {
        this.voteShareDemocratic = voteShareDemocratic;
    }

    public double getVoteShareRepublican() {
        return voteShareRepublican;
    }

    public void setVoteShareRepublican(double voteShareRepublican) {
        this.voteShareRepublican = voteShareRepublican;
    }
}
