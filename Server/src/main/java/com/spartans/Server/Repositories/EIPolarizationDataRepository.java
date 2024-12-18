package com.spartans.Server.Repositories;

import com.spartans.Server.Models.EIPolarizationData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface EIPolarizationDataRepository extends MongoRepository<EIPolarizationData, String> {

    // Query to find documents by state, groups[0], groups[1], and candidate
    @Query("{ 'state': ?0, 'data.groups.0': ?1, 'data.groups.1': ?2, 'data.candidate': ?3 }")
    List<EIPolarizationData> findByStateAndGroupsAndCandidate(String state, String group0, String group1, String candidate);
}
