import React, { useState, useEffect } from "react";
import StateList from "./StateList";

const Weather = () => {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "...",
    temperature: "...",
    feelsLike: "...",
    humidity: "...",
    tempMax: "...",
    tempMin: "...",
    wind: "...",
  });

  const [ctrlSearch, setCtrlSearch] = useState("");
  const [location, setLocation] = useState({
    city: "los angeles",
    state: "california",
  });

  const getWeather = async (city, state) => {
    try {
      console.log("INFO", city, state);
      const response = await fetch(
        `//api.openweathermap.org/data/2.5/weather?q=${city},${state}&units=imperial&appid=ca3ff5d7732b4af049db6f42dd06e767`,
        { mode: "cors" }
      );

      const data = await response.json();
      console.log(data);

      setWeatherInfo({
        city: data.name,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        wind: data.wind.speed,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSearchInput = (event) => {
    setCtrlSearch(event.target.value);
  };

  const handleSearchClick = (city, state) => {
    console.log("BEfORE", city, state);
    setLocation({
      city: city,
      state: state,
    });
    getWeather(city, state);
    console.log("After", city, state);
    setCtrlSearch("");
  };

  // componentDidMount(); to get default location weather data
  useEffect(() => {
    getWeather(location.city.split(" ").join("+"), location.state);
  }, [location]);

  return (
    <div>
      <h1>Odin Weather</h1>
      <h2>City: {weatherInfo.city}</h2>
      <h2>Current Temperature: {weatherInfo.temperature}°F</h2>
      <h2>Feels like: {weatherInfo.feelsLike}°F</h2>
      <h2>Humidity: {weatherInfo.humidity}%</h2>
      <h2>Wind speed: {weatherInfo.wind}mph</h2>
      <h2>
        Min: {weatherInfo.tempMin}°F / Max: {weatherInfo.tempMax}°F
      </h2>
      <br />
      <div>
        <label>Change City:</label>
        <br />
        <input
          id="search-input"
          type="text"
          onChange={handleSearchInput}
          value={ctrlSearch}
          placeholder={location.city}
        />

        <label>State:</label>

        <select id="state-dropdown" name="state-selection">
          {StateList.map((state) => {
            return (
              <option
                selected={state.name === "california" ? true : false}
                key={state.id}
                value={state.name}
              >
                {state.name.replace(/\w\S*/g, (w) =>
                  w.replace(/^\w/, (c) => c.toUpperCase())
                )}
              </option>
            );
          })}
        </select>

        <button
          onClick={() =>
            handleSearchClick(
              document.getElementById("search-input").value,
              document.getElementById("state-dropdown").value
            )
          }
        >
          Search
        </button>
      </div>
      <h2>Current search: {ctrlSearch}</h2>
    </div>
  );
};

export default Weather;
