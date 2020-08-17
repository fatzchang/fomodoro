import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ClockScreen from './screens/ClockScreen';

export type RootStackParamList = {
  Home: {};
  Clock: {};
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Clock"
          component={ClockScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
