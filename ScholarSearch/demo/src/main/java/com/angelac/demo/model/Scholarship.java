package com.angelac.demo.model;

public class Scholarship {

  //Variables
  private final int ID;
  private static int counter = 1;
  private String name;
  private String university;
  private String discipline;
  private String renewable;
  private String description;
  private int numBookmarks;
  private String numSpots;
  private String supplemental;
  private int value;
  private String date;
  private String link;
  private String coordinates;
  private String level;

  //Constructors
  public Scholarship(String name, String university, String discipline, int renewable, String description, int numBookmarks, int numSpots, int supplemental,
   int value, String date, String link, String coordinates, String level) {
      this.ID = counter++;
      this.name = name;
      this.university = university;
      this.discipline = discipline;
      if (renewable == 1) {
          this.renewable = "Yes";
      }
      else {
          this.renewable = "No";
      }
      this.description = description;
      this.numBookmarks = numBookmarks;
      if (numSpots == 0) {
        this.numSpots = "Unlimited";
      }
      else {
        this.numSpots = Integer.toString(numSpots);
      }
      if (supplemental == 1) {
          this.supplemental = "Yes";
      }
      else {
          this.supplemental = "No";
      }
      this.value = value;
      if (date == null) {
        this.date = "No Deadline";
      }
      else {
        this.date = date;
      }
      this.link = link;
      this.level = level;
      this.coordinates = coordinates;
  }
  
  public Scholarship(String name, String university) {
    this.ID = counter++;
    this.name = name;
    this.university = university;
  }

    //Getters and Setters
  public int getID() {
      return ID;
  }

  public static void setCounter(int counter) {
      Scholarship.counter = counter;
  }

  public String getName() {
      return name;
  }

  public void setName(String name) {
      this.name = name;
  }

  public String getUniversity() {
      return university;
  }

  public void setUniversity(String university) {
      this.university = university;
  }

  public String getDiscipline() {
      return discipline;
  }

  public void setDiscipline(String discipline) {
      this.discipline = discipline;
  }

  public String getRenewable() {
      return renewable;
  }

  public void setRenewable(int r) {
    if (r == 1) {
      this.renewable = "Yes";
    }
    else {
      this.renewable = "No";
    }
  }

  public String getDescription() {
      return description;
  }

  public void setDescription(String description) {
      this.description = description;
  }

  public int getNumBookmarks() {
      return numBookmarks;
  }

  public void setNumBookmarks(int numBookmarks) {
      this.numBookmarks = numBookmarks;
  }

  public String getNumSpots() {
      return numSpots;
  }

  public void setNumSpots(int numSpots) {
    if (numSpots == 0) {
        this.numSpots = "unlimited";
    }
    this.numSpots = Integer.toString(numSpots);
  }

  public String getSupplemental() {
      return supplemental;
  }

  public void setSupplemental(int supplemental) {
    if (supplemental == 1) {
      this.supplemental = "Yes";
    }
    else {
      this.supplemental = "No";
    }
  }

  public int getValue() {
      return value;
  }

  public void setValue(int value) {
      this.value = value;
  }

  public String getDate() {
      return date;
  }

  public void setDate(String date) {
      this.date = date;
  }

  public String getLink() {
      return link;
  }

  public void setLink(String link) {
      this.link = link;
  }

  public String getLevel() {
      return level;
  }

  public void setLevel(String level) {
      this.level = level;
  }

  public String getCoordinates() {
      return coordinates;
  }

  public void setCoordinates(String coordinates) {
      this.coordinates = coordinates;
  }

  @Override
  public String toString() {
      return "Scholarship [ID=" + this.ID + ", coordinates=" + this.coordinates + ", date=" + this.date + ", description="
              + this.description + ", discipline=" + this.discipline + ", level=" + this.level + ", link=" + this.link + ", name=" + this.name
              + ", numBookmarks=" + this.numBookmarks + ", numSpots=" + this.numSpots + ", renewable=" + this.renewable
              + ", supplemental=" + this.supplemental + ", university=" + this.university + ", value=" + this.value + "]";
  }

}