const WeatherData = ({ Data }) => {
  let temperature;
  let imgSrc;
  if (Data.main) {
    temperature = Data.main.temp;
    temperature = ((temperature - 273.15) * 9) / 5 + 32;
    temperature = temperature.toFixed(2);

    let icon = Data.weather[0].icon;
    imgSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  return (
    <>
      <h3>Weather in {Data.name}</h3>
      <li>Temperature : {temperature} F</li>
      <img src={imgSrc} alt="WeatherIcon"></img>
      <li>Wind Speed: {Data.wind.speed}</li>
    </>
  );
};

export default WeatherData;
