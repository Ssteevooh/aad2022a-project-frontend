import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useQuery, useMutation, gql } from '@apollo/client';

import Modal from "react-native-modal";

import SelectDropdown from 'react-native-select-dropdown'

const GET_SHOPPING_LIST_CONTENT = gql`
  query {
    getShoppingListContent(shopping_list_id: $shopping_list_id) {
      item {
        name
        price
        description
        id
      }
      collected
      notes
      quantity
      id
    }
  }
`;

const GET_ITEMS = gql`
  query Query {
    getItems {
      name
      id
      description
    }
  }
`;

const CREATE_LIST_ITEM = gql`
  mutation Mutation($shopping_list_id: ID!, $item_id: ID!, $quantity: Int) {
    createListItem(shopping_list_id: $shopping_list_id, item_id: $item_id, quantity: $quantity) {
      item {
        id
        name
      }
    }
  }
`;

const Item = props => {
  const shopping_list_id = props.route.params.id;

  const [open, setOpen] = useState(false);

  const [newListItem, setNewListItem] = useState({});
  const [newListItemQuantity, setNewListItemQuantity] = useState(1);
  const [listItemOptions, setListItemOptions] = useState();

  const listItemQuery = useQuery(GET_ITEMS);
  const shoppingListQuery = useQuery(GET_SHOPPING_LIST_CONTENT, { variables: { shopping_list_id }});
  const [createListItemFunction, { data, loading, error }] = useMutation(CREATE_LIST_ITEM);

  useEffect(() => {
    if (open && listItemQuery.data) {
      let tempList = [];
      for (let index = 0; index < listItemQuery.data.getItems.length; index++) {
        const element = listItemQuery.data.getItems[index];
        tempList.push(element.name);
      }
      setListItemOptions([...tempList])
    } else {
      shoppingListQuery.refetch();
    }
  }, [open])

  return (
    <>
      <View style={styles.center}>
        <View>
          {shoppingListQuery.data &&
          <FlatList
            data={shoppingListQuery.data.getShoppingListContent}
            keyExtractor={({ id }) => id.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  console.log(item);
                }
                }
              >
                <View style={styles.feedView}>
                  <Text> {item.item.name} </Text>
                  <Text> Quantity: {item.quantity} </Text>
                  <Text> {item.collected ? 'Collected': 'Needs to collected'} </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        }
        </View>
      </View>
      <Button style={styles.button} onPress={() => setOpen(!open)} title="Add list item" />
      <Modal isVisible={open} onModalHide={() => {
        setNewListItem({});
        setNewListItemQuantity(1);
      }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <SelectDropdown
            data={listItemOptions}
            onSelect={(selectedItem, index) => {
              setNewListItem(listItemQuery.data.getItems[index].id)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
          />
          <View style={styles.formWrapper}>

            <Text style={styles.formlabel}>Quantity</Text>
            <TextInput style={styles.styledinput}
              onChangeText={number => setNewListItemQuantity(number)}
              value={newListItemQuantity}
              keyboardType='number-pad'
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={[{ width: "40%", margin: 10, padding: 10 }]}>
            <Button style={styles.modalButton} onPress={() => setOpen(!open)} title="Close" />
          </View>
          <View style={[{ width: "40%", margin: 10, padding: 10 }]}>
            <Button onPress={
              () => {
                createListItemFunction({
                  variables: {
                    shopping_list_id: shopping_list_id,
                    item_id: newListItem,
                    quantity: parseInt(newListItemQuantity)
                  }
                }).then(data => {
                  shoppingListQuery.refetch();
                  setOpen(false);
                })
              }}
              disabled={!newListItem} style={styles.modalButton} title="Save"></Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  modalButton: {
    padding: 3,
    margin: 3,
  },
  styledinput: {
    border: 1,
    fontSize: 18,
    padding: 8,
    marginBottom: 24,
    backgroundColor: '#8C888855',
    width: '66%',
    height: 50
  },
  formlabel: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: '#8C8888BB',
    width: '34%',
    height: 50,
    display: 'flex',
    textAlignVertical: 'center',
    textAlign: "center",
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ced0ce'
  },
  feedView: {
    height: 100,
    width: 300,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: "#ced0ce"
}
});

export default Item;