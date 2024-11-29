package com.spartans.Server.Controllers;

import com.spartans.Server.Models.Boundaries;
import com.spartans.Server.Services.BoundariesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MapDataController {

    private static final Logger logger = LoggerFactory.getLogger(MapDataController.class);
    @Autowired
    private BoundariesService boundariesService;

    @GetMapping("/maps/{state}/{boundaryType}")
    public ResponseEntity<?> getMapData(
            @PathVariable String state,
            @PathVariable String boundaryType) {
        try {
            Map<String, Object> featureCollection = boundariesService.getBoundariesByStateAndType(state, boundaryType);
            return ResponseEntity.ok(featureCollection);
        } catch (Exception  e) {
            logger.info(e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving map data.", e
            );
        }
    }
}
