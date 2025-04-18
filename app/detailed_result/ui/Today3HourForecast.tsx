import { View, Text, Image } from "react-native";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { getToday3HourForecast } from "@/utils/getToday3HourForecast";
import { formatIconForImage } from "@/utils/formatIconForImage";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface IToday3HourForecast {
  temp: number;
  date: string;
  icon: string;
}

export default function Today3HourForecast() {
  const city = useSelector((state: RootState) => state.weather.data?.city);
  const [weather, setWeather] = useState<IToday3HourForecast[]>([]);
  
  useEffect(() => {
    const getData = async () => {
      if (city) {
        const data = await getToday3HourForecast(city);
        const formatted = data.map((element: any) => ({
          temp: element.main.temp,
          date: element.dt_txt.split(" ")[1].split(":")[0],
          icon: formatIconForImage(element.weather[0].icon),
        }));
        setWeather(formatted);
      }
    };
    getData();
  }, [city]);

  return (
    <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden", marginTop: 10 }}>
      <View className="space-y-3 p-5">
        <Text className="text-xl font-light text-white">Forecast for today</Text>
        <View className="flex-row justify-between">
          {weather.map((el: IToday3HourForecast, index) => {
            return (
              <View key={index} className="flex items-center">
                <Text className="text-lg text-white">{el.date}</Text>
                <Image source={{ uri: el.icon }} style={{ width: 50, height: 50 }} />
                <Text className="text-lg text-white">{el.temp.toFixed(0)}°</Text>
              </View>
            );
          })}
        </View>
      </View>
    </BlurView>
  );
}
