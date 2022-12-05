import React from "react";

const WeatherCard = ({ clima , temperatura , cambioUnidadTemp, esCelsius}) => {
  console.log(clima);
  return (
    <article className="Card_Wether">
      <h1>Wether App</h1>
      <h3>{`${clima?.name}, ${clima?.sys.country}`}</h3>

      <section className="Weather_body">
        <div>
          <img className="img-animation"
            src={` http://openweathermap.org/img/wn/${clima?.weather[0].icon}@4x.png`}
            alt=""
          />
        </div>

        <ul className="Wether_letters">
          <li>{clima.weather[0].description}</li>
          <li>Wind speed: {clima.wind.speed} m/s</li>
          <li>Clouds: {clima.clouds.all} %</li>
          <li>Pressure: {clima.main.pressure} hPa</li>
        </ul>
      </section>

      <p>{esCelsius ? `${temperatura.celsius} °C` : `${temperatura.fahrenheit} °F` } </p>

      <button onClick={cambioUnidadTemp}>Degrees °F/C°</button>
    </article>
  );
};





export default WeatherCard;