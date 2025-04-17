import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolate } from "react-native-reanimated";

export default function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  const rotate = useSharedValue(0);

  const flipCard = () => {
    setFlipped(!flipped);
    rotate.value = withTiming(flipped ? 0 : 180, { duration: 500 });
  };

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotate.value, [0, 180], [0, 180]);
    return {
      transform: [{ rotateX: `${rotateY}deg` }],
      backfaceVisibility: "hidden",
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotate.value, [0, 180], [180, 360]);
    return {
      transform: [{ rotateX: `${rotateY}deg` }],
      position: "absolute",
      top: 0,
      backfaceVisibility: "hidden",
    };
  });

  return (
    <TouchableOpacity activeOpacity={1} onPress={flipCard}>
      <View style={styles.container}>
        <Animated.View style={[styles.card, styles.front, frontStyle]}>
          <Text style={styles.text}>Text</Text>
        </Animated.View>
        <Animated.View style={[styles.card, styles.back, backStyle]}>
          <Text style={styles.text}>Another text</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 150,
    alignSelf: "center",
    marginTop: 20,
  },
  card: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#60a5fa",
  },
  front: {
    zIndex: 2,
  },
  back: {
    zIndex: 1,
    backgroundColor: "#3b82f6",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});
