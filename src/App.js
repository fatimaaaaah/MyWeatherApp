import React, { useState, useEffect } from "react";
import "./App.css";
import sunnyImage from './sunnyImage.png';
import cloudyImage from './sunnyImage.png';
import Capture from './2.PNG';
import Capture1 from './Capture.PNG';
import Capture2 from './3µ.PNG';
import Capture3 from './4.PNG';

function App() {
  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [region, setRegion] = useState("");
  const [pays, setPays] = useState("");
  const [leverSoleil, setLeverSoleil] = useState("");
  const [coucherSoleil, setCoucherSoleil] = useState("");
  const [precipitations, setPrecipitations] = useState("");
  const [humidite, setHumidite] = useState("");
  const [vent, setVent] = useState("");
  const [heureMeteo, setHeureMeteo] = useState("");
  const [temperatureClass, setTemperatureClass] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isReady, setReady] = useState(false);

  // Structure de données pour les prévisions des jours suivants
  const forecasts = [
    { day: "mar. 14 mai", temperature: "41 / 22°C", description: "ciel clair" , demontration: Capture1},
    { day: "mer. 15 mai", temperature: "39 / 21°C", description: "nuages brisés"   , demontration: Capture},
    { day: "jeu. 16 mai", temperature: "39 / 20°C", description: "ciel clair"  , demontration: Capture1 },
    { day: "ven. 17 mai", temperature: "39 / 19°C", description: "nuages dispersés"   , demontration: Capture2},
    { day: "sam. 18 mai", temperature: "39 / 19°C", description: "ciel clair"  , demontration: Capture1 },
    { day: "dim. 19 mai", temperature: "39 / 21°C", description: "quelques nuages"   , demontration: Capture3},
    // Ajoutez les prévisions pour les autres jours suivants ici
  ];

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleSubmit = () => {
    fetchWeatherData(latitude, longitude);
  };

  const fetchWeatherData = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8987cbd1a6da10bc96c17330b5fa35db&units=metric`
    )
      .then((result) => result.json())
      .then((jsonresult) => {
        setTemp(jsonresult.main.temp);
        setDesc(jsonresult.weather[0].main);
        setIcon(jsonresult.weather[0].icon);
        setRegion(jsonresult.name);
        setPays(jsonresult.sys.country);
        setLeverSoleil(new Date(jsonresult.sys.sunrise * 1000).toLocaleTimeString());
        setCoucherSoleil(new Date(jsonresult.sys.sunset * 1000).toLocaleTimeString());
        setPrecipitations(jsonresult.clouds.all);
        setHumidite(jsonresult.main.humidity);
        setVent(jsonresult.wind.speed);
        const date = new Date(jsonresult.dt * 1000);
        setHeureMeteo(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
        setTemperatureClass(getTemperatureClass(jsonresult.main.temp));
        setReady(true);
      })
      .catch((err) => console.error(err));
  };

  const getTemperatureClass = (temperature) => {
    if (temperature >= 30) {
      return "hot";
    } else if (temperature <= 10) {
      return "cold";
    } else {
      return "normal";
    }
  };

  return (
    <div className="container">
      <h2>Mon Application Météo</h2>
      <p> Avec My WeatherApp restez informé des conditions météorologiques en temps réel, où que vous soyez, et planifiez vos activités en conséquence.</p>
      
      <div className="content-container">
        <div className="form-container">
          <h3>Entrez les coordonnées géographiques</h3>
          <div>
            <label htmlFor="latitude">Latitude: </label>
            <input
              type="text"
              id="latitude"
              placeholder="Latitude"
              value={latitude}
              onChange={handleLatitudeChange}
            />
          </div>
          <div>
            <label htmlFor="longitude">Longitude: </label>
            <input
              type="text"
              placeholder="Longitude"
              id="longitude"
              value={longitude}
              onChange={handleLongitudeChange}
            />
          </div>
          <button onClick={handleSubmit}>La météo</button>
        </div>
        <div className={`info-container ${temperatureClass}`}>
          {isReady ? (
            <div>
              <h2>Informations météorologiques</h2>
              <table className="weather-table">
                <tbody>
                  <tr>
                    <th>Pays</th>
                    <td>{pays}</td>
                  </tr>
                  <tr>
                    <th>Ville</th>
                    <td>{region}</td>
                  </tr>
                  <tr>
                    <th>Température</th>
                    <td>{temp} °C ({((temp * 9) / 5 + 32).toFixed(2)} °F)</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{desc}</td>
                  </tr>
                  <tr>
                    <th>Illustration du temps</th>
                    <td>
                      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt="Icône météo" className="weather-icon" />
                    </td>
                  </tr>
                  <tr>
                    <th>Lever de soleil</th>
                    <td>{leverSoleil}</td>
                  </tr>
                  <tr>
                    <th>Coucher de soleil</th>
                    <td>{coucherSoleil}</td>
                  </tr>
                  <tr>
                    <th>Précipitations</th>
                    <td>{precipitations}%</td>
                  </tr>
                  <tr>
                    <th>Humidité</th>
                    <td>{humidite}% - La quantité de vapeur d'eau présente dans l'air.</td>
                  </tr>
                  <tr>
                    <th>Vent</th>
                    <td>{vent} km/h - La vitesse du vent.</td>
                  </tr>
                </tbody>
              </table>
              <p>Remarque : Les heures indiquées pour le lever et le coucher du soleil sont basées sur l'heure locale.</p>
            </div>
          ) : (
            <div className="loading-container">
              <div className="loading-circle"></div>
              <p>Chargement en cours...</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Section pour afficher les prévisions des jours suivants */}
      <div className="prevision">
        <h2>Prévisions pour les 6 jours suivants</h2>
        <table className="forecast-table">
          <thead>
            <tr>
              <th>Jour</th>
              <th>Température</th>
              <th>Description</th>
              <th>Démontration</th>
            </tr>
          </thead>
          <tbody>
            {forecasts.map((forecast, index) => (
              <tr key={index}>
                <td>{forecast.day}</td>
                <td>{forecast.temperature}</td>
                <td>{forecast.description}</td>
                <td><img src={forecast.demontration} alt="Démonstration météorologique" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
