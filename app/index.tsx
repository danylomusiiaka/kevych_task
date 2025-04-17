import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, ScrollView, RefreshControl, StatusBar, Image } from "react-native";
import { useRouter } from "expo-router";
import SearchWeatherField from "./ui/SearchWeatherField";
import Divider from "./ui/Divider";
import NoLocationEnabled from "./ui/NoLocationEnabled";
import FlipCard from "./ui/Flipcard";
import { getWeather } from "@/utils/getWeather";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setWeather } from "@/store/weatherSlice";
import { getAutomaticlyCity } from "@/utils/getAutomaticlyCity";
import { BlurView } from "expo-blur";
import PropositionToRegister from "./ui/PropositionToRegister";

export default function MainScreen() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [greeting, setGreeting] = useState("Hello");
  const [loadingLocation, setLoadingLocation] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const weather = useSelector((state: RootState) => state.weather.data);

  const getLocaleWeather = async () => {
    setLoadingLocation(true);
    try {
      const locationData = await getAutomaticlyCity();
      if (locationData) {
        const { city, greeting } = locationData;
        setCity(city);
        setGreeting(greeting);
        const data = await getWeather(city);
        dispatch(setWeather(data));
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    getLocaleWeather();
  }, []);

  const onRefresh = useCallback(() => {
    getLocaleWeather();
  }, [city]);

  // const fetchAndStoreWeather = async (city: string) => {
  //   const data = await getWeather(city);
  //   dispatch(setWeather(data));
  // };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: weather?.background }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={loadingLocation} onRefresh={onRefresh} />}
        className="flex h-full p-4"
      >
        {!city && !loadingLocation ? (
          <NoLocationEnabled />
        ) : (
          <>
            {city && (
              <>
                <Text className="mb-5 text-3xl font-medium text-white">
                  {greeting}, {city}!
                </Text>
                <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden", marginBottom: 10 }}>
                  <View className="mr-5 flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Image source={{ uri: weather?.icon }} style={{ width: 80, height: 80 }} />
                      <View>
                        <Text className="text-xl font-medium text-white">{weather?.main}</Text>
                        <Text className="text-white">{weather?.description}</Text>
                      </View>
                    </View>
                    <Text className="text-2xl text-white">{weather?.temp.toFixed(0)}°</Text>
                  </View>
                </BlurView>
                <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
                  <TouchableOpacity className="flex items-center p-3" onPress={() => router.push("/detailed_result")}>
                    <Text className="text-base font-medium text-white">Click to get detailed weather in {city}</Text>
                  </TouchableOpacity>
                </BlurView>
                <Divider>or</Divider>

                <SearchWeatherField />
              </>
            )}
          </>
        )}

        <PropositionToRegister />
        <StatusBar />
      </ScrollView>
    </SafeAreaView>
  );
}
