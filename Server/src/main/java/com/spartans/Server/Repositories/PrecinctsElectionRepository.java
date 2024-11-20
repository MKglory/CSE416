package com.spartans.Server.Repositories;

import com.spartans.Server.Models.PrecinctsElection;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PrecinctsElectionRepository extends MongoRepository<PrecinctsElection, String> {
    List<PrecinctsElection> findByState(String state);
}
