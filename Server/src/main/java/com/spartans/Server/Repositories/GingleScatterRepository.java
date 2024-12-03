package com.spartans.Server.Repositories;

import com.spartans.Server.Models.GingleScatter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GingleScatterRepository extends MongoRepository<GingleScatter, String> {
    // Find by state and dataType
    List<GingleScatter> findByStateAndDataType(String state, String dataType);

    // Find by state, dataType, and regionType
    List<GingleScatter> findByStateAndDataTypeAndRegionType(String state, String dataType, String regionType);
}
