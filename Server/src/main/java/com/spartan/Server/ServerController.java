package com.spartan.Server;

import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class ServerController {

    // Logger for the class
    private static final Logger logger = LoggerFactory.getLogger(ServerController.class);

    // Access New York voting data from JSON file and return as List of party-vote objects
    @GetMapping("/NYVotingData")
    public List<Map<String, Object>> getNYVotingData() {
        logger.info("Fetching New York voting data...");
        try {
            // Path to the NY party votes distribution JSON file
            ClassPathResource resource = new ClassPathResource("data/NY_party_votes_distribution.json");
            logger.debug("Loading file from path: " + resource.getPath());

            // Read JSON content as byte array
            byte[] jsonData = Files.readAllBytes(Paths.get(resource.getURI()));

            // Parse the JSON into a Map
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> dataMap = mapper.readValue(jsonData, Map.class);

            // Convert the map to a list of party-vote objects
            List<Map<String, Object>> result = new ArrayList<>();
            for (Map.Entry<String, Object> entry : dataMap.entrySet()) {
                result.add(Map.of("party", entry.getKey(), "votes", entry.getValue()));
            }

            logger.debug("Data transformed into required format.");
            return result;

        } catch (IOException e) {
            logger.error("Error reading New York voting data: " + e.getMessage(), e);
            return List.of(Map.of("error", "Unable to retrieve New York voting data"));
        }
    }

    // Access Arkansas voting data from JSON file and return as List of party-vote objects
    @GetMapping("/ARVotingData")
    public List<Map<String, Object>> getARVotingData() {
        logger.info("Fetching Arkansas voting data...");
        try {
            // Path to the AR party votes distribution JSON file
            ClassPathResource resource = new ClassPathResource("data/AR_party_votes_distribution.json");
            logger.debug("Loading file from path: " + resource.getPath());

            // Read JSON content as byte array
            byte[] jsonData = Files.readAllBytes(Paths.get(resource.getURI()));

            // Parse the JSON into a Map
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> dataMap = mapper.readValue(jsonData, Map.class);

            // Convert the map to a list of party-vote objects
            List<Map<String, Object>> result = new ArrayList<>();
            for (Map.Entry<String, Object> entry : dataMap.entrySet()) {
                result.add(Map.of("party", entry.getKey(), "votes", entry.getValue()));
            }

            logger.debug("Data transformed into required format.");
            return result;

        } catch (IOException e) {
            logger.error("Error reading Arkansas voting data: " + e.getMessage(), e);
            return List.of(Map.of("error", "Unable to retrieve Arkansas voting data"));
        }
    }
}

