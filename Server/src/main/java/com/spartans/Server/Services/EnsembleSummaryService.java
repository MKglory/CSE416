package com.spartans.Server.Services;

import com.spartans.Server.Models.EnsembleSummary;
import com.spartans.Server.Repositories.EnsembleSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class EnsembleSummaryService {

    @Autowired
    private EnsembleSummaryRepository ensembleSummaryRepository;

    public Map<String, Object> getEnsembleSummary(String state){
        state = state.toLowerCase();
        List<EnsembleSummary> data = ensembleSummaryRepository.findByState(state);
        Map<String, Object> map = new HashMap<>();
        return Map.of(
                "ensembleSummary", data
        );
    }
}
