import { View, Text } from "react-native";
import React from "react";
import FlipCard from "@/app/detailed_result/ui/Flipcard";
import Wind from "react-native-vector-icons/Fontisto";
import Touch from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function WindBlock() {
  const weather = useSelector((state: RootState) => state.weather.data);

  return (
    <FlipCard
      front={
        <View className="flex justify-center space-y-4 p-5">
          <View className="flex-row justify-between">
            <View className="flex-row items-center space-x-4">
              <Wind name="wind" size={34} color="white" />
              <Text className="text-xl font-light text-white">About wind</Text>
            </View>
            <Touch name="touch-app" size={34} color="white" />
          </View>

          <Text className="text-xl font-light text-white">
            {weather?.wind_speed} m/s with humidity {weather?.humidity} %
          </Text>
          <View className="border border-b" style={{ borderColor: weather?.background }}></View>
          <Text className="text-xl font-light text-white">Feels like {weather?.wind_description}</Text>
        </View>
      }
      back={
        <View className="flex justify-center space-y-4 p-5">
          <View className="flex-row items-center space-x-4">
            <Wind name="wind" size={34} color="white" />
            <Text className="text-xl font-light text-white">Details</Text>
          </View>

          <Text className="text-xl font-light text-white">
            Wind {weather?.wind_speed} m/s with {weather?.wind_deg}° direction
          </Text>
          <View className="border border-b" style={{ borderColor: weather?.background }}></View>
          <Text className="text-xl font-light text-white">Visibility in such weather is {(weather!.visibility / 1000).toFixed(0)} km</Text>
        </View>
      }
    />
  );
}
