// src/screens/SearchScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { searchLocation } from '../api/weatherApi';
import { WeatherData } from '../api/types';
import { RootStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;

interface Props {
  navigation: SearchScreenNavigationProp;
}

const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<WeatherData[]>([]);

  const handleSearch = async () => {
    if (query.trim() === '') return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await searchLocation(query);
      setResults([data]); // For simplicity, just add the result as an array
    } catch (err) {
      setError('Location not found. Try another search.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = (location: WeatherData) => {
    // Navigate back to home with the selected location
    navigation.navigate('Home', { 
      lat: location.coord.lat, 
      lon: location.coord.lon 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a city..."
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          autoFocus={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0066ff" style={styles.loader} />
      ) : error ? (
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.messageContainer}>
          <Text style={styles.infoText}>Search for a city to get weather information</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.resultItem}
              onPress={() => handleSelectLocation(item)}
            >
              <View>
                <Text style={styles.itemName}>{item.name}, {item.sys.country}</Text>
                <Text style={styles.itemDesc}>{item.weather[0].description}</Text>
              </View>
              <Text style={styles.itemTemp}>{Math.round(item.main.temp)}°C</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  button: {
    marginLeft: 8,
    backgroundColor: '#0066ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    width: 50,
  },
  loader: {
    marginTop: 30,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  infoText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemDesc: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
    marginTop: 4,
  },
  itemTemp: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchScreen;