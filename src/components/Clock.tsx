import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

export interface ClockProps {
  timeInSecond: number
}

const Clock: React.SFC<ClockProps> = ({ timeInSecond }) => {
  const [fontsLoaded] = useFonts({
    'digitalFont': require('../../assets/fonts/CursedTimerUlil-Aznm.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    const min = Math.floor(timeInSecond / 60);
    const sec = timeInSecond % 60;

    return (
      <Text style={styles.clockText}>
        {min < 10 ? '0' + min : min}:{sec < 10 ? '0' + sec : sec}
      </Text>
    );
  }

}
const styles = StyleSheet.create({
  clockText: {
    color: 'rgb(255, 50, 100)',
    fontSize: 150,
    fontWeight: '600',
    fontFamily: 'digitalFont'
  },
});

export default Clock;