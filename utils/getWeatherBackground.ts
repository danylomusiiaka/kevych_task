const weatherBackgroundColors: { [key: string]: string } = {
  "clear sky": "#B0C4DE", 
  "few clouds": "#B0C4DE", 
  "scattered clouds": "#B0C4DE",
  "broken clouds": "#A9A9A9", 
  "shower rain": "#5F9EA0", 
  rain: "#4682B4", 
  "light rain": "#6CA0DC",
  "moderate rain": "#5079A3",
  "heavy intensity rain": "#2F4F4F",

  thunderstorm: "#D3D3D3", 
  "light thunderstorm": "#D3D3D3",
  "heavy thunderstorm": "#D3D3D3",

  snow: "#D3D3D3",
  "light snow": "#D3D3D3",
  "heavy snow": "#D3D3D3",
  sleet: "#D3D3D3",

  mist: "#D3D3D3", 
  fog: "#A9A9A9", 
  haze: "#C8C8C8",
  smoke: "#999999",
  dust: "#DEB887",
  sand: "#EDC9AF",
  ash: "#BEBEBE",

  squall: "#778899", 
  tornado: "#696969", 
};

export const getWeatherBackground = (description: string) => {
  return weatherBackgroundColors[description] || "#D3D3D3";
};
