import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CurrentWeatherProps } from './types';
import WeatherIcon from './WeatherIcon';

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  // Format data
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const city = data.name;
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  
  return (
    <View style={styles.container}>
      <Text style={styles.location}>{city}</Text>
      <View style={styles.mainInfo}>
        <WeatherIcon iconCode={data.weather[0].icon} size={80} />
        <Text style={styles.temperature}>{temp}°C</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Feels Like</Text>
          <Text style={styles.detailValue}>{feelsLike}°C</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>{windSpeed} m/s</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  description: {
    fontSize: 18,
    color: '#666',
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default CurrentWeather;