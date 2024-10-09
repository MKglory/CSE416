package com.spartan.Server;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class NYController {

    // Maps HTTP GET requests to the /NYVotingData URL endpoint
    // When a client makes a GET request to /NYVotingData (for example, http://localhost:8080/NYVotingData), the associated method will be executed.
    @GetMapping("/NYVotingData")
    public List<String> getNYVotingData() {
        
        // Create a new empty list that will store JSON-like strings representing voting data
        List<String> data = new ArrayList<>();
        data.add("Hello world");
        return data;
    }

    // Hardcoded New York Income Data
    @GetMapping("/NYIncomeData")
    public List<String> getNYIncomeData() {
        List<String> data = new ArrayList<>();

        return data;
    }

    // Hardcoded New York Race Data
    @GetMapping("/NYRaceData")
    public List<String> getNYRaceData() {
        List<String> data = new ArrayList<>();

        return data;
    }    
}
