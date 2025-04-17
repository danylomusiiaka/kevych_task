import axios from "axios";
import { getWindDescription } from "./getWindDescription";
import { WeatherResponse } from "@/interfaces/weatherResponse";
import { getWeatherBackground } from "./getWeatherBackground";
const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export const getWeather = async (city: string): Promise<WeatherResponse> => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=us&appid=${apiKey}`);
  const { weather, main, wind } = response.data;
  const wind_info = getWindDescription(wind.speed);
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const background = getWeatherBackground(weather[0].description);
  return {
    main: weather[0].main,
    description: weather[0].description,
    icon,
    temp: main.temp,
    feels_like: main.feels_like,
    humidity: main.humidity,
    wind_speed: wind.speed,
    wind_description: wind_info.description,
    feel: wind_info.feel,
    background,
  };
};
