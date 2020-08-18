import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export interface HeaderButtonProps {
  pressHandler: () => void
}

const HeaderButton: React.SFC<HeaderButtonProps> = ({ pressHandler }) => {
  return (
    <TouchableOpacity style={styles.headerButton} onPress={pressHandler}>
      <AntDesign name="tagso" style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  icon: {
    color: 'black',
    fontSize: 24
  }
})

export default HeaderButton;