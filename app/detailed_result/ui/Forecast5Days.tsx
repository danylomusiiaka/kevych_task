import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import { DailyMinMax, getForecast5Days } from "@/utils/getForecast5Days";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Forecast5Days() {
  const city = useSelector((state: RootState) => state.weather.data?.city);
  const [weather, setWeather] = useState<DailyMinMax[]>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getForecast5Days("Lviv");
      setWeather(result);
    };
    getData();
  }, [city]);

  return (
    <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden", marginTop: 10 }}>
      <View className="space-y-3 p-5">
        <Text className="text-xl font-light text-white">5-day forecast</Text>
        {weather.map((el, id) => {
          return (
            <View key={id} className="w-full flex-row items-center justify-between">
              <Text className="text-nowrap w-24 text-left text-base font-light text-white">{el.date}</Text>
              <Image source={{ uri: el.icon }} style={{ width: 50, height: 50 }} className="flex w-1/5 items-center justify-center" />
              <Text className="text-nowrap text-center text-base font-light text-white">{el.minTemp}°</Text>
              <View className="h-0.5 w-16 flex-row items-center justify-center">
                <View className="h-full flex-1 bg-black"></View>
                <View className="h-full flex-1 bg-white"></View>
              </View>
              <Text className="text-nowrap text-right text-base font-light text-white">{el.maxTemp}°</Text>
            </View>
          );
        })}
      </View>
    </BlurView>
  );
}
