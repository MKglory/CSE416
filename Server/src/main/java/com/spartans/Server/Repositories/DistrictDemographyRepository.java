package com.spartans.Server.Repositories;

import com.spartans.Server.Models.Boundaries;
import com.spartans.Server.Models.DistrictDemography;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictDemographyRepository extends MongoRepository<DistrictDemography, String> {
    List<DistrictDemography> findByState(String state);

}
