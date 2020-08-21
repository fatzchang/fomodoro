import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useKeepAwake } from 'expo-keep-awake';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { MainStackParamList } from '../../App';
import Clock from '../components/Clock';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';

export interface ClockScreenProps {
  navigation: StackNavigationProp<MainStackParamList, 'Clock'>
}

const ClockScreen: React.SFC<ClockScreenProps> = ({ navigation }) => {
  useKeepAwake();
  const defaultCountSecond = 25 * 60;
  const [time, setTime] = useState(defaultCountSecond);
  const segmentInfo = useSelector((state: RootState) => state.segment.recent)!;

  const timesUp = time <= 0;

  // navigate to counted screen
  if (timesUp) {
    navigation.navigate('Counted', {})
  }

  // orientation
  useEffect(() => {
    // lockAsync(OrientationLock.LANDSCAPE);

    // return () => {
    //   lockAsync(OrientationLock.PORTRAIT_UP);
    // }
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

  const redoHandler = () => {
    setTime(defaultCountSecond);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.categoryName}>{segmentInfo.categoryName}</Text>
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
  redo: {
    position: 'absolute',
    padding: 30,
    bottom: 150,
  },
  redoIcon: {
    color: 'rgba(255, 255, 255, .7)',
    fontSize: 20
  },
  categoryName: {
    position: 'absolute',
    top: 100,
    color: 'rgba(255, 255, 255, .9)',
    fontSize: 20,
    letterSpacing: 1
  }
});

export default ClockScreen;