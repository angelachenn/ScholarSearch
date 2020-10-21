package com.angelac.demo.dao;

import com.angelac.demo.model.Person;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository("fakeDao")
public class FakePersonDataAccessService implements Persondao {

  private static ArrayList<Person> person = new ArrayList<>();

  @Override
  public int insertPerson(int id, Person p) {
    person.add(new Person(id, p.getName()));
    return 1;
  }

  @Override
  public ArrayList<Person> selectAllPeople() {
    return person;
  }

  @Override
  public Optional<Person> selectPersonById(int id) {
    return person.stream()
      .filter(person -> person.getId()==(id))
      .findFirst();
  }

  @Override
  public int deletePersonById(int id) {
    Optional<Person> personMaybe = selectPersonById(id);
    if (personMaybe.isEmpty()) {
      return 0;
    }
    person.remove(personMaybe.get());
    return 1;
  }

  @Override
  public int updatePersonById(int id, Person update) {
    return selectPersonById(id)
      .map(person -> {
        int indexOfPersonToUpdate = FakePersonDataAccessService.person.indexOf(person);
        if (indexOfPersonToUpdate >= 0) {
          FakePersonDataAccessService.person.set(indexOfPersonToUpdate, new Person(id, update.getName()));
          return 1;
        }
        return 0;
      })
      .orElse(null);
  }
}