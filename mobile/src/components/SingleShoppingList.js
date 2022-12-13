import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { format } from 'date-fns';


const SingleShoppingList = ({ list }) => {
  return (
    <View style={styles.listView}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 10}}>{list.name} </Text>
      <Text style={{ fontSize: 14, fontWeight: "500"}}>Created: {format(new Date(list.createdAt), 'MMM do yyyy')}</Text>
      <Text style={{ fontSize: 14, fontWeight: "500"}}>Locked: {list.locked ? 'Yes' : 'No'} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    listView: {
        padding: 10,
    }
  });

export default SingleShoppingList;