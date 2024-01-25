import { useState, useEffect } from "react";
// import { axios } from "axios";
import Filter from "./Filter";
import PhoneInput from "./PhoneInput";
import PhoneNumbers from "./PhoneNumbers";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [checkName, setCheckName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const filterList = (e) => {
    setFilteredList(
      persons.filter((person) => {
        let lowerName = person.name.toLowerCase();
        if (lowerName.includes(e.toLowerCase())) {
          return person;
        }
      })
    );
  };
  return (
    <div>
      <h2>Your Phonebook!</h2>
      <Filter
        value={checkName}
        onChange={(event) => {
          setCheckName(event.target.value);
          filterList(event.target.value);
        }}
      />
      <PhoneInput persons={persons} setPersons={setPersons} />
      <PhoneNumbers
        filteredList={filteredList}
        persons={persons}
        checkName={checkName}
      />
    </div>
  );
};

export default App;
