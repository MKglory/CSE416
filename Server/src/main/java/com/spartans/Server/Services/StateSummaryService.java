package com.spartans.Server.Services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.spartans.Server.Models.DistrictDemography;
import com.spartans.Server.Models.DistrictElection;
import com.spartans.Server.Models.DistrictIncome;
import com.spartans.Server.Repositories.DistrictDemographyRepository;
import com.spartans.Server.Repositories.DistrictElectionRepository;
import com.spartans.Server.Repositories.DistrictIncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateSummaryService {

    @Autowired
    private DistrictDemographyRepository districtDemographyRepository;

    @Autowired
    private DistrictIncomeRepository districtIncomeRepository;

    @Autowired
    private DistrictElectionRepository districtElectionRepository;

    public JsonNode getStateSummary(String state) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode summary = mapper.createObjectNode();

        List<DistrictDemography> demographies = districtDemographyRepository.findByState(state.toLowerCase());
        List<DistrictIncome> incomes = districtIncomeRepository.findByState(state.toLowerCase());
        List<DistrictElection> elections = districtElectionRepository.findByState(state.toLowerCase());

        // Initialize metrics
        int totalDistricts = 0;
        int totalPopulation = 0;
        int totalWhite = 0, totalBlack = 0, totalAsian = 0, totalHispanic = 0, totalAmericanIndian = 0;
        Long totalRuralPopulation = 0L, totalSuburbanPopulation = 0L, totalUrbanPopulation = 0L;
        double totalIncome = 0.0;
        int totalDemocraticVotes = 0;
        int totalRepublicanVotes = 0;
        String electionWinner = "";

        // Process demographic data
        for (DistrictDemography demography : demographies) {
            totalDistricts++;
            totalPopulation += demography.getTotal();
            totalWhite += demography.getWhite();
            totalBlack += demography.getBlack();
            totalAsian += demography.getAsian();
            totalHispanic += demography.getHispanic();
            totalAmericanIndian += demography.getAmericanIndian();
            totalRuralPopulation += demography.getRuralPopulation();
            totalSuburbanPopulation += demography.getSuburbanPopulation();
            totalUrbanPopulation += demography.getUrbanPopulation();
        }
        for (DistrictIncome income : incomes) {
            totalIncome += income.getIncomeMean();
        }
        for (DistrictElection election : elections) {
            totalDemocraticVotes += election.getDemocraticVotes();
            totalRepublicanVotes += election.getRepublicanVotes();
        }
        if (totalDemocraticVotes > totalRepublicanVotes){
            electionWinner = "Democratic";
        }
        else if (totalDemocraticVotes < totalRepublicanVotes){
            electionWinner = "Republican";
        }else {
            electionWinner = "Tie";
        }

        double avgIncome = totalDistricts > 0 ? totalIncome / totalDistricts : 0.0;

        // Build JSON summary
        summary.put("state", state.toLowerCase());
        summary.put("totalDistricts", totalDistricts);
        summary.put("totalPopulation", totalPopulation);
        summary.put("averageIncome", avgIncome);
        summary.put("totalDemocraticVotes", totalDemocraticVotes);
        summary.put("totalRepublicanVotes", totalRepublicanVotes);
        summary.put("electionWinner", electionWinner);
        summary.put("totalRuralPopulation", totalRuralPopulation);
        summary.put("totalSuburbanPopulation", totalSuburbanPopulation);
        summary.put("totalUrbanPopulation", totalUrbanPopulation);

        // Add demographic breakdown
        ObjectNode demographics = mapper.createObjectNode();
        demographics.put("white", totalWhite);
        demographics.put("black", totalBlack);
        demographics.put("asian", totalAsian);
        demographics.put("hispanic", totalHispanic);
        demographics.put("americanIndian", totalAmericanIndian);

        summary.set("demographics", demographics);

        return summary;
    }
}

