package com.spartan.Server;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // Enable CORS for your React app running on port 3000
public class ServerController {

    // Serve New York voting data as a JSON response
    @GetMapping(value = "/NYVotingData", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Number>> getNYVotingData() {
        try {
            // Load the New York voting data JSON file from the classpath
            ClassPathResource resource = new ClassPathResource("data/NY_party_votes_distribution.json");

            // Read the file contents
            byte[] jsonData = Files.readAllBytes(Paths.get(resource.getURI()));

            // Convert the JSON data to a Java Map
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Number> fileData = objectMapper.readValue(jsonData, Map.class);

            // Create a Java Map to represent the DEM and REP vote counts
            Map<String, Number> nyVotingData = new HashMap<>();
            nyVotingData.put("DEM", fileData.get("DEM"));
            nyVotingData.put("REP", fileData.get("REP"));

            // Return the data as a JSON object
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(nyVotingData);

        } catch (IOException e) {
            // Respond with a 500 status if any error occurs
            return ResponseEntity.status(500).build();
        }
    }

    // Serve Arkansas voting data as a JSON response
    @GetMapping(value = "/ARVotingData", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Number>> getARVotingData() {
        try {
            // Load the Arkansas voting data JSON file from the classpath
            ClassPathResource resource = new ClassPathResource("data/AR_party_votes_distribution.json");

            // Read the file contents
            byte[] jsonData = Files.readAllBytes(Paths.get(resource.getURI()));

            // Convert the JSON data to a Java Map
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Number> fileData = objectMapper.readValue(jsonData, Map.class);

            // Create a Java Map to represent the DEM and REP vote counts
            Map<String, Number> arVotingData = new HashMap<>();
            arVotingData.put("DEM", fileData.get("DEM"));
            arVotingData.put("REP", fileData.get("REP"));

            // Return the data as a JSON object
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(arVotingData);

        } catch (IOException e) {
            // Respond with a 500 status if any error occurs
            return ResponseEntity.status(500).build();
        }
    }
}
