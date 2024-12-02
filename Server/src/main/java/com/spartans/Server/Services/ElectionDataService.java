package com.spartans.Server.Services;

import com.spartans.Server.Models.ElectionData;
import com.spartans.Server.Repositories.ElectionDataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ElectionDataService {

    private final ElectionDataRepository repository;
    private static final Logger logger = LoggerFactory.getLogger(ElectionDataService.class);

    @Value("${heatmap.colors.democratic}")
    private String democraticColor;

    @Value("${heatmap.colors.republican}")
    private String republicanColor;

    public ElectionDataService(ElectionDataRepository repository) {
        this.repository = repository;
    }

    public Map<String, Object> getElectionDataByState(String state) {
        try {
            List<ElectionData> results = repository.findByState(state);

            if (results.isEmpty()) {
                logger.warn("No election data found for state: {}", state);
                throw new IllegalArgumentException("No data found for state: " + state);
            }
            return Map.of(
                    "data", results.get(0),
                    "colors", Map.of(
                            "democraticColor", democraticColor,
                            "republicanColor", republicanColor
                    )
            );

        } catch (Exception e) {
            logger.error("Error fetching data for state: {}", state, e);
            throw new RuntimeException("Error occurred while retrieving election data", e);
        }
    }
}

