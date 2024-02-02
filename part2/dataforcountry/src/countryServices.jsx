import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

const getAllCountryNames = () => {
  const request = axios.get(`${baseUrl}api/all`).then((response) => {
    return response.data.map((element) => {
      return element.name.common;
    });
  });
  return request;
};

const getCountryDataFromName = (name) => {
  const request = axios.get(`${baseUrl}/api/name/${name}`).then((response) => {
    return response.data;
  });
  return request;
};

const getCountryWeather = (name) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${
      import.meta.env.VITE_API_KEY_WEATHER
    }`
  );
  return request;
};

export default {
  getAllCountryNames,
  getCountryDataFromName,
  getCountryWeather,
};
