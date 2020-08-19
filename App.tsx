import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// ui kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import HomeScreen from './src/screens/HomeScreen';
import ClockScreen from './src/screens/ClockScreen';
import CountedScreen from './src/screens/CountedScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import HeaderButton from './src/components/HeaderButton';

// import { documentDirectory } from 'expo-file-system';
import { initializeDate } from './src/db/date';
import { initializeCategories } from './src/db/categories';

export interface CountedParams {

}

export type RootStackParamList = {
  Main: {},
  Counted: CountedParams
};

export type MainStackParamList = {
  Home: {};
  Clock: {};
  Category: {};
  Counted: CountedParams;
}

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();


const MainStackScreen = () => {
  return (
    <MainStack.Navigator initialRouteName='Home'>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => {
          return {
            headerRight: () => (
              <HeaderButton icon='tag' pressHandler={() => { navigation.push('Category', {}) }} />
            )
          }
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
      <MainStack.Screen
        name='Category'
        component={CategoryScreen}
        options={{
          headerRight: () => (
            <HeaderButton icon='plus' pressHandler={() => { }} />
          )
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
          name='Counted'
          component={CountedScreen}
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
  initializeCategories();

  // console.log(documentDirectory);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <RootStackScreen />
    </ApplicationProvider>
  );
}