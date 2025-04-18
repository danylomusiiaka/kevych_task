import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import Chevron from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";

export default function PropositionToAuth() {
  const router = useRouter();

  return (
    <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
      <View className="my-2 space-y-4 rounded-md p-3">
        <Text className="text-xl font-medium text-white">Want to save more search queries?</Text>
        <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
          <TouchableOpacity className="flex-row items-center justify-center rounded-md p-3" onPress={() => router.push("/(auth)/registration")}>
            <Text className="font-medium text-white">Go to authentication</Text>
            <Chevron name="chevron-right" size={18} color="white"></Chevron>
          </TouchableOpacity>
        </BlurView>
      </View>
    </BlurView>
  );
}
