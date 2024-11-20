//package com.spartans.Server;
//
//import com.spartans.Server.Models.YourModel;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//@Component
//public class MongoDbTest implements CommandLineRunner {
//    private final YourModelRepository repository;
//
//    public MongoDbTest(YourModelRepository repository) {
//        this.repository = repository;
//    }
//
//    @Override
//    public void run(String... args) {
//        String field1Value = "Sample Field 1";
//        String field2Value = "Sample Field 2";
//
//        YourModel model = new YourModel();
//        model.setField1(field1Value);
//        model.setField2(field2Value);
//        repository.save(model);System.out.println("Document saved!");
//
//        // Retrieve and print all documents
//        System.out.println("Retrieved Documents:");
//        repository.findAll().forEach(System.out::println);
//    }
//}
