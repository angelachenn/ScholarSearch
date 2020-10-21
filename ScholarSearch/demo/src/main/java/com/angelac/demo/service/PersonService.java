package com.angelac.demo.service;

import com.angelac.demo.model.Person;
import com.angelac.demo.dao.Persondao;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class PersonService {

  private final Persondao persondao;

  @Autowired
  public PersonService(@Qualifier("fakeDao") Persondao persondao) {
    this.persondao = persondao;
  }

  public int addPerson(Person p) {
    return persondao.insertPerson(p);
  }

  public ArrayList<Person> getAllPeople() {
    return persondao.selectAllPeople();
  }

  public Optional<Person> getPersonById(int id) {
    return persondao.selectPersonById(id);
  }

  public int deletePerson(int id) {
    return persondao.deletePersonById(id);
  }

  public int updatePerson(int id, Person newPerson) {
    return persondao.updatePersonById(id, newPerson);
  }
}