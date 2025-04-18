import axios from "axios";
const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export const getEnglishNameForCity = async (city: string) => {
  const apiUrlForEnglishName = `http://api.openweathermap.org/geo/1.0/direct`;
  const response = await axios.get(apiUrlForEnglishName, {
    params: {
      q: city,
      units: "metric",
      appid: apiKey,
    },
  });
  return response?.data[0]?.name || "";
};
