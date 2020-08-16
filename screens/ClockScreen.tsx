import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ClockScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Clock'>
}

const ClockScreen: React.SFC<ClockScreenProps> = () => {
  const [time, setTime] = useState(25 * 60);
  const [fontsLoaded] = useFonts({
    'digitalFont': require('../assets/fonts/CursedTimerUlil-Aznm.ttf')
  });

  // const ONE_SECOND_IN_MS = 1000;

  // const vibrationPattern = [
  //   1 * ONE_SECOND_IN_MS,
  //   2 * ONE_SECOND_IN_MS,
  //   3 * ONE_SECOND_IN_MS
  // ];

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    // Vibration.vibrate(vibrationPattern);

    return () => {
      console.log('returned')
      // await ScreenOrientation.unlockAsync();
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <View style={styles.container}>
        <Text style={styles.clockText}>{time / 60}:{time % 60}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  clockText: {
    color: '#444',
    fontSize: 80,
    fontWeight: '600',
    fontFamily: 'digitalFont'
  }
});

export default ClockScreen;