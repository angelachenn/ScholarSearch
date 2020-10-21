package com.angelac.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.ArrayList;
import com.angelac.demo.model.User;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

  private ArrayList<User> users;

  public UserController() {
    users = new ArrayList<User>();
  }

  @GetMapping()
  public ArrayList<User> list() {
    return users;
  }

  @GetMapping(path="{id}")
  public User getUserById (@PathVariable("id") int id) {
    int real = 0;
    for (int i = 0; i < users.size(); i++) {
      real = i;
      return users.get(i);
    }
    return users.get(real);
  }
}
