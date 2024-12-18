package com.spartans.Server.Repositories;

import com.spartans.Server.Models.DistrictDemography;
import com.spartans.Server.Models.DistrictIncome;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface DistrictIncomeRepository extends MongoRepository<DistrictIncome, String> {
    List<DistrictIncome> findByState(String state);

    @Aggregation(pipeline = {
            "{ $match: { state: ?0 } }", // Filter by state
            "{ $group: { _id: '$precinct', averageIncome: { $avg: '$income' } } }", // Group by precinct and calculate average
            "{ $project: { precinct: '$_id', _id: 0, averageIncome: 1 } }" // Reshape output
    })
    List<Map<String, Object>> findAverageIncomeByPrecinct(String state);
}
