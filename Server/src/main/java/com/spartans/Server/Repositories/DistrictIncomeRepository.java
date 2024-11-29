package com.spartans.Server.Repositories;

import com.spartans.Server.Models.DistrictDemography;
import com.spartans.Server.Models.DistrictIncome;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictIncomeRepository extends MongoRepository<DistrictIncome, String> {
    List<DistrictIncome> findAllByState(String state);
}
