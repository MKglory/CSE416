package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "precinctsDemography") // Replace with your MongoDB collection name
public class PrecinctsDemography {

    @Id
    private String id; // MongoDB ObjectId as String

    @Field("STATEFP")
    private String stateFp;

    @Field("COUNTYFP")
    private String countyFp;

    @Field("COUNTY")
    private String county;

    @Field("PRECINCT")
    private String precinct;

    @Field("PrecinctID")
    private String precinctID;

    @Field("C_Total")
    private Double totalPopulation;

    @Field("C_White")
    private Double whitePopulation;

    @Field("C_Black or African American")
    private Double blackOrAfricanAmericanPopulation;

    @Field("C_American Indian and Alaska Native")
    private Double americanIndianAndAlaskaNativePopulation;

    @Field("C_Asian")
    private Double asianPopulation;

    @Field("C_Native Hawaiian and Other Pacific Islander")
    private Double nativeHawaiianAndOtherPacificIslanderPopulation;

    @Field("CD")
    private String congressionalDistrict;

    @Field("STATE")
    private String state;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStateFp() {
        return stateFp;
    }

    public void setStateFp(String stateFp) {
        this.stateFp = stateFp;
    }

    public String getCountyFp() {
        return countyFp;
    }

    public void setCountyFp(String countyFp) {
        this.countyFp = countyFp;
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

    public Double getTotalPopulation() {
        return totalPopulation;
    }

    public void setTotalPopulation(Double totalPopulation) {
        this.totalPopulation = totalPopulation;
    }

    public Double getWhitePopulation() {
        return whitePopulation;
    }

    public void setWhitePopulation(Double whitePopulation) {
        this.whitePopulation = whitePopulation;
    }

    public Double getBlackOrAfricanAmericanPopulation() {
        return blackOrAfricanAmericanPopulation;
    }

    public void setBlackOrAfricanAmericanPopulation(Double blackOrAfricanAmericanPopulation) {
        this.blackOrAfricanAmericanPopulation = blackOrAfricanAmericanPopulation;
    }

    public Double getAmericanIndianAndAlaskaNativePopulation() {
        return americanIndianAndAlaskaNativePopulation;
    }

    public void setAmericanIndianAndAlaskaNativePopulation(Double americanIndianAndAlaskaNativePopulation) {
        this.americanIndianAndAlaskaNativePopulation = americanIndianAndAlaskaNativePopulation;
    }

    public Double getAsianPopulation() {
        return asianPopulation;
    }

    public void setAsianPopulation(Double asianPopulation) {
        this.asianPopulation = asianPopulation;
    }

    public Double getNativeHawaiianAndOtherPacificIslanderPopulation() {
        return nativeHawaiianAndOtherPacificIslanderPopulation;
    }

    public void setNativeHawaiianAndOtherPacificIslanderPopulation(Double nativeHawaiianAndOtherPacificIslanderPopulation) {
        this.nativeHawaiianAndOtherPacificIslanderPopulation = nativeHawaiianAndOtherPacificIslanderPopulation;
    }

    public String getCongressionalDistrict() {
        return congressionalDistrict;
    }

    public void setCongressionalDistrict(String congressionalDistrict) {
        this.congressionalDistrict = congressionalDistrict;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
