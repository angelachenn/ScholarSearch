package com.angelac.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.ArrayList;
import com.angelac.demo.model.Scholarship;
import com.angelac.demo.model.BookmarkChange;
import com.angelac.demo.SQLConnection;

@RestController
@RequestMapping("/scholarship")
@CrossOrigin
public class ScholarshipController {

  private ArrayList<Scholarship> scholarships;
  private SQLConnection sqlConnection;

  public ScholarshipController() {
    sqlConnection = new SQLConnection();
    scholarships = new ArrayList<Scholarship>();
    scholarships.add(new Scholarship ("Arcade Guindone Scholarship", "University of Ottawa", "Law", 0, "Be registered full time in a direct-entry faculty, or in the Faculty of Law, Civil Law Section; minimum admission average of 75%; be proficient in both of Canada's official languages; and promote francophonie through community and/or academic activities.", 20, 0, 1, 5000, null, "https://scholarships.uottawa.ca/p/a/70964/", "45.4231° N, 75.6831° W", "Undergraduate"));
    scholarships.add(new Scholarship("Faculty of Engineering and Design Scholarships", "Carleton University", "Engineering", 0, "Up to 60 scholarships will be awarded to the top students who are entering selected Bachelor of Engineering programs.", 1, 60, 0, 1000, null, "https://carleton.ca/awards/", "45.3876° N, 75.6960° W", "Undergraduate"));
    try {
      while(sqlConnection.getResultSet().next()) {
        scholarships.add(new Scholarship (sqlConnection.getString(2), sqlConnection.getString(3), sqlConnection.getString(4), sqlConnection.getInt(5), sqlConnection.getString(6), sqlConnection.getInt(7), sqlConnection.getInt(8), sqlConnection.getInt(9), sqlConnection.getInt(10), sqlConnection.getString(11), sqlConnection.getString(12), sqlConnection.getString(13), sqlConnection.getString(14)));
      }
    }
    catch (Exception e) {
      System.out.println(e);
    }
  }

  @GetMapping()
  public ArrayList<Scholarship> list() {
    return scholarships;
  }

  @GetMapping(path="{id}")
  public Scholarship getPersonById (@PathVariable("id") int id) {
    int real = 0;
    for (int i = 0; i < scholarships.size(); i++) {
      if(scholarships.get(i).getID() == id ) {
        real = i;
        return scholarships.get(i);
      }
    }
    return scholarships.get(real);
  }

  @PatchMapping(path="{id}")
  public Scholarship changeBookmark (@PathVariable("id") int id, @RequestBody BookmarkChange bookmarkChange) {
    int real = 0;
    for (int i = 0; i <scholarships.size(); i++) {
      if(scholarships.get(i).getID() == id) {
        scholarships.get(i).setNumBookmarks(bookmarkChange.getNumBookmarks());
        real = i;
        return scholarships.get(i);
      }
    }
    return scholarships.get(real);
  }
}
