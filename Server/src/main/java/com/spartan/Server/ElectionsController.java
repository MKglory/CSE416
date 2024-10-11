package com.spartan.Server;

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

import javax.management.ReflectionException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ElectionsController {
    private static final Logger logger = LoggerFactory.getLogger(ServerController.class);

    @GetMapping("elections/{state}Data")
    public ResponseEntity<Resource> getStateElection(@PathVariable String state){
        try{
            String filePath = "elections/" + state.toLowerCase() + "_elections.json";
            ClassPathResource resource = new ClassPathResource(filePath);
            String contentType = "applicaiton/json";
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType((contentType)))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    // statue code 500
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving map data.", e
            );
        }
    }

    @GetMapping("representatives/{state}Data")
    public ResponseEntity<Resource> getRepresentativesElection(@PathVariable String state){
        try{
            String filePath = "elections/" + state.toLowerCase() + "_representatives.json";
            ClassPathResource resource = new ClassPathResource(filePath);
            String contentType = "applicaiton/json";
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType((contentType)))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    // statue code 500
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving map data.", e
            );
        }
    }
}
