import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ClockScreen from './src/screens/ClockScreen';
import ModalScreen from './src/screens/ModalScreen';

import { initializeDate } from './src/db/date';

export interface ModalParams {

}

export type RootStackParamList = {
  Main: {},
  Modal: ModalParams
};

export type MainStackParamList = {
  Home: {};
  Clock: {};
  Modal: ModalParams;
}

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();


const MainStackScreen = () => {
  return (
    <MainStack.Navigator initialRouteName='Home'>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <MainStack.Screen
        name="Clock"
        component={ClockScreen}
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
      />

    </MainStack.Navigator>
  )
}

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName='Main' mode='modal'>
        <RootStack.Screen
          name='Main'
          component={MainStackScreen}
          options={{
            headerShown: false
          }}
        />
        <RootStack.Screen
          name='Modal'
          component={ModalScreen}
          options={{
            headerShown: false
          }}
        />
      </RootStack.Navigator>

    </NavigationContainer>
  );
}

export default function App() {
  initializeDate();
  return <RootStackScreen />;
}