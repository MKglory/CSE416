package com.spartans.Server.Repositories;

import com.spartans.Server.Models.GingleTrend;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GingleTrendRepository extends MongoRepository<GingleTrend, String> {
    // Find by state and dataType
    List<GingleTrend> findByStateAndDataType(String state, String dataType);

    // Find by state, dataType, and regionType
    List<GingleTrend> findByStateAndDataTypeAndRegionType(String state, String dataType, String regionType);
}
