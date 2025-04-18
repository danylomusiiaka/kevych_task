import { View, Text, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { BlurView } from "expo-blur";
import { ExtendedWeatherResponse, setWeather } from "@/store/weatherSlice";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { getWeather } from "@/utils/getWeather";

export default function LocationEnabled({ greeting, city, weatherLocal }: { greeting: string; city: string; weatherLocal: ExtendedWeatherResponse }) {
  const router = useRouter();
  const [loadingRequested, setLoadingRequester] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const getRequestedWeather = async () => {
    setLoadingRequester(true);
    try {
      const data = await getWeather(city);
      dispatch(setWeather({ ...data, city }));
    } catch (error: any) {
      if (error.response.status === 404) {
        alert("City not found. Please check the name.");
        return;
      }
    } finally {
      setLoadingRequester(false);
    }
    router.push("/detailed_result");
  };

  return (
    <View>
      <Text className="mb-5 text-3xl font-medium text-white">
        {greeting}, {city}!
      </Text>
      <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden", marginBottom: 10 }}>
        <TouchableOpacity className="mr-5 flex-row items-center justify-between" onPress={getRequestedWeather}>
          <View className="flex-row items-center">
            <Image source={{ uri: weatherLocal?.icon }} style={{ width: 80, height: 80 }} />
            <View>
              <Text className="text-xl font-medium text-white">{city}</Text>
              <Text className="text-white">{weatherLocal?.description}</Text>
            </View>
          </View>
          {!loadingRequested ? (
            <Text className="text-2xl text-white">{weatherLocal?.temp.toFixed(0)}°</Text>
          ) : (
            <ActivityIndicator size="small" color="white" />
          )}
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}
