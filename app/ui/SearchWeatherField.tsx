import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Search from "react-native-vector-icons/AntDesign";
import { BlurView } from "expo-blur";

export default function SearchWeatherField() {
  const router = useRouter();
  return (
    <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
      <View className="space-y-3 p-3">
        <Text className="text-lg font-semibold text-white">Search city you choose!</Text>
        <View className="relative">
          <TextInput
            className="mt-[0.5px] rounded-md border border-white p-3 pl-2 pr-12 font-medium text-white"
            placeholder="ex. Tokyo"
            placeholderTextColor="white"
          />

          <TouchableOpacity
            className="absolute right-2 top-2 transform rounded-lg rounded-l-none"
            onPress={() => {
              router.push("/");
            }}
          >
            <Search name="search1" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row space-x-2">
          <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
            <Text className="px-4 py-2 text-white">Tokyo</Text>
          </BlurView>
          <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
            <Text className="px-4 py-2 text-white">Amsterdam</Text>
          </BlurView>
        </View>
      </View>
    </BlurView>
  );
}
