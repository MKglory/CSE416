package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "precincts_income") // Replace with your actual MongoDB collection name
public class PrecinctsIncome {

    @Id
    private String id; // The unique identifier, mapped from PrecinctID

    @Field("STATE")
    private String state;

    @Field("STATEFP")
    private String stateFP;

    @Field("COUNTYFP")
    private String countyFP;

    @Field("COUNTY")
    private String county;

    @Field("PRECINCT")
    private String precinct;

    @Field("PrecinctID")
    private String precinctID;

    @Field("CD")
    private String congressionalDistrict;

    @Field("BoundaryType")
    private String boundaryType;

    @Field("Region_Type")
    private String regionType;

    @Field("Income_Mean")
    private Double incomeMean;

    @Field("Income_Mean_normalized")
    private Double incomeMeanNormalized;

    // Default Constructor
    public PrecinctsIncome() {}

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStateFP() {
        return stateFP;
    }

    public void setStateFP(String stateFP) {
        this.stateFP = stateFP;
    }

    public String getCountyFP() {
        return countyFP;
    }

    public void setCountyFP(String countyFP) {
        this.countyFP = countyFP;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getPrecinct() {
        return precinct;
    }

    public void setPrecinct(String precinct) {
        this.precinct = precinct;
    }

    public String getPrecinctID() {
        return precinctID;
    }

    public void setPrecinctID(String precinctID) {
        this.precinctID = precinctID;
    }

    public String getCongressionalDistrict() {
        return congressionalDistrict;
    }

    public void setCongressionalDistrict(String congressionalDistrict) {
        this.congressionalDistrict = congressionalDistrict;
    }

    public String getBoundaryType() {
        return boundaryType;
    }

    public void setBoundaryType(String boundaryType) {
        this.boundaryType = boundaryType;
    }

    public String getRegionType() {
        return regionType;
    }

    public void setRegionType(String regionType) {
        this.regionType = regionType;
    }

    public Double getIncomeMean() {
        return incomeMean;
    }

    public void setIncomeMean(Double incomeMean) {
        this.incomeMean = incomeMean;
    }

    public Double getIncomeMeanNormalized() {
        return incomeMeanNormalized;
    }

    public void setIncomeMeanNormalized(Double incomeMeanNormalized) {
        this.incomeMeanNormalized = incomeMeanNormalized;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
