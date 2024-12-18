package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "EI_analysis")
public class EIAnalysisData {
    @Id
    private String id;

    @Field("state")
    private String state;

    @Field("region_type")
    private String regionType;

    @Field("group1_name")
    private String group1Name;

    @Field("group2_name")
    private String group2Name;

    @Field("candidate_name")
    private String candidateName;

    @Field("x_values")
    private List<Double> xValues;

    @Field("kde1_values")
    private List<Double> kde1Values;

    @Field("kde2_values")
    private List<Double> kde2Values;

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

    public String getGroup1Name() {
        return group1Name;
    }

    public void setGroup1Name(String group1Name) {
        this.group1Name = group1Name;
    }

    public String getGroup2Name() {
        return group2Name;
    }

    public void setGroup2Name(String group2Name) {
        this.group2Name = group2Name;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public List<Double> getxValues() {
        return xValues;
    }

    public void setxValues(List<Double> xValues) {
        this.xValues = xValues;
    }

    public List<Double> getKde1Values() {
        return kde1Values;
    }

    public void setKde1Values(List<Double> kde1Values) {
        this.kde1Values = kde1Values;
    }

    public List<Double> getKde2Values() {
        return kde2Values;
    }

    public void setKde2Values(List<Double> kde2Values) {
        this.kde2Values = kde2Values;
    }
}
