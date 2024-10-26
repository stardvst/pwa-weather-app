import axios from "axios";
const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '80d5c9b12469a2f59e51604959cd1a19';

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: 'metric',
      APPID: API_KEY
    }
  });
  return data;
}
