package com.spartans.Server.Repositories;

import com.spartans.Server.Models.ElectionData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ElectionDataRepository extends MongoRepository<ElectionData, String> {
    List<ElectionData> findByState(String state);
}
