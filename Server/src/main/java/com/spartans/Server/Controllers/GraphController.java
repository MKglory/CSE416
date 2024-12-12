package com.spartans.Server.Controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.spartans.Server.Models.PrecinctsDemography;
import com.spartans.Server.Models.PrecinctsElection;
import com.spartans.Server.Repositories.PrecinctsDemographyRepository;
import com.spartans.Server.Repositories.PrecinctsElectionRepository;
import com.spartans.Server.Services.BoxWhiskerService;
import com.spartans.Server.Services.GingleService;
import com.spartans.Server.Services.HeatMapService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.server.ResponseStatusException;

import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GraphController {
    private static final Logger logger = LoggerFactory.getLogger(GraphController.class);
    @Autowired
    private GingleService gingleService;

    @GetMapping("/{state}/Gingles/{dataType}/{regionType}")
    public ResponseEntity<Map<String, Object>> getGingleData(
            @PathVariable String state,
            @PathVariable String dataType,
            @PathVariable String regionType) {
        try {
            logger.info(state + " ", dataType + " " + regionType);
            Map<String, Object> featureCollection =
                    gingleService.getGingleByStateByDataTypeByRegionType(state, dataType, regionType);
            // Return the merged JSON to the client
            return ResponseEntity.ok()
                    .body(featureCollection);
        } catch (Exception e) {
            logger.error("Error occurred while retrieving data", e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving map data.", e
            );
        }
    }

    @Autowired
    private BoxWhiskerService boxWhiskerService;
    @GetMapping("/{state}/BoxWhisker")
    public ResponseEntity<Map<String, Object>> getBoxWhiskerData(
            @PathVariable String state){
        try {
            Map<String, Object> dataCollection =
                    boxWhiskerService.getBoxWhiskerByState(state);
            return ResponseEntity.ok()
                    .body(dataCollection);
        } catch (Exception e) {
            logger.error("Error occurred while retrieving data", e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving box & whisker data.", e
            );
        }
    }
}
