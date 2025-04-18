import { View, ScrollView, Animated } from "react-native";
import React, { ReactElement, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MainBlock from "./ui/MainBlock";
import WindBlock from "./ui/WindBlock";
import Today3HourForecast from "./ui/Today3HourForecast";
import Forecast5Days from "./ui/Forecast5Days";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedBlock = ({ children, delay, index }: { children: ReactElement; delay: number; index: number }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay * index),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  });

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY }],
      }}
    >
      {children}
    </Animated.View>
  );
};

export default function DetailedResult() {
  const weather = useSelector((state: RootState) => state.weather.data);
  const DELAY_AMOUNT = 300;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: weather?.background }} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="m-5">
          <AnimatedBlock index={0} delay={DELAY_AMOUNT}>
            <MainBlock />
          </AnimatedBlock>

          <AnimatedBlock index={1} delay={DELAY_AMOUNT}>
            <Today3HourForecast />
          </AnimatedBlock>

          <AnimatedBlock index={2} delay={DELAY_AMOUNT}>
            <Forecast5Days />
          </AnimatedBlock>

          <AnimatedBlock index={3} delay={DELAY_AMOUNT}>
            <WindBlock />
          </AnimatedBlock>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
