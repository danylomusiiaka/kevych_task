import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BlurView } from "expo-blur";
import MainBlock from "./ui/MainBlock";

export default function DetailedResult() {
  const weather = useSelector((state: RootState) => state.weather.data);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: weather?.background }}>
      <View className="m-5 space-y-5">
        <MainBlock />
        <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
          <View className="flex items-center justify-center space-y-4 p-5">
            <Text className="text-xl font-light text-white">Львів</Text>
            <Text className="ml-4 text-7xl font-light text-white">{weather?.temp.toFixed(0)}°</Text>
            <View className="flex-row space-x-4">
              <Text className="text-xl font-light text-white">{weather?.description}</Text>
              <View className="border border-b" style={{ borderColor: weather?.background }}></View>
              <Text className="text-xl font-light text-white">Feels like {weather?.feels_like.toFixed(0)}°</Text>
            </View>
          </View>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}
