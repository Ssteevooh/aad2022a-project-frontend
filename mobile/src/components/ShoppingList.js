import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SingleShoppingList from './SingleShoppingList';

const ShoppingListComponent = props => {
  return (
    <View>
      <FlatList
        data={props.shoppingLists}
        keyExtractor={({ id }) => id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => 
              props.navigation.navigate('Item', {
                id: item.id
              })
            }
          >
            <View style={styles.feedView}>
                <SingleShoppingList list={item}/>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#ced0ce'
    },
    feedView: {
        height: 100,
        overflow: 'hidden',
        marginBottom: 10,
    }
  });

export default ShoppingListComponent;