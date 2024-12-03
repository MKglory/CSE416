package com.spartans.Server.Configurations;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {

    @Bean
    public Cache<String, Object> caffeineCache() {
        return Caffeine.newBuilder()
                // Set the expiration time for cache entries
                .expireAfterWrite(10, TimeUnit.MINUTES) // Cache entries expire 10 minutes after being written
    
                // Set the maximum weight (size) of the cache to 500MB
                .maximumWeight(500 * 1024 * 1024) // Cache will not exceed 500 megabytes in total size
    
                // Define a custom weigher to calculate the weight of cache entries
                .weigher((String key, Object value) -> {
                    // If the cached value is a byte array, use its length as the weight
                    if (value instanceof byte[]) {
                        return ((byte[]) value).length; // Weight is the number of bytes in the array
                    }
                    // If the cached value is a string, calculate weight based on its byte size
                    else if (value instanceof String) {
                        return ((String) value).getBytes().length; // Convert the string to bytes and use the length
                    }
                    // For other object types, assign a default weight of 1
                    else {
                        return 1; // Minimal weight for unsupported or unhandled object types
                    }
                })
    
                // Build and return the configured cache instance
                .build();
    }
    
}
