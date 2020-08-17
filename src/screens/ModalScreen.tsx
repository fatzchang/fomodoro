import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Vibration, GestureResponderEvent } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';


export interface ModalScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Modal'>
}

const ModalScreen: React.SFC<ModalScreenProps> = ({ navigation }) => {
  useEffect(() => {
    Vibration.vibrate([
      1 * 1000,
      1 * 1000,
      1 * 2000,
      1 * 1000,
    ]);
  }, []);

  const dismissHandler = (e: GestureResponderEvent) => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>休息一下吧！</Text>
      <TouchableOpacity style={styles.dismissButton} onPress={dismissHandler}>
        <Text style={styles.dismissText}>好！</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#777'
  },
  dismissButton: {
    position: "absolute",
    bottom: 100,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderColor: '#999',
  },
  dismissText: {
    color: '#777'
  }
})

export default ModalScreen;