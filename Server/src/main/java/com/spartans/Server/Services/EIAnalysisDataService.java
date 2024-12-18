package com.spartans.Server.Services;

import com.spartans.Server.Models.EIAnalysisData;
import com.spartans.Server.Repositories.EIAnalysisDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EIAnalysisDataService {
    @Autowired
    private EIAnalysisDataRepository eiAnalysisDataRepository;

    public Map<String, Object> getEIAnalysis(String state, String regionType, String candidate, String target){
        state = state.toLowerCase();
        List<EIAnalysisData> EIdata = eiAnalysisDataRepository.findByStateAndRegionTypeAndCandidateNameAndGroup1Name(state, regionType, candidate, target);
        return Map.of(
                "data",EIdata
        );
    }
}
