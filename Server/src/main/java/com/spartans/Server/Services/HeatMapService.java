package com.spartans.Server.Services;

import com.spartans.Server.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Service
public class HeatMapService {
    @Autowired
    private DistrictDemographyRepository districtDemographyRepository;
    @Autowired
    private DistrictElectionRepository districtElectionRepository;
    @Autowired
    private DistrictIncomeRepository districtIncomeRepository;
    @Autowired
    private PrecinctsDemographyRepository precinctsDemographyRepository;
    @Autowired
    private PrecinctsElectionRepository precinctsElectionRepository;
    @Autowired
    private PrecinctsIncomeRepository precinctsIncomeRepository;

    @Value("${heatmap.colors.white}")
    private String whiteColors;

    @Value("${heatmap.colors.black}")
    private String blackColors;

    @Value("${heatmap.colors.asian}")
    private String asianColors;

    @Value("${heatmap.colors.hispanic}")
    private String hispanicColors;

    @Value("${heatmap.colors.american_indian}")
    private String americanIndianColors;

    @Value("${heatmap.colors.income}")
    private String incomeColors;

    @Value("${heatmap.demographic.labels}")
    private String demographicColorLabels;

    @Value("${heatmap.demographic.threshold}")
    private String demographicColorThreshold;

    @Value("${heatmap.colors.democratic}")
    private String democraticColor;

    @Value("${heatmap.colors.republican}")
    private String republicanColor;


    private List<String> parseColors(String colorConfig) {
        return Stream.of(colorConfig.split(","))
                .map(color -> "#" + color.trim())
                .collect(Collectors.toList());
    }
    private List<String> parseConfig(String partiesConfig) {
        return Stream.of(partiesConfig.split(","))
                .map(String::trim)
                .collect(Collectors.toList());
    }
    private Map<String, Object> getColors() {
        return Map.of(
                "white", parseColors(whiteColors),
                "black", parseColors(blackColors),
                "asian", parseColors(asianColors),
                "hispanic", parseColors(hispanicColors),
                "americanIndian", parseColors(americanIndianColors),
                "demographicLabels", parseConfig(demographicColorLabels),
                "demographicThreshold", parseConfig(demographicColorThreshold),
                "income", parseColors(incomeColors),
                "democratic", democraticColor,
                "republican", republicanColor
        );
    }

        public Map<String, Object> getHeatMapData(String state, String boundary, String dataType) {
        List<?> data = switch (boundary.toLowerCase()) {
            case "districts" -> getDistrictHeatMap(state, dataType);
            case "precincts" -> getPrecinctHeatMap(state, dataType);
            default -> throw new IllegalArgumentException("Unsupported boundary type: " + boundary);
        };
        Map<String, Object> colorsByType = getColors();
        return Map.of(
                "data", data,
                "colors", colorsByType
        );
    }

    public List<?> getDistrictHeatMap(String state, String dataType) {
        return switch (dataType.toLowerCase()) {
            case "demography" -> districtDemographyRepository.findByState(state.toLowerCase());
            case "income" -> districtIncomeRepository.findByState(state.toLowerCase());
            case "election" -> districtElectionRepository.findByState(state.toLowerCase());
            default -> throw new IllegalArgumentException("Unsupported data type: " + dataType);
        };
    }
    public List<?> getPrecinctHeatMap(String state, String dataType) {
        return switch (dataType.toLowerCase()) {
            case "demography" -> precinctsDemographyRepository.findByState(state.toLowerCase());
            case "income" -> precinctsIncomeRepository.findByState(state.toLowerCase());
            case "election" -> precinctsElectionRepository.findByState(state.toLowerCase());
            default -> throw new IllegalArgumentException("Unsupported data type: " + dataType);
        };
    }
}
