package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "box_whisker_partitions")
public class BoxWhisker_partitions {

    @Id
    private String id;

    @Field("STATE")
    private String state;

    @Field("population_White")
    private Object populationWhite;

    @Field("population_Black")
    private Object populationBlack;

    @Field("population_Indian")
    private Object populationIndian;

    @Field("population_Asian")
    private Object populationAsian;

    @Field("population_Hispanic")
    private Object populationHispanic;

    @Field("average_income")
    private Object averageIncome;


    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Object getPopulationWhite() {
        return populationWhite;
    }

    public void setPopulationWhite(Object populationWhite) {
        this.populationWhite = populationWhite;
    }

    public Object getPopulationBlack() {
        return populationBlack;
    }

    public void setPopulationBlack(Object populationBlack) {
        this.populationBlack = populationBlack;
    }

    public Object getPopulationIndian() {
        return populationIndian;
    }

    public void setPopulationIndian(Object populationIndian) {
        this.populationIndian = populationIndian;
    }

    public Object getPopulationAsian() {
        return populationAsian;
    }

    public void setPopulationAsian(Object populationAsian) {
        this.populationAsian = populationAsian;
    }

    public Object getPopulationHispanic() {
        return populationHispanic;
    }

    public void setPopulationHispanic(Object populationHispanic) {
        this.populationHispanic = populationHispanic;
    }

    public Object getAverageIncome() {
        return averageIncome;
    }

    public void setAverageIncome(Object averageIncome) {
        this.averageIncome = averageIncome;
    }
}
