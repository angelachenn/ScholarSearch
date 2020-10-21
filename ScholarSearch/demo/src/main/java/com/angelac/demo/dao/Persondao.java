package com.angelac.demo.dao;

import com.angelac.demo.model.Person;
import java.util.ArrayList;
import java.util.Optional;
import java.util.Random;

public interface Persondao {

  int insertPerson(int id, Person p);

  default int insertPerson(Person p) {
    Random r = new Random();
    int id = r.nextInt();
    return insertPerson(id, p);
  }

  ArrayList<Person> selectAllPeople();

  Optional<Person> selectPersonById(int id);

  int deletePersonById(int id);

  int updatePersonById(int id, Person p);

}