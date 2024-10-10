package com.spartan.Server;

import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ServerController {

    // Access New York voting data from JSON file
    @GetMapping("/NYVotingData")
    public String getNYVotingData() throws IOException {
        // Path to the NY party votes distribution JSON file
        ClassPathResource resource = new ClassPathResource("data/NY_party_votes_distribution.json");
        // Read JSON content as String
        byte[] jsonData = Files.readAllBytes(Paths.get(resource.getURI()));
        return new String(jsonData);  // Return JSON content as a String
    }

    // Access Arkansas voting data from JSON file
    @GetMapping("/ARVotingData")
    public String getARVotingData() throws IOException {
        // Path to the AR party votes distribution JSON file
        ClassPathResource resource = new ClassPathResource("data/AR_party_votes_distribution.json");
        // Read JSON content as String
        byte[] jsonData = Files.readAllBytes(Paths.get(resource.getURI()));
        return new String(jsonData);  // Return JSON content as a String
    }

    // Hardcoded New York Income Data
    @GetMapping("/NYIncomeData")
    public List<String> getNYIncomeData() {
        List<String> data = new ArrayList<>();
        data.add("Hardcoded NY Income Data");
        return data;
    }

    // Hardcoded New York Race Data
    @GetMapping("/NYRaceData")
    public List<String> getNYRaceData() {
        List<String> data = new ArrayList<>();
        data.add("Hardcoded NY Race Data");
        return data;
    }    
}

