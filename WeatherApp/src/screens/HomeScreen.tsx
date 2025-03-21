import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { fetchWeatherByCoords, fetchForecast } from '../api/weatherApi';
import { WeatherData, ForecastData } from '../api/types';
import CurrentWeather from '../components/CurrentWeather';
import ForecastItem from '../components/ForecastItem';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let latitude: number, longitude: number;
      
      // Check if we have location from search or need to get user location
      if (route.params?.lat && route.params?.lon) {
        latitude = route.params.lat;
        longitude = route.params.lon;
      } else {
        // Get location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          setLoading(false);
          return;
        }
        
        // Get current location
        const location = await Location.getCurrentPositionAsync({});
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
      }
      
      // Fetch current weather and forecast
      const weather = await fetchWeatherByCoords(latitude, longitude);
      const forecast = await fetchForecast(latitude, longitude);
      
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError('Failed to load weather data');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load weather on component mount or when route params change
  useEffect(() => {
    loadWeatherData();
  }, [route.params]);

  // Pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    loadWeatherData();
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0066ff" />
        <Text style={styles.loadingText}>Loading weather data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weather App</Text>
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => navigation.navigate('Search')}
        >
          <Ionicons name="search" size={24} color="#0066ff" />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {weatherData && <CurrentWeather data={weatherData} />}
        
        <Text style={styles.forecastTitle}>3-Day Forecast</Text>
        <View style={styles.forecastContainer}>
          {forecastData.map((item, index) => (
            <ForecastItem key={index} data={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 8,
  },
  scrollContainer: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;