// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import { RootStackParamList } from './src/navigation/types';

// Create a stack navigator with our defined parameter list type
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
          headerTintColor: '#0066ff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: { backgroundColor: '#f5f5f5' }
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Weather App',
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{ 
            title: 'Search Location',
            headerTitleAlign: 'center'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}