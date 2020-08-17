import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Vibration, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { useKeepAwake } from 'expo-keep-awake';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { RootStackParamList } from '../App';

export interface ClockScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Clock'>
}

const ClockScreen: React.SFC<ClockScreenProps> = ({ navigation }) => {
  useKeepAwake();

  const [time, setTime] = useState(25 * 60);
  const [fontsLoaded] = useFonts({
    'digitalFont': require('../assets/fonts/CursedTimerUlil-Aznm.ttf')
  });

  const timesUp = time <= 0;

  // vibration
  if (timesUp) {
    Vibration.vibrate([
      1 * 1000,
      1 * 1000,
      1 * 2000,
      1 * 1000,
    ]);
  }

  // orientation
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      console.log('returned')
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
  }, []);

  // countdown
  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(time - 1)
      }, 1000);

      return () => { clearInterval(timer) }
    }
  })

  function navigateBack() {
    navigation.goBack();
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    const min = Math.floor(time / 60);
    const sec = time % 60;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={navigateBack} style={styles.returnButton}>
          <Text style={styles.buttonText}>
            <Entypo name="chevron-left" size={18} color="rgb(200, 200, 200)" />
            返回
            </Text>
        </TouchableOpacity>

        <Text style={styles.clockText}>
          {min < 10 ? '0' + min : min}:{sec < 10 ? '0' + sec : sec}
        </Text>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  clockText: {
    color: 'rgb(255, 50, 100)',
    fontSize: 150,
    fontWeight: '600',
    fontFamily: 'digitalFont'
  },
  returnButton: {
    position: 'absolute',
    top: 40,
    left: 40
  },
  buttonText: {
    color: 'rgb(200, 200, 200)',
    fontSize: 18
  }
});

export default ClockScreen;