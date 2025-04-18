import axios from "axios";
import { getWindDescription } from "./getWindDescription";
import { WeatherResponse } from "@/interfaces/weatherResponse";
import { getWeatherBackground } from "./getBackground";
import { formatIconForImage } from "./formatIconForImage";
const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export const getWeather = async (city: string): Promise<WeatherResponse> => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      q: city,
      units: "metric",
      appid: apiKey,
    },
  });
  const { weather, main, wind, visibility } = response.data;
  const wind_info = getWindDescription(wind.speed);
  const icon = formatIconForImage(weather[0].icon);
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
    wind_deg: wind.deg,
    feel: wind_info.feel,
    visibility,
    background,
  };
};
