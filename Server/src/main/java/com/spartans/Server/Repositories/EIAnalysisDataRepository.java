package com.spartans.Server.Repositories;

import com.spartans.Server.Models.EIAnalysisData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EIAnalysisDataRepository extends MongoRepository<EIAnalysisData, String> {
    List<EIAnalysisData> findByStateAndRegionTypeAndCandidateNameAndGroup1Name(String state, String regionType, String candidate, String targetData);
    List<EIAnalysisData> findByState(String state);
}