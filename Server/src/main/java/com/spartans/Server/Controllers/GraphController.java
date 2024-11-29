package com.spartans.Server.Controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.spartans.Server.Models.PrecinctsDemography;
import com.spartans.Server.Models.PrecinctsElection;
import com.spartans.Server.Repositories.PrecinctsDemographyRepository;
import com.spartans.Server.Repositories.PrecinctsElectionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final PrecinctsElectionRepository precinctsElectionRepository;
    private final PrecinctsDemographyRepository precinctsDemographyRepository;

    public GraphController(PrecinctsElectionRepository electionRepository, PrecinctsDemographyRepository anotherRepository) {
        this.precinctsElectionRepository = electionRepository;
        this.precinctsDemographyRepository = anotherRepository;
    }

    @GetMapping("/{state}/Gingles/{dataType}")
    public ResponseEntity<JsonNode> getGingleData(
            @PathVariable String state,
            @PathVariable String dataType) {
        try {
            logger.info(state);
            List<PrecinctsElection> precinctsElectionList = precinctsElectionRepository.findByState(state.toLowerCase());
            List<PrecinctsDemography> precinctsDemographyList = precinctsDemographyRepository.findByState(state.toLowerCase());
            JsonNode electionJson = objectMapper.valueToTree(precinctsElectionList);
            JsonNode demographyJson = objectMapper.valueToTree(precinctsDemographyList);

            // Merge the datasets using a common key (e.g., "PrecinctID")
            JsonNode mergedJson = mergeDatasets(electionJson, demographyJson, "precinctID");

            // Return the merged JSON to the client
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(mergedJson);
        } catch (Exception e) {
            logger.error("Error occurred while retrieving data", e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while retrieving map data.", e
            );
        }
    }



    public JsonNode mergeDatasets(JsonNode jsonY, JsonNode jsonX, String keyField) {
        if (!jsonY.isArray() || !jsonX.isArray()) {
            throw new IllegalArgumentException("Both jsonY and jsonX should be JSON arrays.");
        }

        // Convert jsonY to a map for quick lookup
        Map<String, ObjectNode> mapY = new HashMap<>();
        for (JsonNode node : jsonY) {
            JsonNode keyNode = node.get(keyField);
            if (keyNode == null || keyNode.isNull()) {
                throw new IllegalArgumentException("Missing key field '" + keyField + "' in jsonY.");
            }
            mapY.put(keyNode.asText(), (ObjectNode) node);
        }

        // Iterate through jsonX and merge with jsonY
        for (JsonNode nodeX : jsonX) {
            JsonNode keyNode = nodeX.get(keyField);
            if (keyNode == null || keyNode.isNull()) {
                throw new IllegalArgumentException("Missing key field '" + keyField + "' in jsonX.");
            }
            String key = keyNode.asText();
            if (mapY.containsKey(key)) {
                // Merge fields from X into Y
                ObjectNode mergedNode = mapY.get(key);
                nodeX.fields().forEachRemaining(entry -> mergedNode.set(entry.getKey(), entry.getValue()));
                mapY.put(key, mergedNode);
            } else {
                // If key not present in Y, add it from X
                mapY.put(key, (ObjectNode) nodeX);
            }
        }

        // Convert the map back to an ArrayNode
        ArrayNode mergedArray = objectMapper.createArrayNode();
        for (ObjectNode node : mapY.values()) {
            mergedArray.add(node);
        }

        return mergedArray;
    }
}
