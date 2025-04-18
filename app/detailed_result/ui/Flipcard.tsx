import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from "react-native-reanimated";

type FlipCardProps = {
  front: React.ReactNode;
  back: React.ReactNode;
};

export default function FlipCard({ front, back }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const rotate = useSharedValue(0);

  const flipCard = () => {
    setFlipped(!flipped);
    rotate.value = withTiming(flipped ? 0 : 180, { duration: 500 });
  };

  const frontStyle = useAnimatedStyle(() => {
    const rotateX = interpolate(rotate.value, [0, 180], [0, 180]);
    return {
      transform: [{ rotateX: `${rotateX}deg` }],
      backfaceVisibility: "hidden",
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateX = interpolate(rotate.value, [0, 180], [180, 360]);
    return {
      transform: [{ rotateX: `${rotateX}deg` }],
      position: "absolute",
      top: 0,
      backfaceVisibility: "hidden",
    };
  });

  return (
    <TouchableOpacity activeOpacity={1} onPress={flipCard} className="my-3">
      <Animated.View style={[styles.front, frontStyle]}>
        <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
          {front}
        </BlurView>
      </Animated.View>
      <Animated.View style={[styles.back, backStyle]}>
        <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
          {back}
        </BlurView>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  front: {
    zIndex: 2,
    width: "100%",
  },
  back: {
    zIndex: 1,
    width: "100%",
  },
});
