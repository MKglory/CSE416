package com.spartans.Server.Services;

import com.spartans.Server.Models.BoxWhisker_enacted;
import com.spartans.Server.Models.BoxWhisker_partitions;
import com.spartans.Server.Repositories.BoxWhisker_enactedRepository;
import com.spartans.Server.Repositories.BoxWhisker_partitionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class BoxWhiskerService {
    @Autowired
    private BoxWhisker_partitionsRepository boxWhiskerPartitionsRepository;
    @Autowired
    private BoxWhisker_enactedRepository boxWhisker_enactedRepository;
    @Value("${boxWhisker.colors.rural}")
    private String ruralColor;
    @Value("${boxWhisker.colors.suburban}")
    private String suburbanColor;
    @Value("${boxWhisker.colors.urban}")
    private String urbanColor;

    private String parseColor(String colorConfig) {
        return "#" + colorConfig.trim(); // Add "#" to the trimmed color value
    }


    private Map<String, Object> getColors() {
        Map<String, Object> colorMap = new HashMap<>();
        colorMap.put("rural", parseColor(ruralColor));
        colorMap.put("urban", parseColor(urbanColor));
        colorMap.put("suburban", parseColor(suburbanColor));
        return colorMap;
    }

    public Map<String, Object> getBoxWhiskerByState(String state) {
        List<BoxWhisker_partitions> districtsPartitionsData = boxWhiskerPartitionsRepository.findByState(state.toLowerCase());
        List<BoxWhisker_enacted> enactedData = boxWhisker_enactedRepository.findByState(state.toLowerCase());
        Map<String, Object> boxWhiskerData = new HashMap<>();
        boxWhiskerData.put("partitions", districtsPartitionsData.get(0));
        boxWhiskerData.put("enacted", enactedData.get(0));

        Map<String, Object> colorsByType = getColors();
        boxWhiskerData.put("colors", colorsByType);
        return boxWhiskerData;
    }
}
