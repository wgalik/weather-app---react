import Forecast from "./Forecast";

import "./Result.scss";

const Result = ({ current, forecast, location }) => {
  const localtimeHour = [...location.localtime].splice(11, 2).join("");
  const localtimeMinutes = [...location.localtime].splice(14, 2).join("");
  const localtimeDay = [...location.localtime].splice(8, 2).join("");
  const localtimeMonth = [...location.localtime].splice(5, 2).join("");
  const localtimeYear = [...location.localtime].splice(0, 4).join("");
  const localtimeDate = `${localtimeDay}.${localtimeMonth}.${localtimeYear}`;

  const sunrise = [...forecast.forecastday[0].astro.sunrise]
    .splice(0, 5)
    .join("");
  const sunset = [...forecast.forecastday[0].astro.sunset]
    .splice(0, 5)
    .join("");

  let forecastToday = forecast.forecastday[0].hour.filter(
    (hour) => hour.time_epoch > location.localtime_epoch
  );

  forecastToday = forecastToday.map((hour) => (
    <Forecast
      key={hour.time}
      time={hour.time}
      temp={hour.temp_c}
      icon={hour.condition.icon}
      text={hour.condition.text}
    />
  ));

  let forecastTomorrow = forecast.forecastday[1].hour.map((hour) => (
    <Forecast
      key={hour.time}
      time={hour.time}
      temp={hour.temp_c}
      icon={hour.condition.icon}
      text={hour.condition.text}
    />
  ));

  forecastTomorrow = forecastTomorrow.splice(0, 24 - forecastToday.length);

  return (
    <>
      <header>
        <h1>{location.name}</h1>
        <h5>{location.country}</h5>
        <div>
          <p>
            {localtimeHour}
            <span className="colon">:</span>
            {localtimeMinutes}
          </p>
          <p>{localtimeDate}</p>
        </div>
        <div>
          <p>Sunrise: {sunrise}</p>
          <p>Sunset: {sunset}</p>
        </div>
      </header>

      <section className="actualWeather">
        <h1>{current.temp_c}&deg;C</h1>
        <p>{current.condition.text}</p>
        <img
          className="weatherIcon"
          src={current.condition.icon}
          alt={current.condition.text}
        />
      </section>
      <section className="weatherInfo">
        <p>
          Feels like temperature <span>{current.dewpoint_c}&deg;C</span>
        </p>
        <p>
          Atmospheric pressure <span>{current.pressure_mb} hPa</span>
        </p>
        <p>
          Wind{" "}
          <span>
            {current.wind_kph} k/h {current.wind_dir}
          </span>
          , gust up to <span>{current.dewpoint_c} k/h</span>
        </p>

        <p>
          Humidity <span>{current.humidity}%</span>
        </p>
      </section>
      <section className="forecastWeather">
        <h3>Next 24 hours:</h3>
        <div>
          {forecastToday}
          {forecastTomorrow}
        </div>
      </section>
    </>
  );
};

export default Result;
