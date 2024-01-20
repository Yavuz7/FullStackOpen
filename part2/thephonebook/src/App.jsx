import { useState } from "react";
import Filter from "./Filter";
import PhoneInput from "./PhoneInput";
import PhoneNumbers from "./PhoneNumbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "012-233-2345" },
    { name: "Eggman", number: "123-232-0494" },
    { name: "Dr Mario", number: "123-222-5965" },
  ]);
  const [filteredList, setFilteredList] = useState([]);

  const [checkName, setCheckName] = useState("");

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
