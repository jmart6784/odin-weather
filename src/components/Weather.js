import React, { useState, useEffect } from "react";
import StateList from "./StateList";

const Weather = () => {
  const [loading, setLoading] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState({
    city: "...",
    state: "...",
    temperature: "...",
    feelsLike: "...",
    humidity: "...",
    wind: "...",
  });

  const [ctrlSearch, setCtrlSearch] = useState("");
  const [location, setLocation] = useState({
    city: "los angeles",
    state: "california",
  });

  const getWeather = async (city, state) => {
    try {
      const response = await fetch(
        `//api.openweathermap.org/data/2.5/weather?q=${city},${state}&units=imperial&appid=ca3ff5d7732b4af049db6f42dd06e767`,
        { mode: "cors" }
      );

      const data = await response.json();

      if (data) {
        setLoading(false);
      }

      setWeatherInfo({
        city: data.name,
        state: "",
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
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
    setLocation({
      city: city,
      state: state,
    });
    getWeather(city, state);
    setCtrlSearch("");
  };

  // componentDidMount(); to get default location weather data
  useEffect(() => {
    getWeather(location.city.split(" ").join("+"), location.state);
  }, [location]);

  if (loading) {
    return (
      <div id="weather-container">
        <h1 id="loading">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div id="weather-container">
        <h1 className="title">Odin Weather</h1>

        <div id="weather-info-container">
          <h1 id="current-temp" className="weather-info">
            {Math.round(parseInt(weatherInfo.temperature))}°F
          </h1>
          <h2 id="city-name" className="weather-info">
            {weatherInfo.city}
          </h2>
          <h2 className="weather-info">
            Feels like {Math.round(parseInt(weatherInfo.feelsLike))}°F
          </h2>
          <h2 className="weather-info">
            Humidity {Math.round(parseInt(weatherInfo.humidity))}%
          </h2>
          <h2 className="weather-info">
            Wind speed {Math.round(parseInt(weatherInfo.wind))}mph
          </h2>
        </div>

        <div id="inputs-container">
          <div className="input-label">
            <label className="search-label">Change City:</label>
            <input
              id="search-input"
              className="search-inputs"
              type="text"
              onChange={handleSearchInput}
              value={ctrlSearch}
              placeholder={location.city.replace(/\w\S*/g, (w) =>
                w.replace(/^\w/, (c) => c.toUpperCase())
              )}
            />
          </div>

          <div className="input-label">
            <label className="search-label">State:</label>

            <select
              id="state-dropdown"
              className="search-inputs"
              name="state-selection"
            >
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
          </div>

          <button
            id="search-btn"
            onClick={() =>
              handleSearchClick(
                document.getElementById("search-input").value.toLowerCase(),
                document.getElementById("state-dropdown").value
              )
            }
          >
            Search
          </button>
        </div>
      </div>
    );
  }
};

export default Weather;
