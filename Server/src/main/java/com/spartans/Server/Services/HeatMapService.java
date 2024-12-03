package com.spartans.Server.Services;

import com.github.benmanes.caffeine.cache.Cache;
import com.spartans.Server.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class HeatMapService {

    private static final Logger logger = LoggerFactory.getLogger(HeatMapService.class); // Logger instance
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
    @Autowired
    private Cache<String, Object> caffeineCache; // Inject the Caffeine cache
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
    @Value("${heatmap.colors.povertyLine}")
    private String povertyColors;
    @Value("${heatmap.povertyLine.threshold}")
    private String povertyThreshold;
    @Value("${heatmap.povertyLine.labels}")
    private String povertyLabels;
    @Value("${heatmap.demographic.labels}")
    private String demographicColorLabels;
    @Value("${heatmap.income.average.labels}")
    private String incomeColorLabels;
    @Value("${heatmap.income.average.threshold}")
    private String incomeColorThreshold;
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

    private List<String> parseConfigString(String partiesConfigs) {
        return Stream.of(partiesConfigs.split(","))
                .map(String::trim)
                .collect(Collectors.toList());
    }
    private List<Integer> parseConfigInt(String intConfigs) {
        return Stream.of(intConfigs.split(",")) // 修正参数名称
                .map(String::trim)              // 去除空格
                .map(Integer::parseInt)         // 转换为 Integer
                .collect(Collectors.toList());
    }
    private Map<String, Object> getColors() {
        Map<String, Object> colorMap = new HashMap<>();
        colorMap.put("white", parseColors(whiteColors));
        colorMap.put("black", parseColors(blackColors));
        colorMap.put("asian", parseColors(asianColors));
        colorMap.put("hispanic", parseColors(hispanicColors));
        colorMap.put("americanIndian", parseColors(americanIndianColors));
        colorMap.put("demographicLabels", parseConfigString(demographicColorLabels));
        colorMap.put("incomeLabels", parseConfigString(incomeColorLabels));
        colorMap.put("incomeThreshold", parseConfigInt(incomeColorThreshold));
        colorMap.put("demographicThreshold", parseConfigInt(demographicColorThreshold));
        colorMap.put("income", parseColors(incomeColors));
        colorMap.put("povertyLine", parseColors(povertyColors));
        colorMap.put("povertyLineThreshold", parseConfigInt(povertyThreshold));
        colorMap.put("povertyLineLabels", parseConfigString(povertyLabels));
        colorMap.put("democratic", democraticColor);
        colorMap.put("republican", republicanColor);
        return colorMap;
    }

    public Map<String, Object> getHeatMapData(String state, String boundary, String dataType) {
        String cacheKey = generateCacheKey(state, boundary, dataType);

        Map<String, Object> cachedData = (Map<String, Object>) caffeineCache.getIfPresent(cacheKey);
        if (cachedData != null) {
            logger.info("[HeatMapService] Cache hit for key: {}", cacheKey);
            return cachedData; // Return cached result
        }

        logger.info("[HeatMapService] Cache miss for key: {}. Fetching data from database.", cacheKey);

        // Fetch data if not in cache
        List<?> data = switch (boundary.toLowerCase()) {
            case "districts" -> getDistrictHeatMap(state, dataType);
            case "precincts" -> getPrecinctHeatMap(state, dataType);
            default -> {
                logger.error("[HeatMapService] Unsupported boundary type: {}", boundary);
                throw new IllegalArgumentException("Unsupported boundary type: " + boundary);
            }
        };

        Map<String, Object> colorsByType = getColors();
        Map<String, Object> result = Map.of(
                "data", data,
                "colors", colorsByType
        );

        // Store result in cache
        caffeineCache.put(cacheKey, result);
        logger.info("[HeatMapService] Data cached for key: {}", cacheKey);

        return result;
    }

    public List<?> getDistrictHeatMap(String state, String dataType) {
        logger.debug("[HeatMapService] Fetching district heatmap data for state: {}, dataType: {}", state, dataType);
        return switch (dataType.toLowerCase()) {
            case "demography" -> districtDemographyRepository.findByState(state.toLowerCase());
            case "income" -> districtIncomeRepository.findByState(state.toLowerCase());
            case "election" -> districtElectionRepository.findByState(state.toLowerCase());
            default -> {
                logger.error("[HeatMapService] Unsupported data type: {}", dataType);
                throw new IllegalArgumentException("Unsupported data type: " + dataType);
            }
        };
    }

    public List<?> getPrecinctHeatMap(String state, String dataType) {
        logger.debug("[HeatMapService] Fetching precinct heatmap data for state: {}, dataType: {}", state, dataType);
        return switch (dataType.toLowerCase()) {
            case "demography" -> precinctsDemographyRepository.findByState(state.toLowerCase());
            case "income" -> precinctsIncomeRepository.findByState(state.toLowerCase());
            case "election" -> precinctsElectionRepository.findByState(state.toLowerCase());
            default -> {
                logger.error("[HeatMapService] Unsupported data type: {}", dataType);
                throw new IllegalArgumentException("Unsupported data type: " + dataType);
            }
        };
    }

    private String generateCacheKey(String state, String boundary, String dataType) {
        return "HeatMapService:" + state.toLowerCase() + ":" + boundary.toLowerCase() + ":" + dataType.toLowerCase();
    }
}
