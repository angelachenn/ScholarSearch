package com.angelac.demo;

import java.sql.*;

public class SQLConnection {

  private Connection connection;
  private Statement statement;
  private ResultSet resultSet;

  public SQLConnection() {
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/scholarsearch?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC", "root", "up#XkMu5v1oz");
      statement = connection.createStatement();
      resultSet = statement.executeQuery("SELECT * FROM scholarships");
    }
    catch (Exception exception) {
      System.out.println("Man you made this error u suck"  + exception);
    }

  }
  
  public void doQuery(String query) {
    try {
      resultSet = statement.executeQuery(query);
    }
    catch (Exception exception) {
      System.out.println(exception);
    }
  }

  public void doUpdate(String query) {
    try {
     int a = statement.executeUpdate(query);
    }
    catch(Exception e) {
      System.out.println("pe" + e);
    }
  }

  public ResultSet getResultSet() {
    return resultSet;
  }
    
  public int getInt(int i) {
    try {
      return resultSet.getInt(i);
    }
      catch (Exception exception) {
      System.out.println("exception");
    }
    return 0;
  }
    
  public String getString(int i) {
    try {
      return resultSet.getString(i); 
    }
    catch (Exception exception) {
      System.out.println("u suck balls");
    }
    return "poo";
  }
}