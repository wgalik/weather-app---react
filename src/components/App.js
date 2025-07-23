import "./App.scss";
import { useState, useEffect, useLayoutEffect } from "react";

import Form from "./Form";
import Result from "./Result";

const API_key = process.env.REACT_APP_API_KEY;

function App() {
  const [value, setValue] = useState("");
  const [err, setErr] = useState(false);
  const [localWeather, setLocalWeather] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    if (err) setErr(false);
  };

  useLayoutEffect(() => {
    const form = document.querySelector("form");
    const input = form.querySelector("input");
    input.focus();
  }, []);

  useEffect(() => {
    const API = `http://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=${value}&days=7`;

    if (value) {
      fetch(API)
        .then((response) => {
          if (response.ok) {
            return response;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          setLocalWeather(data);
        })
        .catch(() => {
          setErr(true);
        });
    }
  }, [value]);

  return (
    <div className="App">
      <Form value={value} change={handleChange} submit={handleSubmit} />
      {value.length > 2 ? <Result {...localWeather} /> : null}
    </div>
  );
}

export default App;
