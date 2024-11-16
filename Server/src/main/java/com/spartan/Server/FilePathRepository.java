package com.spartan.Server;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FilePathRepository extends MongoRepository<FilePath, String> {
    // Custom query methods can be added here if needed
}
