import axios from "axios";
import React, { useEffect, useState } from "react";
import "./weather.css";
import clearsky from "../../images/weather/clear sky.png";
import fewClouds from "../../images/weather/few clouds.png";
import brokenClouds from "../../images/weather/broken clouds.png";
import mist from "../../images/weather/mist.png";
import rain from "../../images/weather/rain.png";
import scatteredClouds from "../../images/weather/scattered clouds.png";
import showerRain from "../../images/weather/shower rain.png";
import snow from "../../images/weather/snow.png";
import thunderstrom from "../../images/weather/thunderstorm.png";

export default function Weather() {
  const [cityName, setCityName] = useState("");
  const [temp, setTemp] = useState(Number);
  const [weather, setWeather] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");

  const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;

  //Open Weather API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${APIKEY}
    `;

  const getWeather = async () => {
    const data = await axios({
      method: "get",
      url: url,
    });
    console.log(data);
    setCityName(data.data.name); // 도시 이름
    setTemp(Math.round(data.data.main.temp - 273.15)); //온도 화씨를 섭씨로 변경
    setWeather(data.data.weather[0].main); //날씨
  };

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    if (weather === "Clear") {
      setWeatherIcon(clearsky);
    } else if (weather === "Snow") {
      setWeatherIcon(snow);
    } else if (weather === "Clouds") {
      setWeatherIcon(scatteredClouds);
    } else if (weather === "Drizzle") {
      setWeatherIcon(brokenClouds);
    } else if (weather === "Thunderstorm") {
      setWeatherIcon(thunderstrom);
    } else if (weather === "Rain") {
      setWeatherIcon(showerRain);
    } else if (weather === "Mist") {
      setWeatherIcon(mist);
    }
  }, [weather]);

  return (
    <>
      <div className="weather-container">
        <h1>오늘의 날씨</h1>

        <span>지역:서울</span>
        <span>온도:{temp}℃</span>
        <div className="temp">
          {temp < 0 ? (
            <span>날씨가 춥습니다. 겉 옷을 챙겨입으세요.</span>
          ) : null}
          {temp < 5 ? (
            <span>날씨가 쌀쌀합니다. 두터운 자켓을 입으세요!</span>
          ) : null}
          {temp >= 5 ? <span>패딩은 넣어놔도 될 거 같아요!</span> : null}
          {temp > 10 ? <span>가벼운 자켓을 입으시는건 어떨까요?</span> : null}
        </div>
        <span className="weather-icon-box">
          날씨: <img src={weatherIcon} />
        </span>
      </div>
    </>
  );
}
