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
                .expireAfterWrite(10, TimeUnit.MINUTES) // Cache entries expire after 10 minutes
                .maximumWeight(500 * 1024 * 1024) // Maximum cache size of 500MB
                .weigher((String key, Object value) -> {
                    if (value instanceof byte[]) {
                        return ((byte[]) value).length; // Weight based on size of byte arrays
                    } else if (value instanceof String) {
                        return ((String) value).getBytes().length; // Weight based on size of strings
                    } else {
                        return 1; // Default weight for other objects
                    }
                })
                .build();
    }
}
