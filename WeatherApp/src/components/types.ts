import { WeatherData, ForecastData } from '../api/types';

export interface CurrentWeatherProps {
  data: WeatherData;
}

export interface ForecastItemProps {
  data: ForecastData;
}

export interface WeatherIconProps {
  iconCode: string;
  size?: number;
}