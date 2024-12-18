package com.spartans.Server.Controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.spartans.Server.Models.ElectionData;
import com.spartans.Server.Services.DistrictsTableService;
import com.spartans.Server.Services.ElectionDataService;
import com.spartans.Server.Services.PrecinctsTableService;
import com.spartans.Server.Services.StateSummaryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DataController {
    private static final Logger logger = LoggerFactory.getLogger(DataController.class);

    @Autowired
    private StateSummaryService stateSummaryService;
    /**
     * Endpoint to get state summary data
     * @param state the state name
     * @return summary data for the state
     */
    @GetMapping("/{state}/Summary")
    public ResponseEntity<JsonNode> getStateSummary(
            @PathVariable String state
    ) {
        logger.info("Sumary");

        try {
            JsonNode summary = stateSummaryService.getStateSummary(state);
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            logger.info(e.getMessage());
            return ResponseEntity.status(500).body(null); // Return 500 Internal Server Error
        }
    }
    @Autowired
    private ElectionDataService electionDataService;

    @GetMapping("{type}/{state}Data")
    public ResponseEntity<Map<String, Object>> getStateElectionData(
            @PathVariable String state) {

        try {
            Map<String, Object> data = electionDataService.getElectionDataByState(state);
            return ResponseEntity.ok().body(data);

        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Election data not found for state: " + state, e
            );
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving data.", e
            );
        }
    }
    @Autowired
    private DistrictsTableService districtsTableService;

    @GetMapping("/{state}/DistrictsTable")
    public ResponseEntity<JsonNode> getDistrictsTable(
            @PathVariable String state) {

        try {
            JsonNode data = districtsTableService.getDistrictsData(state);
            return ResponseEntity.ok().body(data);

        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Election data not found for state: " + state, e
            );
        }
    }

    @Autowired
    private PrecinctsTableService precinctsTableService;
    @GetMapping("/{state}/PrecinctsTable")
    public ResponseEntity<JsonNode> getPrecinctsTable(
            @PathVariable String state) {

        try {
            JsonNode data = precinctsTableService.getPrecinctsData(state);
            return ResponseEntity.ok().body(data);

        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Election data not found for state: " + state, e
            );
        }
    }
}
