package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "districts_demography")
public class DistrictDemography {

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
    private int congressionalDistrict;

    @Field("BoundaryType")
    private String boundaryType;

    @Field("White")
    private int whitePopulation;

    @Field("Black")
    private int blackPopulation;

    @Field("American_Indian")
    private int americanIndianPopulation;

    @Field("Asian")
    private int asianPopulation;

    @Field("Hispanic")
    private int hispanicPopulation;

    @Field("Total")
    private int totalPopulation;

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

    public int getCongressionalDistrict() {
        return congressionalDistrict;
    }

    public void setCongressionalDistrict(int congressionalDistrict) {
        this.congressionalDistrict = congressionalDistrict;
    }

    public String getBoundaryType() {
        return boundaryType;
    }

    public void setBoundaryType(String boundaryType) {
        this.boundaryType = boundaryType;
    }

    public int getWhitePopulation() {
        return whitePopulation;
    }

    public void setWhitePopulation(int whitePopulation) {
        this.whitePopulation = whitePopulation;
    }

    public int getBlackPopulation() {
        return blackPopulation;
    }

    public void setBlackPopulation(int blackPopulation) {
        this.blackPopulation = blackPopulation;
    }

    public int getAmericanIndianPopulation() {
        return americanIndianPopulation;
    }

    public void setAmericanIndianPopulation(int americanIndianPopulation) {
        this.americanIndianPopulation = americanIndianPopulation;
    }

    public int getAsianPopulation() {
        return asianPopulation;
    }

    public void setAsianPopulation(int asianPopulation) {
        this.asianPopulation = asianPopulation;
    }

    public int getHispanicPopulation() {
        return hispanicPopulation;
    }

    public void setHispanicPopulation(int hispanicPopulation) {
        this.hispanicPopulation = hispanicPopulation;
    }

    public int getTotalPopulation() {
        return totalPopulation;
    }

    public void setTotalPopulation(int totalPopulation) {
        this.totalPopulation = totalPopulation;
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
}
