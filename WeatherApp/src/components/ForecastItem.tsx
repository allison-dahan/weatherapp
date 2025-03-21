import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ForecastItemProps } from './types';
import WeatherIcon from './WeatherIcon';

const ForecastItem: React.FC<ForecastItemProps> = ({ data }) => {
  // Format date
  const date = new Date(data.dt * 1000);
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  
  // Weather data
  const temp = Math.round(data.main.temp);
  const iconCode = data.weather[0].icon;
  
  return (
    <View style={styles.container}>
      <Text style={styles.day}>{day}</Text>
      <WeatherIcon iconCode={iconCode} size={40} />
      <Text style={styles.temp}>{temp}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  temp: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default ForecastItem;