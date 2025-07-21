const Forecast = ({ icon, time, temp, text }) => {
  const hour = [...time].splice(11, 5).join("");
  return (
    <p>
      {hour} : <img src={icon} alt={text} /> {temp}&deg;C
    </p>
  );
};

export default Forecast;
