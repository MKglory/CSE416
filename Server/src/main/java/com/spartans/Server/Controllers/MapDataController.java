package com.spartans.Server.Controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MapDataController {
    private static final Logger logger = LoggerFactory.getLogger(ElectionsController.class);
    @GetMapping("/maps/{state}/{mapBoundary}")
    public ResponseEntity<Resource> getMapData(
            @PathVariable String state,
            @PathVariable String mapBoundary) {
        try {
            String filePath = "maps/" + state.toLowerCase() + "_" + mapBoundary.toLowerCase() + ".json";
            ClassPathResource resource = new ClassPathResource(filePath);

            String contentType = "application/geo+json";
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (Exception  e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving map data.", e
            );
        }
    }
}
