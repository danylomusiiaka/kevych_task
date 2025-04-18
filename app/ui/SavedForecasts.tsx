import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import Exit from "react-native-vector-icons/Ionicons";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { subscribeToCities } from "@/lib/getUserCities";
import { getWeather } from "@/utils/getWeather";
import { WeatherResponse } from "@/interfaces/weatherResponse";
import { deleteCityFromDb } from "@/lib/deleteUserCity";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useRouter } from "expo-router";
import { setWeather } from "@/store/weatherSlice";

export default function SavedForecasts() {
  const [cities, setCities] = useState<string[]>([]);
  const [citiesForecast, setCitiesForecast] = useState<WeatherResponse[]>([]);
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    setPending(true);

    const unsubscribe = subscribeToCities(user.uid, async (updatedCities) => {
      setCities(updatedCities);
      const forecasts = await Promise.all(updatedCities.map(getWeather));
      setCitiesForecast(forecasts);
    });
    setPending(false);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
      <View className="my-2 space-y-4 rounded-md p-3">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xl font-medium text-white">Your saved forecasts:</Text>
            <Text className="text-xs text-white">* long press on city to delete from saved forecasts</Text>
          </View>
          <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
            <TouchableOpacity className="p-2" onPress={async () => await signOut(auth)}>
              <Exit name="exit-outline" color="white" size={24} />
            </TouchableOpacity>
          </BlurView>
        </View>
        {pending && <ActivityIndicator size="small" color="white" />}
        {citiesForecast?.map((weather, i) => {
          return (
            <BlurView key={i} intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
              <TouchableOpacity
                className="mr-5 flex-row items-center justify-between"
                onPress={() => {
                  dispatch(setWeather({ ...weather, city: cities[i] }));
                  router.push("/detailed_result");
                }}
                onLongPress={async () => await deleteCityFromDb(auth.currentUser!.uid, cities[i])}
              >
                <View className="flex-row items-center">
                  <Image source={{ uri: weather?.icon }} style={{ width: 80, height: 80 }} />
                  <View>
                    <Text className="text-xl font-medium text-white">{cities[i]}</Text>
                    <Text className="text-white">{weather?.description}</Text>
                  </View>
                </View>
                <Text className="text-2xl text-white">{weather?.temp.toFixed(0)}°</Text>
              </TouchableOpacity>
            </BlurView>
          );
        })}
      </View>
    </BlurView>
  );
}
