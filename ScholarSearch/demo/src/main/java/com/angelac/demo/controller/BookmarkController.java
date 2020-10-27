package com.angelac.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import java.util.ArrayList;

import com.angelac.demo.model.Bookmark;
import com.angelac.demo.SQLConnection;

@RestController
@RequestMapping("/bookmarks")
@CrossOrigin

public class BookmarkController {

  private ArrayList<Bookmark> bookmarks;
  private SQLConnection sqlConnection;

  public BookmarkController() {
    bookmarks = new ArrayList<Bookmark>();
    sqlConnection = new SQLConnection();
    try {
      sqlConnection.doQuery("SELECT * FROM bookmarks");
      while (sqlConnection.getResultSet().next()) {
        bookmarks.add(new Bookmark(sqlConnection.getInt(1), sqlConnection.getInt(2), sqlConnection.getInt(3)));
      }
    }
    catch (Exception exception) {
      System.out.println(exception);
    }
  }

  @GetMapping()
  public ArrayList<Bookmark> list() {
    return bookmarks;
  }

  @GetMapping(path="{id}")
  public Bookmark getBookmarkById (@PathVariable("id") int id) {
    int real = 0;
    for (int i = 0; i< bookmarks.size(); i++) {
      if (bookmarks.get(i).getID() == id) {
        real = i;
        return bookmarks.get(i);
      }
    }
    return bookmarks.get(real);
  }

  @PostMapping
  public Bookmark createBookmark(@RequestBody Bookmark a) {
    bookmarks.add(a);
    try {
      sqlConnection.doUpdate("INSERT INTO bookmarks(user_id, scholarship_id) VALUES ('"  + a.getUserID() +  "', '" + a.getScholarshipID() + "');");
    }
    catch(Exception exception) {
      System.out.println(exception);
    }
    return a;
  }

  @DeleteMapping(path="{id}")
  public Bookmark deleteBookmark (@PathVariable("id") @RequestBody int id) {

    for (int i = 0; i<bookmarks.size(); i++) {
      if (bookmarks.get(i).getID() == id) {
        try {
          sqlConnection.doUpdate("DELETE FROM bookmarks WHERE bookmark_id='"  + id +  "';");
        }
        catch(Exception exception) {
          System.out.println(exception);
        }
      return bookmarks.remove(i);
      }
    }
    return null;
  }
}