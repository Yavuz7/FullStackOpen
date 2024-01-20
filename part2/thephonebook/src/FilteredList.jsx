const FilteredList = ({ list }) => {
  return list.map((person) => (
    <li key={person.name}>
      {person.name} {person.number}
    </li>
  ));
};
export default FilteredList;
