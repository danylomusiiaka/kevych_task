import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

export default function PropositionToVerifyEmail({ onRefresh }: { onRefresh: () => void }) {
  return (
    <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
      <View className="my-2 space-y-4 rounded-md p-3">
        <Text className="text-xl font-medium text-white">You are almost there!</Text>
        <Text className="font-medium text-white">Please check your mail box and verify your email!</Text>
        <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
          <TouchableOpacity className="flex-row items-center justify-center rounded-md p-3" onPress={onRefresh}>
            <Text className="font-medium text-white">Check my verification</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </BlurView>
  );
}
