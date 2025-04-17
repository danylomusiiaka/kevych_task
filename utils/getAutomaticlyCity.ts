import * as Location from "expo-location";
import { findGreetingByCountryCode } from "native-greetings";

interface AutoCityResponse {
  city: string;
  greeting: string;
}

export const getAutomaticlyCity = async (): Promise<AutoCityResponse | null> => {
  let greeting = "";
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") return null;

  const location = await Location.getCurrentPositionAsync({});
  const [reverseGeocode] = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  const greetingByCountry = findGreetingByCountryCode(reverseGeocode.isoCountryCode);
  if (greetingByCountry !== "Greeting not found for this country code") {
    greeting = greetingByCountry;
  }

  return { city: reverseGeocode.city || "", greeting };
};
