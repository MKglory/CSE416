package com.spartan.Server;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;



@RestController
@CrossOrigin(origins = "http://localhost:3000")  // Enable CORS for your React app running on port 3000
public class ServerController {

    // Serve New York voting data as a JSON response
    // Serve New York voting data as a JSON response
    @GetMapping(value = "/NYVotingData", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Resource> getNYVotingData() {
        try {
            // Load the New York voting data JSON file from the classpath
            ClassPathResource resource = new ClassPathResource("data/NY_party_votes_distribution.json");
 
 
            String contentType = "applicaiton/json";
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType((contentType)))
                    .body(resource);
        } catch (Exception e) {
            // Respond with a 500 status if any error occurs
            return ResponseEntity.status(500).build();
        }
    }

 
 

    @GetMapping(value = "/ARVotingData", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Resource> getARVotingData() {
        try {
            // Load the Arkansas voting data JSON file from the classpath
            ClassPathResource resource = new ClassPathResource("data/AR_party_votes_distribution.json");
    
            // Set the content type to application/json
            String contentType = "application/json";
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        } catch (Exception e) {
            // Respond with a 500 status if any error occurs
            return ResponseEntity.status(500).build();
        }
    }
}
