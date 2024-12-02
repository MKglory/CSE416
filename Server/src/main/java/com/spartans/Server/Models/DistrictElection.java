package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "districts_elections")
public class DistrictElection {

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

    @Field("Democratic_votes")
    private int democraticVotes;

    @Field("Republican_votes")
    private int republicanVotes;

    @Field("Percentage_vote_republican")
    private double percentageVoteRepublican;

    @Field("Percentage_vote_democracy")
    private double percentageVoteDemocracy;

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

    public int getDemocraticVotes() {
        return democraticVotes;
    }

    public void setDemocraticVotes(int democraticVotes) {
        this.democraticVotes = democraticVotes;
    }

    public int getRepublicanVotes() {
        return republicanVotes;
    }

    public void setRepublicanVotes(int republicanVotes) {
        this.republicanVotes = republicanVotes;
    }

    public double getPercentageVoteRepublican() {
        return percentageVoteRepublican;
    }

    public void setPercentageVoteRepublican(double percentageVoteRepublican) {
        this.percentageVoteRepublican = percentageVoteRepublican;
    }

    public double getPercentageVoteDemocracy() {
        return percentageVoteDemocracy;
    }

    public void setPercentageVoteDemocracy(double percentageVoteDemocracy) {
        this.percentageVoteDemocracy = percentageVoteDemocracy;
    }

    public int getCd() {
        return cd;
    }

    public void setCd(int cd) {
        this.cd = cd;
    }
}
