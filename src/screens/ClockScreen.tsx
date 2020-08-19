import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useKeepAwake } from 'expo-keep-awake';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { MainStackParamList } from '../../App';
import Clock from '../components/Clock';

export interface ClockScreenProps {
  navigation: StackNavigationProp<MainStackParamList, 'Clock'>
}

const ClockScreen: React.SFC<ClockScreenProps> = ({ navigation }) => {
  useKeepAwake();
  const defaultCountSecond = 25 * 60;
  const [time, setTime] = useState(defaultCountSecond);
  const timesUp = time <= 0;

  // navigate to counted screen
  if (timesUp) {
    navigation.push('Counted', {})
  }

  // orientation
  useEffect(() => {
    lockAsync(OrientationLock.LANDSCAPE);

    return () => {
      lockAsync(OrientationLock.PORTRAIT_UP);
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

  const navigateBack = () => {
    navigation.goBack();
  }
  const redoHandler = () => {
    setTime(defaultCountSecond);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateBack} style={styles.returnButton}>
        <Text style={styles.buttonText}>
          <Entypo name="chevron-left" size={18} color="rgba(255, 255, 255, .7)" />
            返回
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={redoHandler} style={styles.redo}>
        <FontAwesome5 style={styles.redoIcon} name="redo" />
      </TouchableOpacity>
      <Clock timeInSecond={time} />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  returnButton: {
    position: 'absolute',
    padding: 30,
    top: 0,
    left: 0
  },
  buttonText: {
    color: 'rgba(255, 255, 255, .7)',
    fontSize: 18
  },
  redo: {
    position: 'absolute',
    padding: 30,
    top: 0,
    right: 0
  },
  redoIcon: {
    color: 'rgba(255, 255, 255, .7)',
    fontSize: 18
  }
});

export default ClockScreen;