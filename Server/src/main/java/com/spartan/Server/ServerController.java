package com.spartan.Server;

import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ServerController {

    // Logger for the class
    private static final Logger logger = LoggerFactory.getLogger(ServerController.class);

    // Access New York voting data from JSON file
    @GetMapping("/NYVotingData")
    public String getNYVotingData() {
        logger.info("Fetching New York voting data...");
        try {
            // Path to the NY party votes distribution JSON file
            ClassPathResource resource = new ClassPathResource("data/NY_party_votes_distribution.json");
            logger.debug("Loading file from path: " + resource.getPath());
            // Read JSON content as String
            byte[] jsonData = Files.readAllBytes(Paths.get(resource.getURI()));
            logger.debug("File read successfully, file size: " + jsonData.length);
            return new String(jsonData);  // Return JSON content as a String
        } catch (IOException e) {
            logger.error("Error reading New York voting data: " + e.getMessage(), e);
            return "{\"error\": \"Unable to retrieve New York voting data\"}";
        }
    }

    // Access Arkansas voting data from JSON file
    @GetMapping("/ARVotingData")
    public String getARVotingData() {
        logger.info("Fetching Arkansas voting data...");
        try {
            // Path to the AR party votes distribution JSON file
            ClassPathResource resource = new ClassPathResource("data/AR_party_votes_distribution.json");
            logger.debug("Loading file from path: " + resource.getPath());
            // Read JSON content as String
            byte[] jsonData = Files.readAllBytes(Paths.get(resource.getURI()));
            logger.debug("File read successfully, file size: " + jsonData.length);
            return new String(jsonData);  // Return JSON content as a String
        } catch (IOException e) {
            logger.error("Error reading Arkansas voting data: " + e.getMessage(), e);
            return "{\"error\": \"Unable to retrieve Arkansas voting data\"}";
        }
    }

    // Hardcoded New York Income Data
    @GetMapping("/NYIncomeData")
    public List<String> getNYIncomeData() {
        logger.info("Fetching hardcoded New York income data");
        List<String> data = new ArrayList<>();
        data.add("Hardcoded NY Income Data");
        return data;
    }

    // Hardcoded New York Race Data
    @GetMapping("/NYRaceData")
    public List<String> getNYRaceData() {
        logger.info("Fetching hardcoded New York race data");
        List<String> data = new ArrayList<>();
        data.add("Hardcoded NY Race Data");
        return data;
    }
}
