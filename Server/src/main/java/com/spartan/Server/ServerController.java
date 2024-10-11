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
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;



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
}
