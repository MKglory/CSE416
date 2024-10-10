package com.spartan.Server;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // Enable CORS for your React app running on port 3000
public class ServerController {

    // Serve New York voting data as a JSON response
    @GetMapping(value = "/NYVotingData", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Number>> getNYVotingData() {
        try {
            // Create a Java Map to represent the DEM and REP vote counts
            Map<String, Number> nyVotingData = new HashMap<>();
            nyVotingData.put("DEM", 20161111); // Example Democratic votes
            nyVotingData.put("REP", 15666921); // Example Republican votes

            // Return the data as a JSON object
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(nyVotingData);

        } catch (Exception e) {
            // Respond with a 500 status if any error occurs
            return ResponseEntity.status(500).build();
        }
    }

    // Serve Arkansas voting data as a JSON response
    @GetMapping(value = "/ARVotingData", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Number>> getARVotingData() {
        try {
            // Create a Java Map to represent the DEM and REP vote counts for Arkansas
            Map<String, Number> arVotingData = new HashMap<>();
            arVotingData.put("DEM", 9876543); // Example Democratic votes
            arVotingData.put("REP", 8765432); // Example Republican votes

            // Return the data as a JSON object
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(arVotingData);

        } catch (Exception e) {
            // Respond with a 500 status if any error occurs
            return ResponseEntity.status(500).build();
        }
    }
}
