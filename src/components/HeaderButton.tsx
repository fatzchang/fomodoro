import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from '@ui-kitten/components';

export interface HeaderButtonProps {
  pressHandler: () => void
  icon: 'tag' | 'plus'
}

const HeaderButton: React.SFC<HeaderButtonProps> = ({ pressHandler, icon }) => {
  let iconElement = <AntDesign name="tagso" style={styles.icon} />;
  if (icon === 'plus') {
    iconElement = <AntDesign name="plussquareo" style={styles.icon} />;
  }

  return (
    <TouchableOpacity style={styles.headerButton} onPress={pressHandler}>
      {iconElement}
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