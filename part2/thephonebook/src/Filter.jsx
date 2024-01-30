const Filter = ({ value, onChange }) => {
  return (
    <>
      Filter Shown With{" "}
      <input value={value} onChange={onChange} id="filterInput" />
    </>
  );
};

export default Filter;
