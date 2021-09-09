import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, List, ListItem, Button } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';

export interface CategoryScreenProps {

}

const CategoryScreen: React.SFC<CategoryScreenProps> = () => {
  const categories = useSelector((state: RootState) => state.category.data);

  const renderItemAccessory = (props: any) => (
    <Button status='danger' size='small'>delete</Button>
  );

  return (
    <List
      style={styles.container}
      data={categories}
      ItemSeparatorComponent={Divider}
      renderItem={({ item, index }) => (
        <ListItem
          title={item.name}
          // description={'this is description'}
          // accessoryLeft={renderItemIcon}
          accessoryRight={renderItemAccessory}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {

  }
})

export default CategoryScreen;