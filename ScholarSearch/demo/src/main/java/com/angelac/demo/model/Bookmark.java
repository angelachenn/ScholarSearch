package com.angelac.demo.model;

public class Bookmark {

  private int id;
  private int userID;
  private int scholarshipID;

  public Bookmark(int id, int userID, int scholarshipID) {
    this.id = id;
    this.userID = userID;
    this.scholarshipID = scholarshipID;
  }

  public int getID() {
    return this.id;
  }

  public void setID(int id) {
    this.id = id;
  }

  public int getUserID() {
    return this.userID;
  }

  public void setUserID(int userID) {
    this.userID = userID;
  }

  public int getScholarshipID() {
    return this.scholarshipID;
  }

  public void setScholarshipID(int scholarshipID) {
    this.scholarshipID = scholarshipID;
  }
}