package com.angelac.demo.model;

public class LoggedIn {

  private static int ID;
  private static boolean status;
  
  public LoggedIn() {
    ID = 0;
    status = false;
  }
  public void setID(int id) {
    ID = id;
  }

  public void setStatus(boolean s) {
    status = s;
  }

  public boolean getStatus() {
    return status;
  }
  
  public int getID() {
      return ID;
  }
}
