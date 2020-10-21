package com.angelac.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Person {

  private final int id;
  private final String name;

  public Person(@JsonProperty("id") int id, @JsonProperty("name") String name) {
    this.id = id;
    this.name = name;
  }

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }
}