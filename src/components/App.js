import "./App.css";
import { useState } from "react";

import Form from "./Form";
import Result from "./Result";

const API_key = "1a51d915ecd44b3d88c105522252007";

function App() {
  const [value, setValue] = useState("");

  const [err, setErr] = useState(false);

  const [localWeather, setLocalWeather] = useState({
    date: "",
    city: "",
    country: "",
    text: "",
    temp: "",
    wind: "",
    pressure: "",
  });

  const handleChange = (e) => {
    setValue(e.target.value);
    if (err) setErr(false);
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();

    const API = `http://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=${value}&days=7`;

    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response;
        }
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setLocalWeather({
          date: data.location.localtime,
          city: data.location.name,
          country: data.location.country,
          text: data.current.condition.text,
          temp: data.current.temp_c,
          wind: data.current.wind_kph,
          pressure: data.current.pressure_mb,
        });
        setValue("");
      })
      .catch(() => {
        setErr(true);
      });
  };

  return (
    <div className="App">
      Aplikacja pogodowa
      <Form value={value} change={handleChange} submit={handleCitySubmit} />
      {localWeather.city ? (
        <Result err={err} {...localWeather} value={value} />
      ) : null}
    </div>
  );
}

export default App;
