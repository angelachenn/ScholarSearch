package com.angelac.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.angelac.demo.model.LoggedIn;
import com.angelac.demo.model.SessionChange;

@RestController
@RequestMapping("/")
@CrossOrigin
public class LoggedInController {

  private LoggedIn session;
  public LoggedInController() {
    session = new LoggedIn();
  }

  @GetMapping
  public LoggedIn getDetails() {
    return session;
  }

  @PatchMapping
  public LoggedIn changeDetails(@RequestBody SessionChange s) {
    session.setID(s.getID());
    session.setStatus(s.getStatus());
    return session;
  }
}