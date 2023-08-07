import "./App.css";
import { useState } from "react";
import axios from "./axios";

function App() {
  const [location, setLocation] = useState("");
  const [info, setInfo] = useState({
    city: "-",
    temp: null,
    desc: "-",
    icon: "-",
    feels: "-",
    min: "-",
    max: "-",
    humidity: "-",
    speed: "-",
    pressure: "-",
  });

  const API_KEY = "fc18f5b6a9905f24c3ef3b12ebe5166e";

  const displayMessage = () => {
    async function fetchData() {
      try {
        const request = await axios.get(
          `/weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        console.log(request.data);
        setInfo({
          city: request.data.name,
          temp: request.data.main.temp,
          desc: request.data.weather[0].main,
          icon: request.data.weather.icon,
          feels: request.data.main.feels_like,
          min: request.data.main.temp_min,
          max: request.data.main.temp_max,
          humidity: request.data.main.humidity,
          speed: request.data.wind.speed,
          pressure: request.data.main.pressure,
        });
      } catch (error) {
        alert("Please enter valid city name");
      }
    }
    fetchData();
  };

  return (
    <div className="App">
      <header>
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            value={location}
            placeholder="Search a city"
            onChange={(event) => setLocation(event.target.value)}
          />
          <button onClick={displayMessage} className="searchButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="search"
            >
              <g data-name="Layer 2">
                <path
                  d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
                  data-name="search"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </header>
      <div className="banner">
        <h2 className="city_name">
          <svg viewBox="0 0 24 24" id="location-pin">
            <path d="M11,11.9V17a1,1,0,0,0,2,0V11.9a5,5,0,1,0-2,0ZM12,4A3,3,0,1,1,9,7,3,3,0,0,1,12,4Zm4.21,10.42a1,1,0,1,0-.42,2C18.06,16.87,19,17.68,19,18c0,.58-2.45,2-7,2s-7-1.42-7-2c0-.32.94-1.13,3.21-1.62a1,1,0,1,0-.42-2C4.75,15.08,3,16.39,3,18c0,2.63,4.53,4,9,4s9-1.37,9-4C21,16.39,19.25,15.08,16.21,14.42Z"></path>
          </svg>
          {info.city}
        </h2>
        <div className="temperature">
          <h2 className="temp">{Math.round(info.temp)}</h2>
          <p className="unit">℃</p>
        </div>
        <h3 className="description">{info.desc}</h3>

        <div className="banner_fadeBottom" />
      </div>
      <div className="details">
        <div className="item1">
          <label>Feels like</label>
          <p>{Math.round(info.feels)} ℃</p>
        </div>
        <div className="item1">
          <label>Minimum Temperature</label>
          <p>{Math.round(info.min)} ℃</p>
        </div>
        <div className="item1">
          <label>Maximum Temperature</label>
          <p>{Math.round(info.max)} ℃</p>
        </div>
        <div className="item1">
          <label>Humidity</label>
          <p>{info.humidity}%</p>
        </div>
        <div className="item1">
          <label>Pressure</label>
          <p>{info.pressure} hPa</p>
        </div>
        <div className="item1">
          <label>Wind Speed</label>
          <p>{info.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}

export default App;
