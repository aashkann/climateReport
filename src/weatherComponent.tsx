import axios from "axios";

const apiKey = "9da869bb241930032fad8a5c7b73161f";
const apiUrl = "https://api.openweathermap.org/data/2.5/onecall/timemachine";
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
interface WeatherData {
  dt: number;
  temp: number;
  humidity: number;
  wind_speed: number;
}

interface ApiResponse {
  hourly: WeatherData[];
}

const getHistoricalWeatherData = async (
  lat: number,
  lon: number,
  timestamp: number
): Promise<WeatherData[]> => {
  const response = await axios.get<ApiResponse>(apiUrl, {
    params: {
      lat,
      lon,
      dt: timestamp,
      appid: apiKey,
      units: "metric",
    },
  });

  return response.data.hourly;
};

const lat = 37.7749; // Example latitude and longitude for San Francisco
const lon = -122.4194;
const timestamp = Math.round(Date.now() / 1000) - 24 * 60 * 60; // Example timestamp for 24 hours ago

getHistoricalWeatherData(lat, lon, timestamp).then((data) => {
  console.log(data);
});

export default getHistoricalWeatherData;