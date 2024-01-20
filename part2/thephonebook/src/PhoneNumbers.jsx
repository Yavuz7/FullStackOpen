import FilteredList from "./FilteredList";

const PhoneNumbers = ({ filteredList, persons, checkName }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        <FilteredList list={checkName.length === 0 ? persons : filteredList} />
      </ul>
    </>
  );
};

export default PhoneNumbers;
