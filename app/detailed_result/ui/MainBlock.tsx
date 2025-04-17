import { View, Text } from "react-native";
import { BlurView } from "expo-blur";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function MainBlock() {
  const weather = useSelector((state: RootState) => state.weather.data);
  const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden"}}>
      <View className="flex items-center justify-center space-y-4 p-5">
        <Text className="text-xl font-light text-white">Львів</Text>
        <Text className="ml-4 text-7xl font-light text-white">{weather?.temp.toFixed(0)}°</Text>
        <View className="flex-row space-x-4">
          <Text className="text-xl font-light text-white">{weather?.description && capitalizeFirst(weather.description)}</Text>
          <View className="border border-b" style={{ borderColor: weather?.background }}></View>
          <Text className="text-xl font-light text-white">Feels like {weather?.feels_like.toFixed(0)}°</Text>
        </View>
      </View>
    </BlurView>
  );
}
