import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { WeatherIconProps } from './types';

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, size = 50 }) => {
  // OpenWeatherMap provides icon codes like "01d", "02n", etc.
  // We can construct the URL to their icon service
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: iconUrl }} 
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WeatherIcon;