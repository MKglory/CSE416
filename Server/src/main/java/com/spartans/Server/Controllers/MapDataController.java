package com.spartans.Server.Controllers;

import com.spartans.Server.Models.Boundaries;
import com.spartans.Server.Repositories.PrecinctsDemographyRepository;
import com.spartans.Server.Services.BoundariesService;
import com.spartans.Server.Services.HeatMapService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow cross-origin requests from the frontend
public class MapDataController {

    private static final Logger logger = LoggerFactory.getLogger(MapDataController.class); // Logger for logging events

    @Autowired
    private BoundariesService boundariesService; // Service to handle boundary-related operations

    @Autowired
    private HeatMapService heatMapService; // Service to handle heatmap-related operations

    @Autowired
    private PrecinctsDemographyRepository precinctsDemographyRepository; // Repository for accessing precinct demography data

    /**
     * Endpoint to retrieve map data based on state and boundary type.
     *
     * @param state         The state for which the map data is requested.
     * @param boundaryType  The type of boundary (e.g., districts, precincts).
     * @return A GeoJSON feature collection as a ResponseEntity.
     */
    @GetMapping("/maps/{state}/{boundaryType}")
    public ResponseEntity<?> getMapData(
            @PathVariable String state,
            @PathVariable String boundaryType) {
        try {
            // Fetch boundary data for the specified state and boundary type
            Map<String, Object> featureCollection = boundariesService.getBoundariesByStateAndType(state, boundaryType);
            return ResponseEntity.ok(featureCollection); // Return the data as a successful response
        } catch (Exception e) {
            logger.info(e.getMessage()); // Log the error message
            // Return an HTTP 500 error response with an explanation
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving map data.", e
            );
        }
    }

    /**
     * Endpoint to retrieve heatmap data based on state, boundary type, and data type.
     *
     * @param state         The state for which the heatmap data is requested.
     * @param boundaryType  The type of boundary (e.g., districts, precincts).
     * @param dataType      The type of data (e.g., demography, income, election).
     * @return Heatmap data and associated colors as a ResponseEntity.
     */
    @GetMapping("/heatmaps/{state}/{boundaryType}/{dataType}")
    public ResponseEntity<?> getHeatMapData(
            @PathVariable String state,
            @PathVariable String boundaryType,
            @PathVariable String dataType) {
        try {
            // Fetch heatmap data for the specified state, boundary type, and data type
            Map<String, Object> heatMapData = heatMapService.getHeatMapData(state, boundaryType, dataType);
            return ResponseEntity.ok(heatMapData); // Return the data as a successful response
        } catch (Exception e) {
            logger.info(e.getMessage()); // Log the error message
            // Return an HTTP 500 error response with an explanation
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving heatmap data.", e
            );
        }
    }
}
