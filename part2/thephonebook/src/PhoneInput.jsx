import axios from "axios";
import { useState } from "react";
import PhoneServices from "./PhoneServices";
import Notification from "./Notification";
import "./index.css";

const PhoneInput = ({ persons, setPersons }) => {
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [notification, setNotification] = useState([null, null]);

  const addName = (event) => {
    event.preventDefault();
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
        PhoneServices.change(replacingId, newData)
          .then((newContact) => {
            setPersons(
              persons.map((person) =>
                person.id !== replacingId ? person : newContact
              )
            );
            setNotification([
              `${newData.name}'s phonenumber has been changed!`,
              false,
            ]);
            setTimeout(() => {
              setNotification([null, null]);
            }, 5000);
          })
          .catch((error) => {
            setNotification([error.response.data.error, true]);
            setTimeout(() => {
              setNotification([null, null]);
            }, 5000);
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

      PhoneServices.create(newContact)
        .then((newContact) => {
          console.log(newContact);
          setPersons(persons.concat(newContact));
          setNotification([`${newContact.name} has been added!`, false]);
          setTimeout(() => {
            setNotification([null, null]);
          }, 5000);
        })
        .catch((error) => {
          setNotification([error.response.data.error, true]);
          setTimeout(() => {
            setNotification([null, null]);
          }, 5000);
        });

      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <>
      <Notification message={notification[0]} isError={notification[1]} />

      <form onSubmit={addName}>
        <h2>Add A New Number!</h2>
        <div>
          name:{" "}
          <input
            id="nameInput"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <br />
          number:{" "}
          <input
            id="numberInput"
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PhoneInput;
