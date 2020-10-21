package com.angelac.demo;

import java.sql.*;

public class DBConnection {
  public static void main(String args[]) {
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/scholarsearch?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC", "root", "up#XkMu5v1oz");
      Statement statement = connection.createStatement();
      ResultSet resultSet = statement.executeQuery("SELECT * FROM scholarships");
      while(resultSet.next()) {
        System.out.println(resultSet.getInt(1) + resultSet.getString(2) + resultSet.getString(3));
      }
      connection.close();
    }
    catch (Exception exception) {
      System.out.println(exception);
    }
  }
}