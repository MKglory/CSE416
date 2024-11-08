package com.spartan.Server;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ServerController {
    @GetMapping("/{state}VotingData")
    public ResponseEntity<Resource> getVotingData(@PathVariable String state) {
        try {
            String filePath = "data/" + state.toUpperCase() + "_party_votes_distribution.json";
            ClassPathResource resource = new ClassPathResource(filePath);
            String contentType = "application/json";
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType((contentType)))
                    .body(resource);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving map data.", e
            );
        }
    }

        @GetMapping("/incomeData/{state}")
    public ResponseEntity<Map<String, Object>> getIncomeData(@PathVariable String state) {
        String filePath = "data/" + state.toUpperCase() + "_household_income_all_races_results.json";
        Resource resource = new ClassPathResource(filePath);

        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> incomeData = mapper.readValue(resource.getInputStream(), Map.class);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(incomeData);
        } catch (IOException e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving income data.", e
            );
        }
    }

    @GetMapping("/raceEthnicityData/{state}")
    public ResponseEntity<List<Map<String, Object>>> getRaceEthnicityData(@PathVariable String state) {
        String filePath = "data/" + state.toUpperCase() + "_Race_and_Ethnicity_2022.json";
        Resource resource = new ClassPathResource(filePath);

        try {
            ObjectMapper mapper = new ObjectMapper();
            List<Map<String, Object>> raceEthnicityData = mapper.readValue(resource.getInputStream(), List.class);
            
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(raceEthnicityData);
        } catch (IOException e) {
            //logger.error("Error occurred while retrieving race and ethnicity data for state: " + state, e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving race and ethnicity data.", e
            );
        }
    }



}
