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
    private String cd;

    @Field("BoundaryType")
    private String boundaryType;

    @Field("Region_Type")
    private String regionType;

    @Field("Income_Mean")
    private Double incomeMean;

    @Field("LESS_30K")
    private int povertyHouseholds;

    @Field("LESS_30K_Percent")
    private double povertyPercentage;

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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getPovertyHouseholds() {
        return povertyHouseholds;
    }

    public void setPovertyHouseholds(int povertyHouseholds) {
        this.povertyHouseholds = povertyHouseholds;
    }

    public double getPovertyPercentage() {
        return povertyPercentage;
    }

    public void setPovertyPercentage(double povertyPercentage) {
        this.povertyPercentage = povertyPercentage;
    }

    public String getCd() {
        return cd;
    }

    public void setCd(String cd) {
        this.cd = cd;
    }
}
