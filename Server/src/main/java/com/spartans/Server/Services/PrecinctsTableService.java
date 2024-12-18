package com.spartans.Server.Services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.spartans.Server.Models.PrecinctsDemography;
import com.spartans.Server.Models.PrecinctsElection;
import com.spartans.Server.Models.PrecinctsIncome;
import com.spartans.Server.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PrecinctsTableService {
    @Autowired
    private PrecinctsDemographyRepository precinctsDemographyRepository;

    @Autowired
    private PrecinctsIncomeRepository precinctsIncomeRepository;

    @Autowired
    private PrecinctsElectionRepository precinctsElectionRepository;

    public JsonNode getPrecinctsData(String state) {
        ObjectMapper mapper = new ObjectMapper();
        ArrayNode precinctsArray = mapper.createArrayNode();

        // Fetch data from repositories
        List<PrecinctsDemography> demographies = precinctsDemographyRepository.findByState(state.toLowerCase());
        List<PrecinctsIncome> incomes = precinctsIncomeRepository.findByState(state.toLowerCase());
        List<PrecinctsElection> elections = precinctsElectionRepository.findByState(state.toLowerCase());

        // Map data by district for easier lookup
        Map<String, PrecinctsIncome> incomeMap = new HashMap<>();
        for (PrecinctsIncome income : incomes) {
            incomeMap.put(income.getPrecinctID(), income);
        }

        Map<String, PrecinctsDemography> demographyMap = new HashMap<>();
        for (PrecinctsDemography demography : demographies) {
            demographyMap.put(demography.getPrecinctID(), demography);
        }
//        elections.sort(Comparator.comparing(PrecinctsElection::getPrecinctID));

        // Combine data for each precinct
        for (PrecinctsElection precintsData : elections) {
            String precinct = precintsData.getPrecinctID();
            String name = precintsData.getPrecinct();
            String regionType = precintsData.getRegionType();


            ObjectNode precinctsNode = mapper.createObjectNode();

            precinctsNode.put("precinctID", precinct);
            precinctsNode.put("name", name);
            precinctsNode.put("regionType", regionType);
            precinctsNode.put("democratic", precintsData.getDemocraticVotes());
            precinctsNode.put("republican", precintsData.getRepublicanVotes());


            // Add income data
            PrecinctsIncome income = incomeMap.get(precinct);
            if (income != null) {
                precinctsNode.put("avgHouseholdIncome", income.getIncomeMean());
            }

            // Add election data
            PrecinctsDemography demography = demographyMap.get(precinct);
            if (demography != null) {
                precinctsNode.put("Total", demography.getTotal());

            }

            // Add the district node to the array
            precinctsArray.add(precinctsNode);
        }

        return precinctsArray;
    }
}
