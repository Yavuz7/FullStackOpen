import axios from "axios";
import { useState } from "react";
import PhoneServices from "./PhoneServices";

const PhoneInput = ({ persons, setPersons }) => {
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    // const names = persons.filter((person) => person.name.includes(newName));
    let nameCheck = false;
    persons.forEach((element) => {
      if (element.name === newName) {
        nameCheck = true;
      }
    });
    if (nameCheck) {
      if (
        window.confirm(
          `${newName} Is Already In The PhoneBook! Replace the old number with a new one?`
        )
      ) {
        const replacingId = persons.find(
          (person) => person.name === newName
        ).id;
        const newData = { name: newName, number: newNumber };
        PhoneServices.change(replacingId, newData).then((newContact) => {
          setPersons(
            persons.map((person) =>
              person.id !== replacingId ? person : newContact
            )
          );
        });
        setNewName("");
        setNewNumber("");
      } else {
        setNewName("");
        setNewNumber("");
      }
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
      };
      PhoneServices.create(newContact).then((newContact) => {
        console.log(newContact);
        setPersons(persons.concat(newContact));
      });
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <form onSubmit={addName}>
      <h2>Add A New Number!</h2>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <br />
        number:{" "}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PhoneInput;
