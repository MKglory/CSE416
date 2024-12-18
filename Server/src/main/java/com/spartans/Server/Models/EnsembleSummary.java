package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "ensemble_summary")
public class EnsembleSummary {
    @Id
    private String id;

    private String state;

    @Field("number_of_plans")
    private int numberOfPlans;

    @Field("average_income_deviation")
    private double averageIncomeDeviation;

    @Field("std_income_deviation")
    private double stdIncomeDeviation;

    @Field("average_dem_districts")
    private double averageDemDistricts;

    @Field("std_dem_districts")
    private double stdDemDistricts;

    @Field("average_rep_districts")
    private double averageRepDistricts;

    @Field("std_rep_districts")
    private double stdRepDistricts;

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

    public int getNumberOfPlans() {
        return numberOfPlans;
    }

    public void setNumberOfPlans(int numberOfPlans) {
        this.numberOfPlans = numberOfPlans;
    }

    public double getAverageIncomeDeviation() {
        return averageIncomeDeviation;
    }

    public void setAverageIncomeDeviation(double averageIncomeDeviation) {
        this.averageIncomeDeviation = averageIncomeDeviation;
    }

    public double getStdIncomeDeviation() {
        return stdIncomeDeviation;
    }

    public void setStdIncomeDeviation(double stdIncomeDeviation) {
        this.stdIncomeDeviation = stdIncomeDeviation;
    }

    public double getAverageDemDistricts() {
        return averageDemDistricts;
    }

    public void setAverageDemDistricts(double averageDemDistricts) {
        this.averageDemDistricts = averageDemDistricts;
    }

    public double getStdDemDistricts() {
        return stdDemDistricts;
    }

    public void setStdDemDistricts(double stdDemDistricts) {
        this.stdDemDistricts = stdDemDistricts;
    }

    public double getAverageRepDistricts() {
        return averageRepDistricts;
    }

    public void setAverageRepDistricts(double averageRepDistricts) {
        this.averageRepDistricts = averageRepDistricts;
    }

    public double getStdRepDistricts() {
        return stdRepDistricts;
    }

    public void setStdRepDistricts(double stdRepDistricts) {
        this.stdRepDistricts = stdRepDistricts;
    }
}
