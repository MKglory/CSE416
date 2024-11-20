package com.spartans.Server.Controllers;

import com.spartans.Server.Models.ElectionData;
import com.spartans.Server.Repositories.ElectionDataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
