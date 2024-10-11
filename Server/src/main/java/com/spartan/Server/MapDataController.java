package com.spartan.Server;

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
    @GetMapping("/map/{state}District")
    public ResponseEntity<Resource> getCongressDistrict(@PathVariable String state) {
        try {
            String filePath = "maps/" + state.toLowerCase() + "_congress_district.json";
            ClassPathResource resource = new ClassPathResource(filePath);
            String contentType = "application/geo+json";
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    //.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    //contain disposition tell the browser how to handle this file.
                    .body(resource);

        } catch (Exception  e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving map data.", e
            );
        }
    }
}
