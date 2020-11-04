package com.angelac.demo.model;

public class User {
  
  private String name;
  private String password;
  private String email;
  private String university;
  private String discipline;
  private int id;

  public User(int id, String name, String password, String email, String university, String discipline) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.university = university;
    this.discipline = discipline;
  }
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getUniversity() {
    return this.university;
  }

  public void setUniversity(String university) {
    this.university = university;
  }

  public String getDiscipline() {
    return this.discipline;
  }

  public void setDiscipline(String discipline) {
    this.discipline = discipline;
  }

  @Override
  public String toString() {
    return "User [name =" + this.name + ", email=" + this.email + ", password=" + this.password + ", university=" + this.university + ", discipline=" + this.discipline + "]";
  }
}