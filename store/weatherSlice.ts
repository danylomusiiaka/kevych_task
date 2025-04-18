import { WeatherResponse } from "@/interfaces/weatherResponse";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExtendedWeatherResponse extends WeatherResponse {
  city: string;
}

const initialState: { data: ExtendedWeatherResponse | null } = {
  data: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<ExtendedWeatherResponse>) => {
      state.data = action.payload;
    },
    clearWeather: (state) => {
      state.data = null;
    },
  },
});

export const { setWeather, clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
