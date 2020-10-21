package com.angelac.demo.api;

import com.angelac.demo.service.PersonService;
import com.angelac.demo.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;


@RequestMapping("/api/v1/person")
@RestController
public class PersonController {

  private final PersonService personService;

  @Autowired
  public PersonController(PersonService personService) {
    this.personService = personService;
  }

  @PostMapping
  public void addPerson(@RequestBody Person p) {

    personService.addPerson(p);

  }

  @GetMapping
  public ArrayList<Person> getAllPeople() {
    return personService.getAllPeople();
  }

  @GetMapping(path="{id}")
  public Person getPersonById(@PathVariable("id") int id) {
    return personService.getPersonById(id)
      .orElse(null);
  }

  @DeleteMapping(path ="{id}")
  public void deletePersonById(@PathVariable("id") int id) {
    personService.deletePerson(id);
  }

  @PutMapping(path = "{id}")
  public void updatePerson(@PathVariable("id") int id, @RequestBody Person personToUpdate) {
    personService.updatePerson(id, personToUpdate);
  }
}