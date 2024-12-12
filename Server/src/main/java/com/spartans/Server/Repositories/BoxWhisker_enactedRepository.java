package com.spartans.Server.Repositories;

import com.spartans.Server.Models.BoxWhisker_enacted;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.util.List;

public interface BoxWhisker_enactedRepository extends MongoRepository<BoxWhisker_enacted, String> {
    List<BoxWhisker_enacted> findByState(String state);
}
