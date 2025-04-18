import { useCallback, useEffect, useState } from "react";
import { ScrollView, RefreshControl, StatusBar, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchWeatherField from "./ui/SearchWeatherField";
import Divider from "./ui/Divider";
import LocationDisabled from "./ui/LocationDisabled";
import { getWeather } from "@/utils/getWeather";
import { ExtendedWeatherResponse } from "@/store/weatherSlice";
import { getAutomaticlyCity } from "@/utils/getAutomaticlyCity";
import LocationEnabled from "./ui/LocationEnabled";
import { validateToken } from "@/utils/validateToken";
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";
import PropositionToAuth from "./ui/PropositionToAuth";
import PropositionToVerifyEmail from "./ui/PropositionToVerify";
import SavedForecasts from "./ui/SavedForecasts";

export default function MainScreen() {
  const [city, setCity] = useState("");
  const [user, setUser] = useState<User | null>(null);
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
    validateToken();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        currentUser.reload().then(() => {
          setUser(auth.currentUser);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const onRefresh = useCallback(() => {
    getLocaleWeather();
    validateToken();
    if (auth.currentUser) {
      auth.currentUser
        .reload()
        .then(() => {
          setUser(auth.currentUser);
        })
        .catch((error) => {
          console.error("Error refreshing user:", error);
        });
    }
  }, []);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: weatherLocal?.background || "#A9A9A9" }} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={loadingLocation} onRefresh={onRefresh} />}
        className="flex h-full p-4"
      >
        {!loadingLocation ? (
          city ? (
            <LocationEnabled greeting={greeting} city={city} weatherLocal={weatherLocal!} />
          ) : (
            <LocationDisabled />
          )
        ) : (
          <ActivityIndicator size="small" color="white" />
        )}

        <Divider>or</Divider>

        <SearchWeatherField />

        {!user ? <PropositionToAuth /> : <>{!user.emailVerified ? <PropositionToVerifyEmail onRefresh={onRefresh} /> : <SavedForecasts />}</>}
        <StatusBar />
      </ScrollView>
    </SafeAreaView>
  );
}
