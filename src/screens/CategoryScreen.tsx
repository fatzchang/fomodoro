import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Divider, List, ListItem, Button } from '@ui-kitten/components';
import { CategoryScheme, all } from '../db/category';

export interface CategoryScreenProps {

}

const data: CategoryScheme[] = [
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
  const [categories, setCategories] = useState<CategoryScheme[]>([])

  const renderItemAccessory = (props: any) => (
    <Button status='danger' size='small'>delete</Button>
  );

  useEffect(() => {
    const getDataAndDisplay = async () => {
      const result = await all();
      setCategories(result.rows._array);
    }
    getDataAndDisplay()
  }, []);

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