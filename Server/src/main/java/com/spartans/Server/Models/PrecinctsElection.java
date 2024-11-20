package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "precinctsElection") // Replace "precincts" with your MongoDB collection name
public class PrecinctsElection {

    @Id
    private String id; // The unique identifier, mapped from PrecinctID

    @Field("STATEFP")
    private String stateFP;

    @Field("STATE")
    private String state;

    @Field("COUNTYFP")
    private String countyFP;

    @Field("COUNTY")
    private String county;

    @Field("PRECINCT")
    private String precinct;

    @Field("Democratic_votes")
    private int democraticVotes;

    @Field("Republican_votes")
    private int republicanVotes;

    @Field("PrecinctID")
    private String precinctID;

    @Field("CD")
    private String congressionalDistrict;

    @Field("vote_share_democracy")
    private Double voteShareDemocracy;

    @Field("vote_share_republican")
    private Double voteShareRepublican;

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

    public String getState() {
        return state;
    }

    public void setState(String State) {
        this.state = State;
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

    public Double getVoteShareDemocracy() {
        return voteShareDemocracy;
    }

    public void setVoteShareDemocracy(Double voteShareDemocracy) {
        this.voteShareDemocracy = voteShareDemocracy;
    }

    public Double getVoteShareRepublican() {
        return voteShareRepublican;
    }

    public void setVoteShareRepublican(Double voteShareRepublican) {
        this.voteShareRepublican = voteShareRepublican;
    }
}
