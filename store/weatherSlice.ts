import { WeatherResponse } from "@/interfaces/weatherResponse";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { data: WeatherResponse | null } = {
  data: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<WeatherResponse>) => {
      state.data = action.payload;
    },
    clearWeather: (state) => {
      state.data = null;
    },
  },
});

export const { setWeather, clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;