import { View, Text, Linking, TouchableOpacity } from "react-native";
import React from "react";

export default function NoLocationEnabled() {
  return (
    <View className="mb-4 space-y-3">
      <Text className="text-3xl font-extralight text-white">Welcome to Weather App!</Text>
      <View className="space-y-3">
        <Text className="text-red-400">
          * Your location settings are disabled. To automatically get the weather forecast for your city – please,
          <Text className="font-bold"> enable geolocation </Text>
          and swipe down to refresh
        </Text>

        <TouchableOpacity
          className="flex items-center rounded-md bg-blue-500 p-3"
          onPress={() => {
            Linking.openSettings();
          }}
        >
          <Text className="h-5 font-medium text-white">Open geolocation settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
