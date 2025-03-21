import axios from 'axios';
import { WEATHER_API_KEY, BASE_URL } from './config';
import { WeatherData, ForecastData } from './types';

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric' // or 'imperial' for Fahrenheit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const fetchForecast = async (lat: number, lon: number): Promise<ForecastData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
        cnt: 24 // Get 24 data points (3 days, 8 points per day)
      }
    });
    
    // Process to get just one forecast per day
    const dailyData: ForecastData[] = [];
    const today = new Date().getDate();
    
    response.data.list.forEach((item: ForecastData) => {
      const date = new Date(item.dt * 1000).getDate();
      if (date !== today && !dailyData.find(d => new Date(d.dt * 1000).getDate() === date)) {
        dailyData.push(item);
      }
    });
    
    return dailyData.slice(0, 3); // Return only 3 days
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

export const searchLocation = async (query: string): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
      params: {
        q: query,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
};