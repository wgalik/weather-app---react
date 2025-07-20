const Result = ({ err, date, city, country, text, temp, wind, pressure, value }) => {
  const errorMessage = `Nie ma lokalizacji: ${value}`;
  const content = (
    <>
      <p>Lokalny czas: {date}</p>
      <p>Miasto: {city}</p>
      <p>Kraj: {country}</p>
      <p>Opis: {text}</p>
      <p>Temperatura: {temp} &deg;C</p>
      <p>Wiatr: {wind} k/h</p>
      <p>Ciśnienie: {pressure} hPa</p>
    </>
  );

  return <>{err ? errorMessage : content}</>;
};

export default Result;
