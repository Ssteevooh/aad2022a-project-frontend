import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { format } from 'date-fns';


const SingleShoppingList = ({ list }) => {
  return (
    <ScrollView style={styles.listView}>
      <Text>
        Shopping list {list.name}
      </Text>
      <Text>Created: {format(new Date(list.createdAt), 'MMM do yyyy')}</Text>
      <Text>Locked: {list.locked ? 'Yes' : 'No'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    listView: {
        padding: 10,
    }
  });

export default SingleShoppingList;