package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "ensemble_summary")
public class EnsembleSummary {
    @Id
    private String id;

    @Field("STATE")
    private String state;

    @Field("tolerant")
    private String tolerant;

    @Field("ideal_population")
    private String idealPopulation;

    @Field("total_plans")
    private String totalPlans;

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

    public String getTolerant() {
        return tolerant;
    }

    public void setTolerant(String tolerant) {
        this.tolerant = tolerant;
    }

    public String getIdealPopulation() {
        return idealPopulation;
    }

    public void setIdealPopulation(String idealPopulation) {
        this.idealPopulation = idealPopulation;
    }

    public String getTotalPlans() {
        return totalPlans;
    }

    public void setTotalPlans(String totalPlans) {
        this.totalPlans = totalPlans;
    }
}
