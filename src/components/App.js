import "./App.scss";
import { useState, useEffect } from "react";

import Form from "./Form";
import Result from "./Result";

const API_key = "1a51d915ecd44b3d88c105522252007";

function App() {
  const [value, setValue] = useState("");

  const [err, setErr] = useState(false);

  const [localWeather, setLocalWeather] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (err) setErr(false);
  };

  useEffect(() => {
    const API = `http://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=${value}&days=7`;

    const form = document.querySelector("form");
    const input = form.querySelector("input");
    input.focus();

    if (value) {
      fetch(API)
        .then((response) => {
          if (response.ok) {
            return response;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          setLocalWeather(data);
        })
        .catch(() => {
          setErr(true);
        });
    }
  }, [value]);

  return (
    <div className="App">
      <Form value={value} change={handleChange} />
      {value.length > 2 ? (
        <Result err={err} {...localWeather} value={value} />
      ) : null}
    </div>
  );
}

export default App;
