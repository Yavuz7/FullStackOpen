import FilteredList from "./FilteredList";

const PhoneNumbers = ({ filteredList, persons, checkName, setPersons }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        <FilteredList
          list={checkName.length === 0 ? persons : filteredList}
          originalList={persons}
          setPersons={setPersons}
        />
      </ul>
    </>
  );
};

export default PhoneNumbers;
