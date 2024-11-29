package com.spartans.Server.Repositories;

import com.spartans.Server.Models.DistrictDemography;
import com.spartans.Server.Models.DistrictElection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictElectionRepository extends MongoRepository<DistrictElection, String> {
    List<DistrictElection> findByState(String state);
}
