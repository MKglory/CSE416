package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "districts_income")
public class DistrictIncome {

    @Id
    private String id;

    @Field("GEOID20")
    private String geoId20;

    @Field("NAME")
    private String name;

    @Field("STATE")
    private String state;

    @Field("DIST")
    private String district;

    @Field("STATEFP")
    private int stateFp;

    @Field("CD")
    private int cd;

    @Field("BoundaryType")
    private String boundaryType;

    @Field("Income_Mean")
    private double incomeMean;

    @Field("LESS_30K")
    private int povertyHouseholds;

    @Field("LESS_30K_Percent")
    private double povertyPercentage;

    @Field("30K_75K")
    private int from_30K_75K;

    @Field("75K_150K")
    private int from_75K_150K;

    @Field("150K_MORE")
    private int more_150K;

    // Default Constructor
    public DistrictIncome() {}

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGeoId20() {
        return geoId20;
    }

    public void setGeoId20(String geoId20) {
        this.geoId20 = geoId20;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public int getStateFp() {
        return stateFp;
    }

    public void setStateFp(int stateFp) {
        this.stateFp = stateFp;
    }

    public String getBoundaryType() {
        return boundaryType;
    }

    public void setBoundaryType(String boundaryType) {
        this.boundaryType = boundaryType;
    }

    public double getIncomeMean() {
        return incomeMean;
    }

    public void setIncomeMean(double incomeMean) {
        this.incomeMean = incomeMean;
    }

    public int getCd() {
        return cd;
    }

    public void setCd(int cd) {
        this.cd = cd;
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

    public int getFrom_30K_75K() {
        return from_30K_75K;
    }

    public void setFrom_30K_75K(int from_30K_75K) {
        this.from_30K_75K = from_30K_75K;
    }

    public int getFrom_75K_150K() {
        return from_75K_150K;
    }

    public void setFrom_75K_150K(int from_75K_150K) {
        this.from_75K_150K = from_75K_150K;
    }

    public int getMore_150K() {
        return more_150K;
    }

    public void setMore_150K(int more_150K) {
        this.more_150K = more_150K;
    }
}
