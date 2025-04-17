import { View, Text } from 'react-native'
import React from 'react'

export default function Divider({children}: {children: string}) {
  return (
    <View className="flex-row items-center my-3">
      <View className="flex-1 border-t border-white"></View>
      <Text className="mx-2 text-white">{children}</Text>
      <View className="flex-1 border-t border-white"></View>
    </View>
  );
}