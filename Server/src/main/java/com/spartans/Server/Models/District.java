package com.spartans.Server.Models;

public class District {
    private int Republican;
    private double RepublicanPercentage;
    private int Democracy;
    private double DemocracyPercentage;
    private int Libertarian;
    private double LibertarianPercentage;
    private int Total;
    private double TotalPercentage;
    private String Result;

    // Getters and Setters
    public int getRepublican() {
        return Republican;
    }

    public void setRepublican(int republican) {
        this.Republican = republican;
    }

    public double getRepublicanPercentage() {
        return RepublicanPercentage;
    }

    public void setRepublicanPercentage(double republicanPercentage) {
        this.RepublicanPercentage = republicanPercentage;
    }

    public int getDemocracy() {
        return Democracy;
    }

    public void setDemocracy(int democracy) {
        this.Democracy = democracy;
    }

    public double getDemocracyPercentage() {
        return DemocracyPercentage;
    }

    public void setDemocracyPercentage(double democracyPercentage) {
        this.DemocracyPercentage = democracyPercentage;
    }

    public int getLibertarian() {
        return Libertarian;
    }

    public void setLibertarian(int libertarian) {
        this.Libertarian = libertarian;
    }

    public double getLibertarianPercentage() {
        return LibertarianPercentage;
    }

    public void setLibertarianPercentage(double libertarianPercentage) {
        this.LibertarianPercentage = libertarianPercentage;
    }

    public int getTotal() {
        return Total;
    }

    public void setTotal(int total) {
        this.Total = total;
    }

    public double getTotalPercentage() {
        return TotalPercentage;
    }

    public void setTotalPercentage(double totalPercentage) {
        this.TotalPercentage = totalPercentage;
    }

    public String getResult() {
        return Result;
    }

    public void setResult(String result) {
        this.Result = result;
    }
}
