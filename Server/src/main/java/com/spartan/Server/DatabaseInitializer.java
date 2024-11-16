package com.spartan.Server;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Component
public class DatabaseInitializer {

    private final FilePathRepository filePathRepository;

    @Autowired
    public DatabaseInitializer(FilePathRepository filePathRepository) {
        this.filePathRepository = filePathRepository;
    }

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            populateFilePath("NY", "New York", "path/to/ny_party_votes_distribution.json", 
                            "path/to/ny_household_income.json", "path/to/ny_race_ethnicity.json");

            populateFilePath("AR", "Arkansas", "path/to/ar_party_votes_distribution.json", 
                            "path/to/ar_household_income.json", "path/to/ar_race_ethnicity.json");
        };
    }

    private void populateFilePath(String id, String state, String votingDataPath, 
                                  String incomeDataPath, String raceEthnicityDataPath) {
        Optional<FilePath> existingFilePath = filePathRepository.findById(id);

        if (existingFilePath.isEmpty()) {
            FilePath filePath = new FilePath(state, votingDataPath, incomeDataPath, raceEthnicityDataPath);
            filePathRepository.save(filePath);
            System.out.println("Inserted document for state: " + state);
        } else {
            System.out.println("Document for state " + state + " already exists, skipping insertion.");
        }
    }
}
