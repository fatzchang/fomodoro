import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { someByDateId } from '../db/segment';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';
export interface StatisticScreenProps {

}

const StatisticScreen: React.SFC<StatisticScreenProps> = () => {
  const todayId = useSelector((state: RootState) => state.today.id);
  const [segments, setSegments] = useState([])

  useEffect(() => {
    const getTodaySegments = async () => {
      const records = await someByDateId(todayId);
      setSegments(records.rows._array);
    }
    getTodaySegments()
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.text}>你今天專心了</Text>
      <Text style={styles.time}>{segments.length * 25}</Text>
      <Text style={styles.text}>分鐘</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    margin: 50,
    fontSize: 20,
    fontWeight: '600',
    color: 'rgb(100, 100, 100)'
  },
  time: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'rgb(255, 50, 100)'
  }
});

export default StatisticScreen;