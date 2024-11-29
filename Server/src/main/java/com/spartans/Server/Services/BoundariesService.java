package com.spartans.Server.Services;

import com.spartans.Server.Models.Boundaries;
import com.spartans.Server.Repositories.BoundariesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class BoundariesService {

    @Autowired
    private BoundariesRepository boundariesRepository;
    // Find by ID
    public Boundaries getBoundaryById(String id) {
        return boundariesRepository.findById("6747f5e27a8cbf08143978c4").orElseThrow(() ->
                new IllegalArgumentException("No boundary found with id: " + id));
    }
    public Map<String, Object> getBoundariesByState(String state) {
        List<Boundaries> boundaries = boundariesRepository.findByPropertiesState(state);
        // Build GeoJSON FeatureCollection
        Map<String, Object> featureCollection = new HashMap<>();
        featureCollection.put("type", "FeatureCollection");
        List<Map<String, Object>> features = boundaries.stream().map(boundary -> {
            Map<String, Object> feature = new HashMap<>();
            feature.put("type", "Feature");
            feature.put("properties", boundary.getProperties());
            feature.put("geometry", boundary.getGeometry());
            return feature;
        }).collect(Collectors.toList());

        featureCollection.put("features", features);
        return featureCollection;
    }

    public Map<String, Object> getBoundariesByStateAndType(String state, String boundaryType) {
        state = state.toLowerCase();
        List<Boundaries> boundaries = boundariesRepository.findByPropertiesStateAndPropertiesBoundaryType(state, boundaryType);
        // Build GeoJSON FeatureCollection
        Map<String, Object> featureCollection = new HashMap<>();
        featureCollection.put("type", "FeatureCollection");
        List<Map<String, Object>> features = boundaries.parallelStream().map(boundary -> {
            Map<String, Object> feature = new HashMap<>();
            feature.put("type", "Feature");
            feature.put("properties", boundary.getProperties());
            feature.put("geometry", boundary.getGeometry());
            return feature;
        }).collect(Collectors.toList());

        featureCollection.put("features", features);
        return featureCollection;
    }
}
