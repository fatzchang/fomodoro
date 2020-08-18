import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, List, ListItem, Button } from '@ui-kitten/components';
import { CategoriesScheme } from '../db/categories';

export interface CategoryScreenProps {

}

const data: CategoriesScheme[] = [
  {
    id: 1,
    name: 'algorithm'
  },
  {
    id: 2,
    name: 'data structure'
  },
  {
    id: 1,
    name: 'linear algebra'
  }
]



const CategoryScreen: React.SFC<CategoryScreenProps> = () => {
  const renderItemAccessory = (props: any) => (
    <Button status='danger' size='small'>delete</Button>
  );

  return (
    <List
      style={styles.container}
      data={data}
      ItemSeparatorComponent={Divider}
      renderItem={({ item, index }) => (
        <ListItem
          title={item.name}
          description={'this is description'}
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