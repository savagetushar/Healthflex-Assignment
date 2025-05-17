import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TimerProvider } from './context/TimerContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <TimerProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </TimerProvider>
  );
}