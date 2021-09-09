import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../App';
import { CategoryScheme } from '../db/category';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/types';
import { startSegment } from '../store/segment/actions';
import { todayString, oneByDate } from '../db/date';
import { Ionicons } from '@expo/vector-icons';

export interface HomeScreenProps {
  navigation: StackNavigationProp<MainStackParamList, 'Home'>
}

const HomeScreen: React.SFC<HomeScreenProps> = function HomeScreen({ navigation }) {
  const categories = useSelector((state: RootState) => state.category.data);
  const [selectedId, setSelectedId] = useState<number | null>(categories[0] ? categories[0].id : null);
  const dispatch = useDispatch();

  const cateSelectHandler = (value: React.ReactText, index: number) => {
    setSelectedId(value as CategoryScheme['id']);
  }

  const starthandler = async () => {
    const targetCate = categories.find(cate => cate.id === selectedId)!;
    if (selectedId) {
      dispatch(startSegment(selectedId, targetCate.name, Date.now()));
    }
    navigation.navigate('Clock', {});
  }

  const toStatsHandler = () => {
    navigation.navigate('Statistic', {});
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.startButton} onPress={starthandler}>
        <Text style={styles.buttonText}>開始計時</Text>
      </TouchableOpacity>
      {categories.length > 0 && (
        <Picker style={styles.picker} onValueChange={cateSelectHandler} selectedValue={selectedId}>
          {categories.map(category =>
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          )}
        </Picker>
      )}
      <TouchableOpacity onPress={toStatsHandler} style={styles.stats}>
        <Ionicons style={styles.statsIcon} name="ios-stats" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    padding: 10
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '900',
    color: 'rgb(255, 50, 100)'
  },
  picker: {
    width: 200,
  },
  stats: {
    position: 'absolute',
    padding: 30,
    bottom: 150,
  },
  statsIcon: {
    color: 'rgb(100, 100, 100)',
    fontSize: 20
  }
});

export default HomeScreen;