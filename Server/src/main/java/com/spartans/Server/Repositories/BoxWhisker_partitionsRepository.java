package com.spartans.Server.Repositories;

import com.spartans.Server.Models.BoxWhisker_partitions;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.util.List;

public interface BoxWhisker_partitionsRepository extends MongoRepository<BoxWhisker_partitions, String> {
    List<BoxWhisker_partitions> findByState(String state);
}
