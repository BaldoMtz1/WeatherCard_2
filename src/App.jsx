import axios from "axios";
import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();
  const [iscelsius, setisCelsius] = useState(true)

  // Aqui obtenemos las coordenadas del Api del navegador y las montamos en un estado

  console.log(coords);

  const success = (pos) => {
    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    };

    setCoords(newCoords);
  };
  
   // FUNCION PARA CAMBIAR UNIDAD DE TEMP DE CELSIUS A FAHRENHEIT
  const changeUnitTemp = () => setisCelsius(!iscelsius)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  // --------------Peticion de datos a la Api de clima

  useEffect(() => {
    if (coords) {
      const API_KEY = "3b67df22f708b1a1fc5cc9328bf44b64";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${API_KEY}`;

      axios
        .get(URL)
        .then((res) => {
          const temKelvin = res.data.main.temp; // asi llega y posterior cambiar a unidad solicitada
          const temCelsius = (temKelvin - 273.15).toFixed(1) 
          const tempFahrenheit = ((temCelsius * 9 / 5  )  + 32).toFixed(1)  
          const newTemperature = {
            celsius: temCelsius,
            fahrenheit: tempFahrenheit,
          };
          setTemperature(newTemperature);
          setWeather(res.data);
        })

        .catch((err) => console.log(err));
    }
  }, [coords]);

  console.log(temperature);

  return (
    <div className="App">
      {weather ? (
        <WeatherCard 
        clima={weather} 
        temperatura={temperature}
        cambioUnidadTemp={changeUnitTemp}
        esCelsius ={iscelsius} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;