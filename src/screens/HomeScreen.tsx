import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../App';
import { all, CategoryScheme } from '../db/category';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';

export interface HomeScreenProps {
  navigation: StackNavigationProp<MainStackParamList, 'Home'>
}

const HomeScreen: React.SFC<HomeScreenProps> = function HomeScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState<number>(0)
  const categories = useSelector((state: RootState) => state.category.data);

  const cateSelectHandler = (value: React.ReactText, index: number) => {
    setSelectedId(value as CategoryScheme['id']);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.startButton} onPress={() => {
        navigation.push('Clock', {});
      }}>
        <Text style={styles.buttonText}>開始計時</Text>
      </TouchableOpacity>
      {categories.length > 0 && (
        <Picker style={styles.picker} onValueChange={cateSelectHandler} selectedValue={selectedId}>
          {categories.map(category =>
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          )}
        </Picker>
      )}
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
    color: 'black',
    width: 200
  }
});

export default HomeScreen;