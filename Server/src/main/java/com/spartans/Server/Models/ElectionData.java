package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Map;

@Document(collection = "state_election")
public class ElectionData {
    @Id
    private String id;

    @Field("stateFP")
    private String stateFP;

    @Field("state") // Maps the MongoDB field "state" to this Java field
    private String state;

    @Field("total_districts")
    private String totalDistricts;

    @Field("democratic_seats")
    private String democraticSeats;

    @Field("democratic_percentage")
    private String democraticPercentage;

    @Field("republican_seats")
    private String republicanSeats;

    @Field("republican_percentage")
    private String republicanPercentage;

    @Field("districts") // Maps the MongoDB field "districts" to the Java field
    private Map<String, Object> districts;

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

    public void setState(String state) {
        this.state = state;
    }

    public String getTotalDistricts() {
        return totalDistricts;
    }

    public void setTotalDistricts(String totalDistricts) {
        this.totalDistricts = totalDistricts;
    }

    public String getDemocraticSeats() {
        return democraticSeats;
    }

    public void setDemocraticSeats(String democraticSeats) {
        this.democraticSeats = democraticSeats;
    }

    public String getDemocraticPercentage() {
        return democraticPercentage;
    }

    public void setDemocraticPercentage(String democraticPercentage) {
        this.democraticPercentage = democraticPercentage;
    }

    public String getRepublicanSeats() {
        return republicanSeats;
    }

    public void setRepublicanSeats(String republicanSeats) {
        this.republicanSeats = republicanSeats;
    }

    public String getRepublicanPercentage() {
        return republicanPercentage;
    }

    public void setRepublicanPercentage(String republicanPercentage) {
        this.republicanPercentage = republicanPercentage;
    }

    public Map<String, Object> getDistricts() {
        return districts;
    }

    public void setDistricts(Map<String, Object> districts) {
        this.districts = districts;
    }
}
