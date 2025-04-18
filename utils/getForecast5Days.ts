import axios from "axios";
import { formatIconForImage } from "./formatIconForImage";

const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export interface DailyMinMax {
  date: string;
  minTemp: string;
  maxTemp: string;
  icon: string;
}

const getDayLabel = (dateStr: string): string => {
  const inputDate = new Date(dateStr);
  const today = new Date();
  const isToday =
    inputDate.getDate() === today.getDate() && inputDate.getMonth() === today.getMonth() && inputDate.getFullYear() === today.getFullYear();

  if (isToday) return "Today";

  return inputDate.toLocaleDateString("en-US", { weekday: "long" });
};

// Пріоритет погоди
const getPriorityValue = (main: string): number => {
  const level1 = ["Rain", "Thunderstorm", "Snow", "Tornado"];
  const level2 = ["Clouds", "Mist", "Haze", "Fog", "Smoke", "Dust", "Sand", "Ash", "Squall"];

  if (level1.includes(main)) return 1;
  if (level2.includes(main)) return 2;
  return 3;
};

export const getForecast5Days = async (city: string): Promise<DailyMinMax[]> => {
  const res = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
    params: {
      q: city,
      units: "metric",
      appid: apiKey,
    },
  });

  const grouped: Record<string, { temps: number[]; weather: { main: string; icon: string }[] }> = {};

  res.data.list.forEach((item: any) => {
    const date = item.dt_txt.split(" ")[0];
    const temp = item.main.temp;
    const weather = item.weather[0];

    if (!grouped[date]) {
      grouped[date] = { temps: [], weather: [] };
    }

    grouped[date].temps.push(temp);
    grouped[date].weather.push(weather);
  });

  const result: DailyMinMax[] = Object.entries(grouped).map(([date, { temps, weather }]) => {
    const sortedWeather = weather.sort((a, b) => getPriorityValue(a.main) - getPriorityValue(b.main));
    const icon = formatIconForImage(sortedWeather[0].icon);

    return {
      date: getDayLabel(date),
      minTemp: Math.min(...temps).toFixed(0),
      maxTemp: Math.max(...temps).toFixed(0),
      icon,
    };
  });

  return result;
};
