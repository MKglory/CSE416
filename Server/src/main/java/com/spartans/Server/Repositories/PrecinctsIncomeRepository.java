package com.spartans.Server.Repositories;

import com.spartans.Server.Models.PrecinctsElection;
import com.spartans.Server.Models.PrecinctsIncome;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PrecinctsIncomeRepository extends MongoRepository<PrecinctsIncome, String> {
    List<PrecinctsIncome> findByState(String state);
}
