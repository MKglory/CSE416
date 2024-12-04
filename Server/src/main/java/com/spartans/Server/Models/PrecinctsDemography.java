package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "precincts_demography") // Update with your MongoDB collection name
public class PrecinctsDemography {

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

    @Field("White")
    private int white;

    @Field("Black")
    private int black;

    @Field("American_Indian")
    private int americanIndian;

    @Field("Asian")
    private int asian;

    @Field("Hispanic")
    private int hispanic;

    @Field("Total")
    private int total;

    @Field("Percent_White")
    private double percentWhite;

    @Field("Percent_Black")
    private double percentBlack;

    @Field("Percent_Asian")
    private double percentAsian;

    @Field("Percent_American_Indian")
    private double percentAmericanIndian;

    @Field("Percent_Hispanic")
    private double percentHispanic;

    @Field("Prominent_Race")
    private String prominentRace;

    @Field("Percentage_Prominent_Race")
    private double percentageProminentRace;

    public PrecinctsDemography() {}

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

    public int getWhite() {
        return white;
    }

    public void setWhite(int white) {
        this.white = white;
    }

    public int getBlack() {
        return black;
    }

    public void setBlack(int black) {
        this.black = black;
    }

    public int getAmericanIndian() {
        return americanIndian;
    }

    public void setAmericanIndian(int americanIndian) {
        this.americanIndian = americanIndian;
    }

    public int getAsian() {
        return asian;
    }

    public void setAsian(int asian) {
        this.asian = asian;
    }

    public int getHispanic() {
        return hispanic;
    }

    public void setHispanic(int hispanic) {
        this.hispanic = hispanic;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public double getPercentWhite() {
        return percentWhite;
    }

    public void setPercentWhite(double percentWhite) {
        this.percentWhite = percentWhite;
    }

    public double getPercentBlack() {
        return percentBlack;
    }

    public void setPercentBlack(double percentBlack) {
        this.percentBlack = percentBlack;
    }

    public double getPercentAsian() {
        return percentAsian;
    }

    public void setPercentAsian(double percentAsian) {
        this.percentAsian = percentAsian;
    }

    public double getPercentAmericanIndian() {
        return percentAmericanIndian;
    }

    public void setPercentAmericanIndian(double percentAmericanIndian) {
        this.percentAmericanIndian = percentAmericanIndian;
    }

    public double getPercentHispanic() {
        return percentHispanic;
    }

    public void setPercentHispanic(double percentHispanic) {
        this.percentHispanic = percentHispanic;
    }

    public String getProminentRace() {
        return prominentRace;
    }

    public void setProminentRace(String prominentRace) {
        this.prominentRace = prominentRace;
    }

    public double getPercentageProminentRace() {
        return percentageProminentRace;
    }

    public void setPercentageProminentRace(double percentageProminentRace) {
        this.percentageProminentRace = percentageProminentRace;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
