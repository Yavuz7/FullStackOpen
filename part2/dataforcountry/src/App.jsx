import { useState, useEffect } from "react";
import countryServices from "./countryServices";
import CountryData from "./CountryData";
import WeatherData from "./WeatherData";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [arrayOfNames, setArrayOfNames] = useState(null);
  const [arrayOfFilteredNames, setArrayOfFilteredNames] = useState([]);
  const [dataOfSingleCountry, setDataOfSingleCountry] = useState([]);
  const [weatherOfSingleCountry, setWeatherOfSingleCountry] = useState([]);

  //Set Loading Screen Trick From : https://www.shecodes.io/athena/11556-react-how-to-show-a-loading-message-when-fetching-data
  const [loading, setLoading] = useState("");

  //This UseEffect Grabs all the country data and then makes a array of valid names
  useEffect(() => {
    setLoading("Now Loading: Country Search Data");
    countryServices
      .getAllCountryNames()
      .then((response) => setArrayOfNames(response));
    setLoading("Ready");
  }, []);
  // Debounce Function From : https://medium.com/p/43dfd8eafc1a
  //Though If You Ask Me this article looks ai generated as all hell
  useEffect(() => {
    if (searchQuery === "") {
      setLoading("Done");
      return;
    }
    if (arrayOfNames === null) {
      setLoading("Unable To Make Request Without Name Data Loaded");
      return;
    }
    setLoading("Now Loading: Country");
    const delayDebounceFn = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const filteredArray = arrayOfNames.filter((name) => {
        const lName = name.toLowerCase();
        if (lName.includes(query) != 0) {
          return name;
        }
      });
      if (filteredArray.length === 1) {
        setArrayOfFilteredNames(filteredArray);
        setLoading("Grabbing Country Data");
        countryServices
          .getCountryDataFromName(filteredArray[0])
          .then((response) => {
            setDataOfSingleCountry(response);
            setLoading("Done");
            return response;
          })
          .then((response) => {
            return countryServices
              .getCountryWeather(response.capital)
              .then((response) => setWeatherOfSingleCountry(response.data));
          });
      } else if (filteredArray.length <= 10) {
        setDataOfSingleCountry([]);
        setArrayOfFilteredNames(filteredArray);
        setLoading("Done");
      } else {
        setDataOfSingleCountry([]);
        setArrayOfFilteredNames([]);
        setLoading("Query is too broad,specify another filter");
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  function showCountry(country) {
    setArrayOfFilteredNames([country]);
    setSearchQuery(country);
    setLoading("Grabbing Country Data");
    countryServices.getCountryDataFromName(country).then((response) => {
      setDataOfSingleCountry(response);
      setLoading("Done");
    });
  }
  return (
    <>
      <h2>Find Countries</h2>
      <p>Note This Website uses debounce to avoid excessive calls</p>
      <input
        value={searchQuery}
        key="searchQuery"
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading ? <p>{loading}</p> : null}
      <ul>
        {arrayOfFilteredNames.length === 1 ? (
          <>
            <CountryData Data={dataOfSingleCountry} />
            <WeatherData Data={weatherOfSingleCountry} />
          </>
        ) : (
          arrayOfFilteredNames.map((country) => (
            <>
              <li key={country}>
                {country} {""}
                <button onClick={() => showCountry(country)}>Show</button>
              </li>
            </>
          ))
        )}
      </ul>
    </>
  );
}

export default App;
