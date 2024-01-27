import PhoneServices from "./PhoneServices";

const FilteredList = ({ list, originalList, setPersons }) => {
  const updateList = (id) => {
    if (window.confirm(`Do you really want to delete this contact?`)) {
      PhoneServices.remove(id).then((response) => console.log(response));
      setPersons(originalList.filter((person) => person.id != id));
    }
  };

  return list.map((person) => (
    <li key={person.name}>
      {person.name} {person.number}
      <button onClick={() => updateList(person.id)}>Remove</button>
    </li>
  ));
};

export default FilteredList;
