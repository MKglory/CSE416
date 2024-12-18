package com.spartans.Server.Services;

import com.spartans.Server.Models.GingleScatter;
import com.spartans.Server.Models.GingleTrend;
import com.spartans.Server.Repositories.GingleScatterRepository;
import com.spartans.Server.Repositories.GingleTrendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GingleService {

    @Value("${heatmap.colors.democratic.scatter}")
    private String democraticColorScatter;
    @Value("${heatmap.colors.republican.scatter}")
    private String republicanColorScatter;
    @Value("${heatmap.colors.democratic.trend}")
    private String democraticColorTrend;
    @Value("${heatmap.colors.republican.trend}")
    private String republicanColorTrend;
    @Autowired
    private GingleScatterRepository gingleScatterRepository;

    @Autowired
    private GingleTrendRepository gingleTrendRepository;

    public Map<String, Object> getGingleByStateByDataType(String state, String dataType) {
        List<GingleTrend> gingleTrends= gingleTrendRepository.findByStateAndDataType(state.toLowerCase(), dataType);
        List<GingleScatter> gingleScatters = gingleScatterRepository.findByStateAndDataType(state.toLowerCase(), dataType);
        Map<String, Object> gingleData = new HashMap<>();
        gingleData.put("trends", gingleTrends);
        gingleData.put("scatters", gingleScatters);
        return Map.of(
                "gingleData", gingleData,
                "colors", Map.of(
                        "democraticColorScatter", democraticColorScatter,
                        "republicanColorScatter", republicanColorScatter,
                        "democraticColorTrend", democraticColorTrend,
                        "republicanColorTrend", republicanColorTrend
                )
        );
    }

    public Map<String, Object> getGingleByStateByDataTypeByRegionType(String state, String dataType, String regionType) {
        List<GingleTrend> gingleTrends= gingleTrendRepository.findByStateAndDataTypeAndRegionType(state.toLowerCase(), dataType, regionType);
        List<GingleScatter> gingleScatters = gingleScatterRepository.findByStateAndDataTypeAndRegionType(state.toLowerCase(), dataType, regionType);
        Map<String, Object> gingleData = new HashMap<>();
        gingleData.put("trends", gingleTrends);
        gingleData.put("scatters", gingleScatters);
        return Map.of(
                "gingleData", gingleData,
                "colors", Map.of(
                        "democraticColorScatter", democraticColorScatter,
                        "republicanColorScatter", republicanColorScatter,
                        "democraticColorTrend", democraticColorTrend,
                        "republicanColorTrend", republicanColorTrend
                )
        );
    }
}
