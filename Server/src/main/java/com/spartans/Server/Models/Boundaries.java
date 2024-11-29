package com.spartans.Server.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "boundaries")
public class Boundaries {
    @Id
    private String id;
    private Object properties;
    private Object geometry;

    public Object getProperties() {
        return properties;
    }

    public void setProperties(Object properties) {
        this.properties = properties;
    }

    public Object getGeometry() {
        return geometry;
    }

    public void setGeometry(Object geometry) {
        this.geometry = geometry;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}

