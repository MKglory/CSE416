package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "districts_demography") // Update this to match your MongoDB collection name
public class DistrictDemography {

    @Id
    private String id; // MongoDB's unique identifier (_id)

    @Field("GEOID20")
    private String geoId;

    @Field("NAME")
    private String name;

    @Field("STATE")
    private String state;

    @Field("DIST")
    private String district;

    @Field("STATEFP")
    private int stateFP;

    @Field("CD")
    private int cd;

    @Field("BoundaryType")
    private String boundaryType;

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

    // New fields for normalized values
    @Field("White_normalized")
    private double whiteNormalized;

    @Field("Black_normalized")
    private double blackNormalized;

    @Field("American_Indian_normalized")
    private double americanIndianNormalized;

    @Field("Asian_normalized")
    private double asianNormalized;

    @Field("Hispanic_normalized")
    private double hispanicNormalized;

    @Field("Rural_Pop")
    private Long ruralPopulation;

    @Field("Suburban_Pop")
    private Long suburbanPopulation;

    @Field("Urban_Pop")
    private Long urbanPopulation;
    // Default Constructor
    public DistrictDemography() {}

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGeoId() {
        return geoId;
    }

    public void setGeoId(String geoId) {
        this.geoId = geoId;
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

    public int getStateFP() {
        return stateFP;
    }

    public void setStateFP(int stateFP) {
        this.stateFP = stateFP;
    }

    public int getCd() {
        return cd;
    }

    public void setCd(int cd) {
        this.cd = cd;
    }

    public String getBoundaryType() {
        return boundaryType;
    }

    public void setBoundaryType(String boundaryType) {
        this.boundaryType = boundaryType;
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

    public double getWhiteNormalized() {
        return whiteNormalized;
    }

    public void setWhiteNormalized(double whiteNormalized) {
        this.whiteNormalized = whiteNormalized;
    }

    public double getBlackNormalized() {
        return blackNormalized;
    }

    public void setBlackNormalized(double blackNormalized) {
        this.blackNormalized = blackNormalized;
    }

    public double getAmericanIndianNormalized() {
        return americanIndianNormalized;
    }

    public void setAmericanIndianNormalized(double americanIndianNormalized) {
        this.americanIndianNormalized = americanIndianNormalized;
    }

    public double getAsianNormalized() {
        return asianNormalized;
    }

    public void setAsianNormalized(double asianNormalized) {
        this.asianNormalized = asianNormalized;
    }

    public double getHispanicNormalized() {
        return hispanicNormalized;
    }

    public void setHispanicNormalized(double hispanicNormalized) {
        this.hispanicNormalized = hispanicNormalized;
    }

    public Long getRuralPopulation() {
        return ruralPopulation;
    }

    public Long getSuburbanPopulation() {
        return suburbanPopulation;
    }

    public Long getUrbanPopulation() {
        return urbanPopulation;
    }

    public void setRuralPopulation(Long ruralPopulation) {
        this.ruralPopulation = ruralPopulation;
    }

    public void setSuburbanPopulation(Long suburbanPopulation) {
        this.suburbanPopulation = suburbanPopulation;
    }

    public void setUrbanPopulation(Long urbanPopulation) {
        this.urbanPopulation = urbanPopulation;
    }
}
