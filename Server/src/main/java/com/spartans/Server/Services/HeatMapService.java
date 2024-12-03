package com.spartans.Server.Services;

import com.github.benmanes.caffeine.cache.Cache;
import com.spartans.Server.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class HeatMapService {

    private static final Logger logger = LoggerFactory.getLogger(HeatMapService.class); // Logger instance for logging service activities

    // Autowired repositories for fetching heatmap data from the database
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
    private Cache<String, Object> caffeineCache; // Caffeine cache for storing heatmap data

    // Injecting configuration values for colors and thresholds
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

    /*
     * Input: "FF0000, 00FF00, 0000FF, FFFFFF, 000000"
     * Output: ["#FF0000", "#00FF00", "#0000FF", "#FFFFFF", "#000000"]
     */
    // Parse a comma-separated string of colors into a list of formatted color codes
    private List<String> parseColors(String colorConfig) {
        return Stream.of(colorConfig.split(","))
                .map(color -> "#" + color.trim()) // Add "#" to each trimmed color value
                .collect(Collectors.toList());
    }

    /*
Input:"Democratic, Republican, Independent, Libertarian, Green"
Output:
["Democratic", "Republican", "Independent", "Libertarian", "Green"]
*/

    // Parse a comma-separated configuration string into a list of trimmed values
    private List<String> parseConfig(String partiesConfig) {
        return Stream.of(partiesConfig.split(","))
                .map(String::trim)
                .collect(Collectors.toList());
    }

    // Build a map of color configurations for different data categories
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

    // Fetch heatmap data for a specific state, boundary type, and data type
    public Map<String, Object> getHeatMapData(String state, String boundary, String dataType) {
        String cacheKey = generateCacheKey(state, boundary, dataType); // Generate unique cache key

        // Check if data is already cached
        Map<String, Object> cachedData = (Map<String, Object>) caffeineCache.getIfPresent(cacheKey);
        if (cachedData != null) {
            logger.info("[HeatMapService] Cache hit for key: {}", cacheKey);
            return cachedData; // Return cached data
        }

        logger.info("[HeatMapService] Cache miss for key: {}. Fetching data from database.", cacheKey);

        // Fetch data from the database based on boundary type
        List<?> data = switch (boundary.toLowerCase()) {
            case "districts" -> getDistrictHeatMap(state, dataType); // Fetch district-level data
            case "precincts" -> getPrecinctHeatMap(state, dataType); // Fetch precinct-level data
            default -> {
                logger.error("[HeatMapService] Unsupported boundary type: {}", boundary);
                throw new IllegalArgumentException("Unsupported boundary type: " + boundary);
            }
        };

        // Build a result map with data and color configurations
        Map<String, Object> colorsByType = getColors();
        Map<String, Object> result = Map.of(
                "data", data,
                "colors", colorsByType
        );

        // Cache the result
        caffeineCache.put(cacheKey, result);
        logger.info("[HeatMapService] Data cached for key: {}", cacheKey);

        return result;
    }

    // Fetch district-level heatmap data based on state and data type
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

    // Fetch precinct-level heatmap data based on state and data type
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

    // Generate a unique cache key for the given parameters
    private String generateCacheKey(String state, String boundary, String dataType) {
        return "HeatMapService:" + state.toLowerCase() + ":" + boundary.toLowerCase() + ":" + dataType.toLowerCase();
    }
}
