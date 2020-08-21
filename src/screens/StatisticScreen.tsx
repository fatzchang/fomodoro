import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { someByDateId } from '../db/segment';
export interface StatisticScreenProps {

}

const StatisticScreen: React.SFC<StatisticScreenProps> = () => {
  useEffect(() => {
    const getTodaySegments = async () => {


      const records = await someByDateId(2);

    }
  }, [])

  return (
    <View style={styles.container}>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default StatisticScreen;