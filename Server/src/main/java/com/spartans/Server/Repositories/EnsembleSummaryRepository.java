package com.spartans.Server.Repositories;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.spartans.Server.Models.EnsembleSummary;

import java.util.List;

public interface EnsembleSummaryRepository extends MongoRepository<EnsembleSummary, String>{
    List<EnsembleSummary> findByState(String state);

}
