package com.spartans.Server.Services;

import com.spartans.Server.Models.EIPolarizationData;
import com.spartans.Server.Repositories.EIPolarizationDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EIPolarizationService {

    private final EIPolarizationDataRepository repository;

    @Autowired
    public EIPolarizationService(EIPolarizationDataRepository repository) {
        this.repository = repository;
    }

    /**
     * Fetches polarization data based on state, group0, group1, and candidate.
     *
     * @param state     The state to filter.
     * @param group0    The first group in data.groups array.
     * @param group1    The second group in data.groups array.
     * @param candidate The candidate name in data.candidate.
     * @return A list of EIPolarizationData matching the filters.
     */
    public List<EIPolarizationData> getByStateGroupsAndCandidate(String state, String group0, String group1, String candidate) {
        state = state.toLowerCase();
        List<EIPolarizationData> data = repository.findByStateAndGroupsAndCandidate(state, group0, group1, candidate);;
        if (data.isEmpty()) {
            data = repository.findByStateAndGroupsAndCandidate(state, group1, group0, candidate);
        }
        return data;
    }
}
