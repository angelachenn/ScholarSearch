package com.angelac.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PatchMapping;
import java.util.ArrayList;
import com.angelac.demo.model.User;
import com.angelac.demo.SQLConnection;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

  private ArrayList<User> users;
  private SQLConnection sqlConnection;

  public UserController() {
    users = new ArrayList<User>();
    sqlConnection = new SQLConnection();
    try {
      sqlConnection.doQuery("SELECT * FROM users");
      while (sqlConnection.getResultSet().next()) {
        users.add(new User(sqlConnection.getInt(1), sqlConnection.getString(2), sqlConnection.getString(4), sqlConnection.getString(3), sqlConnection.getString(6), sqlConnection.getString(5)));
      }
    }
    catch (Exception exception) {
      System.out.println(exception);
    }
  }

  @GetMapping()
  public ArrayList<User> list() {
    return users;
  }

  @GetMapping(path="{id}")
  public User getUserById (@PathVariable("id") int id) {
    int real = 0;
    for (int i = 0; i< users.size(); i++) {
      if (users.get(i).getId() == id) {
        real = i;
        return users.get(i);
      }
    }
    return users.get(real);
  }

  @PostMapping
  public User createUser(@RequestBody User a) {
    users.add(a);
    try {
      sqlConnection.doUpdate("INSERT INTO users(name, email, password, discipline, university) VALUES ('"  + a.getName() +  "', '" + a.getEmail() + "', '" + a.getPassword() + "', '" + a.getDiscipline() + "', '" + a.getUniversity() + "');");
    }
    catch(Exception exception) {
      System.out.println(exception);
    }
    return a;
  }

  @PatchMapping(path="{id}")
  public User changeUser(@RequestBody User a) {
    for (int i=0; i <users.size(); i++) {
      if (users.get(i).getId() == a.getId()) {
        users.get(i).setName(a.getName());
        users.get(i).setUniversity(a.getUniversity());
        users.get(i).setDiscipline(a.getDiscipline());

        try{
          sqlConnection.doUpdate("UPDATE users SET name = '" + a.getName() + "', university = '" + a.getUniversity() + "', discipline = '" + a.getDiscipline() +"' WHERE user_id = '" + a.getId()+"'");
        }
        catch (Exception exception) {
          System.out.println(exception);
        }
      }
    }
    return a;
  }
}
