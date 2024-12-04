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
