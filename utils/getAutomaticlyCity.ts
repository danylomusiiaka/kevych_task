import * as Location from "expo-location";
import { findGreetingByCountryCode } from "native-greetings";
import { getEnglishNameForCity } from "./getEnglishNameForCity";

interface AutoCityResponse {
  city: string;
  greeting: string;
}
// try pass Berlin coordinates to simulate that you are from Germany
// const lat = 52.52001;
// const lon = 13.40495;
// or pass Koto coordinates to simulate that you are from Japan
// const lat = 35.652832;
// const lon = 139.839478;

export const getAutomaticlyCity = async (): Promise<AutoCityResponse | null> => {
  let greeting = "";
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") return null;

  const location = await Location.getCurrentPositionAsync({});
  const lat = location.coords.latitude;
  const lon = location.coords.longitude;

  const [reverseGeocode] = await Location.reverseGeocodeAsync({
    latitude: lat,
    longitude: lon,
  });

  const city = await getEnglishNameForCity(reverseGeocode.city || "");

  const greetingByCountry = findGreetingByCountryCode(reverseGeocode.isoCountryCode);
  if (greetingByCountry !== "Greeting not found for this country code") {
    greeting = greetingByCountry;
  }

  return { city, greeting };
};
