package com.spartans.Server.Services;

import com.github.benmanes.caffeine.cache.Cache;
import com.spartans.Server.Models.Boundaries;
import com.spartans.Server.Repositories.BoundariesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BoundariesService {

    private static final Logger logger = LoggerFactory.getLogger(BoundariesService.class);

    @Autowired
    private BoundariesRepository boundariesRepository;

    @Autowired
    private Cache<String, Object> caffeineCache; // Inject Caffeine cache

    // Find by ID
    public Boundaries getBoundaryById(String id) {
        String cacheKey = generateCacheKey("boundaryById", id); // Unique key for ID-based lookup
        logger.info("[BoundariesService] Checking cache for key: {}", cacheKey);

        Boundaries cachedBoundary = (Boundaries) caffeineCache.getIfPresent(cacheKey);

        if (cachedBoundary != null) {
            logger.info("[BoundariesService] Cache hit for key: {}", cacheKey);
            logCurrentCacheState();
            return cachedBoundary; // Return cached result
        }

        logger.info("[BoundariesService] Cache miss for key: {}. Fetching from database.", cacheKey);

        Boundaries boundary = boundariesRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("No boundary found with id: " + id));

        caffeineCache.put(cacheKey, boundary); // Store in cache
        logger.info("[BoundariesService] Data cached for key: {}", cacheKey);
        logCurrentCacheState();

        return boundary;
    }

    // Get boundaries by state
    public Map<String, Object> getBoundariesByState(String state) {
        String cacheKey = generateCacheKey("boundariesByState", state.toLowerCase()); // Unique key for state-based lookup
        logger.info("[BoundariesService] Checking cache for key: {}", cacheKey);

        Map<String, Object> cachedResult = (Map<String, Object>) caffeineCache.getIfPresent(cacheKey);

        if (cachedResult != null) {
            logger.info("[BoundariesService] Cache hit for key: {}", cacheKey);
            logCurrentCacheState();
            return cachedResult; // Return cached result
        }

        logger.info("[BoundariesService] Cache miss for key: {}. Fetching from database.", cacheKey);

        List<Boundaries> boundaries = boundariesRepository.findByPropertiesState(state.toLowerCase());

        Map<String, Object> featureCollection = buildGeoJson(boundaries);

        caffeineCache.put(cacheKey, featureCollection); // Store in cache
        logger.info("[BoundariesService] Data cached for key: {}", cacheKey);
        logCurrentCacheState();

        return featureCollection;
    }

    // Get boundaries by state and type
    public Map<String, Object> getBoundariesByStateAndType(String state, String boundaryType) {
        String cacheKey = generateCacheKey("boundariesByStateAndType", state.toLowerCase() + ":" + boundaryType.toLowerCase()); // Unique key for state and type lookup
        logger.info("[BoundariesService] Checking cache for key: {}", cacheKey);

        Map<String, Object> cachedResult = (Map<String, Object>) caffeineCache.getIfPresent(cacheKey);

        if (cachedResult != null) {
            logger.info("[BoundariesService] Cache hit for key: {}", cacheKey);
            logCurrentCacheState();
            return cachedResult; // Return cached result
        }

        logger.info("[BoundariesService] Cache miss for key: {}. Fetching from database.", cacheKey);

        List<Boundaries> boundaries = boundariesRepository.findByPropertiesStateAndPropertiesBoundaryType(state.toLowerCase(), boundaryType);

        Map<String, Object> featureCollection = buildGeoJson(boundaries);

        caffeineCache.put(cacheKey, featureCollection); // Store in cache
        logger.info("[BoundariesService] Data cached for key: {}", boundaries);
        logCurrentCacheState();

        return featureCollection;
    }

    // Generate unique cache keys for BoundariesService
    private String generateCacheKey(String prefix, String identifier) {
        return "BoundariesService:" + prefix + ":" + identifier;
    }

    // Build GeoJSON FeatureCollection
    private Map<String, Object> buildGeoJson(List<Boundaries> boundaries) {
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

    // Log current cache state
    private void logCurrentCacheState() {
        logger.info("[BoundariesService] Current cache state: size={}, keys={}",
                caffeineCache.asMap().size(),
                caffeineCache.asMap().keySet());
    }
}
