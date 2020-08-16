import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';


export interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

const HomeScreen: React.SFC<HomeScreenProps> = function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        navigation.push('Clock', {});
      }}>
        <Text style={styles.buttonText}>start</Text>
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
  buttonText: {
    fontSize: 30
  }
});

export default HomeScreen;