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

        // Fetch data from the respective collections
        List<DistrictDemography> demographies = districtDemographyRepository.findByState(state.toLowerCase());
        List<DistrictIncome> incomes = districtIncomeRepository.findAllByState(state.toLowerCase());
        List<DistrictElection> elections = districtElectionRepository.findByState(state.toLowerCase());

        // Initialize metrics
        int totalDistricts = 0;
        int totalPopulation = 0;
        int totalWhite = 0, totalBlack = 0, totalAsian = 0, totalHispanic = 0, totalAmericanIndian = 0;
        double totalIncome = 0.0;
        int totalDemocraticVotes = 0;
        int totalRepublicanVotes = 0;

        // Process demographic data
        for (DistrictDemography demography : demographies) {
            totalDistricts++;
            totalPopulation += demography.getTotalPopulation();
            totalWhite += demography.getWhitePopulation();
            totalBlack += demography.getBlackPopulation();
            totalAsian += demography.getAsianPopulation();
            totalHispanic += demography.getHispanicPopulation();
            totalAmericanIndian += demography.getAmericanIndianPopulation();
        }

        // Process income data
        for (DistrictIncome income : incomes) {
            totalIncome += income.getIncomeMean();
        }

        // Process election data
        for (DistrictElection election : elections) {
            totalDemocraticVotes += election.getDemocraticVotes();
            totalRepublicanVotes += election.getRepublicanVotes();
        }

        // Calculate averages
        double avgIncome = totalDistricts > 0 ? totalIncome / totalDistricts : 0.0;

        // Build JSON summary
        summary.put("state", state.toLowerCase());
        summary.put("totalDistricts", totalDistricts);
        summary.put("totalPopulation", totalPopulation);
        summary.put("averageIncome", avgIncome);
        summary.put("totalDemocraticVotes", totalDemocraticVotes);
        summary.put("totalRepublicanVotes", totalRepublicanVotes);

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

