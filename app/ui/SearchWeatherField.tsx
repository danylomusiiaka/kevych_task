import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import ArrowUp from "react-native-vector-icons/AntDesign";

export default function SearchWeatherField() {
  const router = useRouter();
  return (
    <View className="mt-3 space-y-3">
      <Text className="text-base text-gray-400">Search city you choose!</Text>
      <View className="relative">
        <TextInput className="rounded-md border border-gray-400 p-3 pl-2 pr-12" placeholder="ex. Tokyo" placeholderTextColor="#9ca3af" />
        <TouchableOpacity
          className="absolute right-0 transform rounded-lg rounded-l-none bg-blue-500 p-2.5"
          onPress={() => {
            router.push("/about");
          }}
        >
          <ArrowUp name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="flex-row space-x-2">
        <Text className="text-blue-500 underline">Tokyo</Text>
        <Text className="text-blue-500 underline">Amsterdam</Text>
      </View>
    </View>
  );
}
