package com.spartans.Server.Repositories;

import com.spartans.Server.Models.Boundaries;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface BoundariesRepository extends MongoRepository<Boundaries, String> {

    @Query("{ 'properties.STATE': ?0 }")
    List<Boundaries> findByPropertiesState(String state);

    @Query("{ 'properties.STATE': ?0, 'properties.BoundaryType': ?1 }")
    List<Boundaries> findByPropertiesStateAndPropertiesBoundaryType(String state, String boundaryType);
}
