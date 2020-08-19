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
import EditCategoryScreen from './src/screens/EditCategoryScreen';
import HeaderButton from './src/components/HeaderButton';

// import { documentDirectory } from 'expo-file-system';
import * as mDate from './src/db/date';
import * as mCategory from './src/db/category';
import * as mSegment from './src/db/segment';

export interface CountedParams {

}

export interface BaseParamList {
  [k: string]: object;
  Counted: CountedParams;
  EditCategory: {
    id: number
  }
}

export interface RootStackParamList extends BaseParamList {
  Main: {};
};

export interface MainStackParamList extends BaseParamList {
  Home: {};
  Clock: {};
  Category: {};

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
        options={({ navigation }) => {
          return {
            headerRight: () => (
              <HeaderButton icon='plus' pressHandler={() => { navigation.push('EditCategory') }} />
            )
          }
        }}
      />

    </MainStack.Navigator>
  )
}

// modal screens write in here
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
        <RootStack.Screen
          name='EditCategory'
          component={EditCategoryScreen}
        // options={{
        //   headerShown: false
        // }}
        />
      </RootStack.Navigator>

    </NavigationContainer>
  );
}

export default function App() {
  mDate.initialize();
  mCategory.initialize();
  mSegment.initialize();

  // console.log(documentDirectory);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <RootStackScreen />
    </ApplicationProvider>
  );
}