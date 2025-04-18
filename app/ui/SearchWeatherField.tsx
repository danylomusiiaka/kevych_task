import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Search from "react-native-vector-icons/AntDesign";
import { BlurView } from "expo-blur";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setWeather } from "@/store/weatherSlice";
import { getWeather } from "@/utils/getWeather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEnglishNameForCity } from "@/utils/getEnglishNameForCity";
import { auth } from "@/lib/firebase";
import { saveCityInDb } from "@/lib/saveUserCity";

export default function SearchWeatherField() {
  const [city, setCity] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [recentCities, setRecentCities] = useState<string[]>([]);

  const onSubmit = async (city: string) => {
    if (city === "" || !isNaN(Number(city))) {
      alert("Please provide valid city name");
      return;
    }
    setLoadingLocation(true);
    try {
      const englishCity = await getEnglishNameForCity(city);
      const data = await getWeather(englishCity);
      dispatch(setWeather({ ...data, city: englishCity }));
      await saveCity(englishCity);
      setCity("");
      router.push("/detailed_result");
    } catch (error: any) {
      if (error.response.status === 404) {
        alert("City not found. Please check the name.");
      }
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    loadRecentCities();
  }, []);

  const saveCity = async (cityName: string) => {
    try {
      let updated = [cityName, ...recentCities.filter((c) => c !== cityName)].slice(0, 3); // максимум 3 останніх міст без реєстрації
      await AsyncStorage.setItem("recentCities", JSON.stringify(updated));
      setRecentCities(updated);
    } catch (e) {
      console.error("Failed to save city:", e);
    }
  };

  const loadRecentCities = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("recentCities");
      if (jsonValue != null) {
        setRecentCities(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Failed to load recent cities:", e);
    }
  };

  const saveCityInFirestore = async (city: string) => {
    const user = auth.currentUser;
    if (user) {
      await saveCityInDb(user.uid, city);
    }
  };

  return (
    <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
      <View className="space-y-3 p-3">
        <Text className="text-lg font-semibold text-white">Search city you choose!</Text>
        <View className="relative">
          <TextInput
            className="mt-[0.5px] rounded-md border border-white p-3 pl-2 pr-12 font-medium text-white"
            placeholder="ex. Tokyo"
            value={city}
            onChangeText={setCity}
            placeholderTextColor="white"
          />
          <TouchableOpacity className="absolute right-2 top-2.5 transform rounded-lg rounded-l-none" onPress={() => onSubmit(city)}>
            {!loadingLocation ? <Search name="search1" size={24} color="white" /> : <ActivityIndicator size="small" color="white" />}
          </TouchableOpacity>
        </View>
        {recentCities.length > 0 && (
          <View className="flex-row flex-wrap space-x-2">
            {recentCities.map((cityName, index) => (
              <TouchableOpacity key={index} onPress={() => onSubmit(cityName)} onLongPress={() => saveCityInFirestore(cityName)}>
                <BlurView intensity={100} tint="light" style={{ borderRadius: 16, overflow: "hidden" }}>
                  <Text className="px-4 py-2 text-white">{cityName}</Text>
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {auth.currentUser && <Text className="text-white">* long press on city to add to saved forecasts</Text>}
      </View>
    </BlurView>
  );
}
