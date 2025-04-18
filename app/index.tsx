import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, ScrollView, RefreshControl, StatusBar, ActivityIndicator } from "react-native";
import SearchWeatherField from "./ui/SearchWeatherField";
import Divider from "./ui/Divider";
import NoLocationEnabled from "./ui/NoLocationEnabled";
import { getWeather } from "@/utils/getWeather";
import { ExtendedWeatherResponse } from "@/store/weatherSlice";
import { getAutomaticlyCity } from "@/utils/getAutomaticlyCity";
import PropositionToRegister from "./ui/PropositionToRegister";
import LocationEnabled from "./ui/LocationEnabled";

export default function MainScreen() {
  const [city, setCity] = useState("");
  const [greeting, setGreeting] = useState("Hello");
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [weatherLocal, setWeatherLocal] = useState<ExtendedWeatherResponse>();

  const getLocaleWeather = async () => {
    setLoadingLocation(true);
    try {
      const locationData = await getAutomaticlyCity();
      if (locationData) {
        const { city, greeting } = locationData;
        setCity(city);
        setGreeting(greeting);
        const data = await getWeather(city);
        setWeatherLocal({ ...data, city });
      } else {
        setCity("");
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

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: weatherLocal?.background || "#A9A9A9" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={loadingLocation} onRefresh={onRefresh} />}
        className="flex h-full p-4"
      >
        {!loadingLocation ? (
          city ? (
            <LocationEnabled greeting={greeting} city={city} weatherLocal={weatherLocal!} />
          ) : (
            <NoLocationEnabled />
          )
        ) : (
          <ActivityIndicator size="small" color="white" />
        )}

        <Divider>or</Divider>

        <SearchWeatherField />

        <PropositionToRegister />
        <StatusBar />
      </ScrollView>
    </SafeAreaView>
  );
}
