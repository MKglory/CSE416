package com.spartans.Server.Controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.spartans.Server.Models.DistrictElection;
import com.spartans.Server.Models.ElectionData;
import com.spartans.Server.Repositories.DistrictElectionRepository;
import com.spartans.Server.Repositories.ElectionDataRepository;
import com.spartans.Server.Services.StateSummaryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ElectionsController {

    @Autowired
    private StateSummaryService stateSummaryService;
    @Autowired
    private DistrictElectionRepository districtElectionRepository;
    /**
     * Endpoint to get state summary data
     * @param state the state name
     * @return summary data for the state
     */
    @GetMapping("/{state}/Summary")
    public ResponseEntity<JsonNode> getStateSummary(
            @PathVariable String state
    ) {
        if (state == null || state.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Return 400 Bad Request for invalid state input
        }
        try {
            JsonNode summary = stateSummaryService.getStateSummary(state);
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            logger.info(e.getMessage());
            // Log error and return an appropriate response
            return ResponseEntity.status(500).body(null); // Return 500 Internal Server Error
        }
    }
    private static final Logger logger = LoggerFactory.getLogger(ElectionsController.class);
    private final ElectionDataRepository repository;

    public ElectionsController(ElectionDataRepository repository) {
        this.repository = repository;
    }
    @GetMapping("{type}/{state}Data")
    public ResponseEntity<ElectionData> getStateElectionData(
            @PathVariable String type,
            @PathVariable String state) {

        try {
            List<ElectionData> results;
            try {
                results = repository.findByState(state);
            } catch (Exception e) {
                logger.error("Error fetching data for StateFP: 04", e);
                throw e;
            }
            // Return the response entity with the file resource
            return ResponseEntity.ok()
                    .body(results.get(0));

        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving data.", e
            );
        }
    }


}
