package com.spartans.Server.Services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.spartans.Server.Models.DistrictDemography;
import com.spartans.Server.Models.DistrictElection;
import com.spartans.Server.Models.DistrictIncome;
import com.spartans.Server.Repositories.DistrictDemographyRepository;
import com.spartans.Server.Repositories.DistrictElectionRepository;
import com.spartans.Server.Repositories.DistrictIncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DistrictsTableService {
    @Autowired
    private DistrictDemographyRepository districtDemographyRepository;

    @Autowired
    private DistrictIncomeRepository districtIncomeRepository;

    @Autowired
    private DistrictElectionRepository districtElectionRepository;

    public JsonNode getDistrictsData(String state) {
        ObjectMapper mapper = new ObjectMapper();
        ArrayNode districtsArray = mapper.createArrayNode();

        // Fetch data from repositories
        List<DistrictDemography> demographies = districtDemographyRepository.findByState(state.toLowerCase());
        List<DistrictIncome> incomes = districtIncomeRepository.findByState(state.toLowerCase());
        List<DistrictElection> elections = districtElectionRepository.findByState(state.toLowerCase());

        // Map data by district for easier lookup
        Map<Integer, DistrictIncome> incomeMap = new HashMap<>();
        for (DistrictIncome income : incomes) {
            incomeMap.put(income.getCd(), income);
        }

        Map<Integer, DistrictDemography> demographyMap = new HashMap<>();
        for (DistrictDemography demography : demographies) {
            demographyMap.put(demography.getCd(), demography);
        }
        elections.sort(Comparator.comparingInt(DistrictElection::getCd));

        // Combine data for each district
        for (DistrictElection districtData : elections) {
            int district = districtData.getCd();
            ObjectNode districtNode = mapper.createObjectNode();

            String party = districtData.getPercentageVoteDemocracy() > districtData.getPercentageVoteRepublican()
                    ? "Democrat" : "Republican";
            double voteMargin = Math.abs(
                    districtData.getPercentageVoteDemocracy() - districtData.getPercentageVoteRepublican()
            );
            districtNode.put("district", district);
            districtNode.put("representative", districtData.getRepresentative());
            districtNode.put("racialEthnicity", districtData.getRepresentativeRace());
            districtNode.put("party", party);
            districtNode.put("voteMargin", voteMargin);


            // Add income data
            DistrictIncome income = incomeMap.get(district);
            if (income != null) {
                districtNode.put("avgHouseholdIncome", income.getIncomeMean());
                districtNode.put("povertyPercent", income.getPovertyPercentage());
            }

            // Add election data
            DistrictDemography demography = demographyMap.get(district);
            if (demography != null) {
                districtNode.put("ruralPopPercent", (100.0 * demography.getRuralPopulation() / demography.getTotal()));
                districtNode.put("suburbanPopPercent",(100.0 * demography.getSuburbanPopulation() / demography.getTotal()));
                districtNode.put("urbanPopPercent", (100.0 * demography.getUrbanPopulation() / demography.getTotal()));
            }

            // Add the district node to the array
            districtsArray.add(districtNode);
        }

        return districtsArray;
    }
}
