import axios from "axios";
const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export const getToday3HourForecast = async (city: string) => {
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
    params: {
      q: city,
      units: "metric",
      appid: apiKey,
    },
  });

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const forecastList = res.data.list;

  const todayForecast = forecastList.filter((item: any) => item.dt_txt.startsWith(todayStr));

  const midnightTomorrow = forecastList.find((item: any) => item.dt_txt === `${tomorrowStr} 00:00:00`);

  if (midnightTomorrow) {
    todayForecast.push(midnightTomorrow);
  }

  return todayForecast;
};
