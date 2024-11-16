package com.spartan.Server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "filePaths")
public class FilePath {

    @Id
    private String id;
    private String state;
    private String votingDataPath;
    private String incomeDataPath;
    private String raceEthnicityDataPath;

    // Constructors, getters, and setters

    public FilePath() {}

    public FilePath(String state, String votingDataPath, String incomeDataPath, String raceEthnicityDataPath) {
        this.state = state;
        this.votingDataPath = votingDataPath;
        this.incomeDataPath = incomeDataPath;
        this.raceEthnicityDataPath = raceEthnicityDataPath;
    }

    public String getState() {
        return state;
    }

    public String getVotingDataPath() {
        return votingDataPath;
    }

    public String getIncomeDataPath() {
        return incomeDataPath;
    }

    public String getRaceEthnicityDataPath() {
        return raceEthnicityDataPath;
    }
}
