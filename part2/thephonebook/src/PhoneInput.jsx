import { useState } from "react";

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
      alert(`${newName} Is Already In The PhoneBook!`);
      setNewName("");
      setNewNumber("");
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
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
