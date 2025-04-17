import { useCallback, useEffect, useState } from "react";
import { Linking, SafeAreaView, Text, TouchableOpacity, View, ScrollView, RefreshControl, TextInput, StatusBar } from "react-native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { findGreetingByCountryCode } from "native-greetings";
import SearchWeatherField from "./ui/SearchWeatherField";
import Divider from "./ui/Divider";
import NoLocationEnabled from "./ui/NoLocationEnabled";
import Chevron from "react-native-vector-icons/Ionicons";
import FlipCard from "./ui/Flipcard";

export default function MainScreen() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [greeting, setGreeting] = useState("Hello");
  const [loadingLocation, setLoadingLocation] = useState(true);

  const getAutomaticlyCity = async () => {
    setLoadingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLoadingLocation(false);
        setCity("");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [reverseGeocode] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const greetingByCountry = findGreetingByCountryCode(reverseGeocode.isoCountryCode);
      if (greetingByCountry !== "Greeting not found for this country code") {
        setGreeting(greetingByCountry);
      }

      setCity(reverseGeocode.city || "");
    } catch (error) {
      console.error("Location error:", error);
      setCity("");
    } finally {
      setLoadingLocation(false);
    }
  };

  const onRefresh = useCallback(() => {
    setLoadingLocation(true);
    getAutomaticlyCity();
  }, [city]);

  useEffect(() => {
    getAutomaticlyCity();
  }, []);

  return (
    <SafeAreaView className="flex-1">
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
                <Text className="mb-5 text-3xl font-thin text-gray-800">
                  {greeting}, {city}!
                </Text>
                <TouchableOpacity className="flex items-center bg-blue-500 p-3" onPress={() => router.push("/about")}>
                  <Text className="text-base font-medium text-white">Get weather in {city}</Text>
                </TouchableOpacity>
                <Divider>or</Divider>
                <SearchWeatherField />
              </>
            )}
          </>
        )}

        <View className="mt-4 rounded-md border-2 border-slate-300 bg-slate-200 p-3">
          <Text className="text-2xl font-light text-gray-700">Want to save more search queries?</Text>
          <TouchableOpacity className="w-1/2 flex-row items-center space-x-2 self-end rounded-md bg-blue-500 p-3" onPress={() => router.push("/(auth)/registration")}>
            <Text className="font-medium text-white">Go to registration</Text>
            <Chevron name="chevron-forward" size={18} color="white"></Chevron>
          </TouchableOpacity>
        </View>
        <StatusBar />
      </ScrollView>
    </SafeAreaView>
  );
}
