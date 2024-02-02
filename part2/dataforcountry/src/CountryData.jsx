const CountryData = ({ Data }) => {
  if (!Data.flags) {
    return <p>LOADING DATA</p>;
  }
  const languages = [];
  if (Data.languages) {
    Object.values(Data.languages).forEach((language) => {
      languages.push(<li key={language}>{language}</li>);
    });
  }
  return (
    <>
      <li key={Data.capital}>Capital : {Data.capital}</li>
      <li key={Data.area}>Area : {Data.area}</li>
      <h3>Languages:</h3>
      {languages}
      {<img src={Data.flags.png} alt="flagHere" />}
    </>
  );
};

export default CountryData;
