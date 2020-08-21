import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';

// ui kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import HomeScreen from './src/screens/HomeScreen';
import ClockScreen from './src/screens/ClockScreen';
import CountedScreen from './src/screens/CountedScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import EditCategoryScreen from './src/screens/EditCategoryScreen';
import StatisticScreen from './src/screens/StatisticScreen';
import HeaderButton from './src/components/HeaderButton';

// import { documentDirectory } from 'expo-file-system';
import * as mDate from './src/db/date';
import * as mCategory from './src/db/category';
import * as mSegment from './src/db/segment';

// redux
import { Provider, useDispatch } from 'react-redux';
import store from './src/store/store';
import { addCategory } from './src/store/category/actions';


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
  Statistic: {}
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
          headerStyle: {
            backgroundColor: 'black',
            borderBottomColor: 'black',
            shadowColor: 'black'
          },
          headerTintColor: 'white',
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
      <MainStack.Screen
        name='Statistic'
        component={StatisticScreen}
        options={{}}
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
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  const [inited, setInited] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch db data and save into redux
    const syncState = async () => {
      const dateId = await mDate.createToday();
      const cates = await mCategory.all();
      cates.rows._array.forEach((el: any) => {
        dispatch(addCategory(el.id, el.name))
      });
      setInited(true);
    }
    syncState();
  }, [])

  return inited ? <RootStackScreen /> : <AppLoading />
}

export default function () {
  mDate.initialize();
  mCategory.initialize();
  mSegment.initialize();

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApplicationProvider>
  )
}