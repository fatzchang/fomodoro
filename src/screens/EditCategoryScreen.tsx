import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import { insertIfNotExist } from '../db/category';


export interface EditCategoryScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'EditCategory'>
}

const EditCategoryScreen: React.SFC<EditCategoryScreenProps> = ({ navigation }) => {
  const [value, setValue] = React.useState('');

  const submitHandler = async () => {
    await insertIfNotExist(value);
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder='category name'
        value={value}
        onChangeText={nextValue => setValue(nextValue)}
      />
      <Button style={styles.button} disabled={!value} onPress={submitHandler}>
        Add Category
    </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  button: {
    marginTop: 20
  }
});

export default EditCategoryScreen;