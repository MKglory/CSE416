package com.spartans.Server.Repositories;

import com.spartans.Server.Models.PrecinctsDemography;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PrecinctsDemographyRepository extends MongoRepository<PrecinctsDemography, String> {
    List<PrecinctsDemography> findByState(String state);

}