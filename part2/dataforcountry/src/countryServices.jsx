import axios from "axios";

var baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

const getAllCountryNames = () => {
  const request = axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then((response) => {
      return response.data.map((element) => {
        return element.name.common;
      });
    });
  return request;
};

const getCountryDataFromName = (name) => {
  const request = axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    .then((response) => {
      return response.data;
    });
  return request;
};

export default { getAllCountryNames, getCountryDataFromName };
