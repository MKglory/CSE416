package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "precincts_elections") // Update with your MongoDB collection name
public class PrecinctsElection {

    @Id
    private String id;

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

    @Field("Democratic_votes")
    private int democraticVotes;

    @Field("Republican_votes")
    private int republicanVotes;

    @Field("Percentage_vote_republican")
    private double percentageVoteRepublican;

    @Field("Percentage_vote_democracy")
    private double percentageVoteDemocracy;

    @Field("Republican_candidate")
    private String republicanCandidate;

    @Field("Democratic_candidate")
    private String democraticCandidate;

    @Field("Other_votes")
    private int otherVotes;

    @Field("Income_Mean")
    private int incomeMean;

    // Default Constructor
    public PrecinctsElection() {}

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

    public String getRepublicanCandidate() {
        return republicanCandidate;
    }

    public void setRepublicanCandidate(String republicanCandidate) {
        this.republicanCandidate = republicanCandidate;
    }

    public String getDemocraticCandidate() {
        return democraticCandidate;
    }

    public void setDemocraticCandidate(String democraticCandidate) {
        this.democraticCandidate = democraticCandidate;
    }

    public int getOtherVotes() {
        return otherVotes;
    }

    public void setOtherVotes(int otherVotes) {
        this.otherVotes = otherVotes;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCd() {
        return cd;
    }

    public void setCd(String cd) {
        this.cd = cd;
    }

    public int getIncomeMean() {
        return incomeMean;
    }

    public void setIncomeMean(int incomeMean) {
        this.incomeMean = incomeMean;
    }
}
