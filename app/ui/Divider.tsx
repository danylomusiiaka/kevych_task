import { View, Text } from 'react-native'
import React from 'react'

export default function Divider({children}: {children: string}) {
  return (
    <View className="flex-row items-center mt-3">
      <View className="flex-1 border-t border-gray-300"></View>
      <Text className="mx-2 text-gray-400">{children}</Text>
      <View className="flex-1 border-t border-gray-300"></View>
    </View>
  );
}