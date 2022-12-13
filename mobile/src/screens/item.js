import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useQuery, useMutation, gql } from '@apollo/client';

import Modal from "react-native-modal";

import SelectDropdown from 'react-native-select-dropdown'

const GET_SHOPPING_LIST_CONTENT = gql`
  query($shopping_list_id: ID!) {
    getShoppingListContent(shopping_list_id: $shopping_list_id) {
      name
      notes
      price
      quantity
      id
      collected
    }
  }
`;

const CREATE_LIST_ITEM = gql`
  mutation Mutation($shopping_list_id: ID!, $name: String!, $price: String, $quantity: String, $notes: String) {
    createListItem(shopping_list_id: $shopping_list_id, name: $name, price: $price, quantity: $quantity, notes: $notes) {
      id
      name
    }
  }
`;

const UPDATE_LIST_ITEM = gql`
  mutation($shopping_list_id: ID!, $list_item_id: ID!, $name: String!, $price: String, $quantity: String, $collected: Boolean, $notes: String) {
    updateListItem(shopping_list_id: $shopping_list_id, list_item_id: $list_item_id, name: $name, price: $price, quantity: $quantity, collected: $collected, notes: $notes) {
      id
      name
    }
  }
`;

const DELETE_LIST_ITEM = gql`
  mutation DeleteListItem($list_item_id: ID!, $shopping_list_id: ID!) {
    deleteListItem(list_item_id: $list_item_id, shopping_list_id: $shopping_list_id)
  }
`

const Item = props => {
  const shopping_list_id = props.route.params.id;
  const shoppingListIsLocked = props.route.params.locked;

  console.log(shoppingListIsLocked);

  const [open, setOpen] = useState(false);

  const [newListItemName, setNewListItemName] = useState(null);
  const [newListItemPrice, setNewListItemPrice] = useState(null);
  const [newListItemQuantity, setNewListItemQuantity] = useState(null);
  const [newListItemNotes, setNewListItemNotes] = useState(null);
  const [collected, setCollected] = useState(0);
  const [total, setTotal] = useState(0)

  const [editListItem, setEditListItem] = useState({});
  const [editListItemModal, setEditListItemModal] = useState(false);

  const shoppingListQuery = useQuery(GET_SHOPPING_LIST_CONTENT, { variables: { shopping_list_id } });
  const [createListItemFunction, { data, loading, error }] = useMutation(CREATE_LIST_ITEM);
  const [updateListItemFunction, updateListItemFunctionResult] = useMutation(UPDATE_LIST_ITEM);
  const [deleteListItemFunction, deleteListItemFunctionResult] = useMutation(DELETE_LIST_ITEM);

  useEffect(() => {
    if (shoppingListQuery.data) {
      let tempTotal = 0;
      let tempCollected = 0;
      for (let index = 0; index < shoppingListQuery.data.getShoppingListContent.length; index++) {
        const element = shoppingListQuery.data.getShoppingListContent[index];
        tempTotal = tempTotal + 1;
        if (element.collected) tempCollected = tempCollected + 1;

      }
      setTotal(tempTotal);
      setCollected(tempCollected);
    }
  }, [shoppingListQuery.data])

  if (shoppingListQuery.loading) return <Text> Loading...</Text>
  if (shoppingListQuery.error) {
    return <Text> Error fetching items</Text>
  }
  return (
    <>
      <View style={styles.center}>
        <View>

          {shoppingListQuery.data &&
            <>
              <Text style={{
                fontWeight: "600",
                fontSize: 18,
                color: collected === total ? 'green' : "red",
                marginBottom: 2,
                borderBottomWidth: 1,
                borderBottomColor: '#00000051',
              }}> Items collected {collected}/{total} </Text>
              <FlatList
                data={shoppingListQuery.data.getShoppingListContent}
                keyExtractor={({ id }) => id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onLongPress={() => {
                      setEditListItem(item);
                      setEditListItemModal(true);
                    }}
                    onPress={
                      () => {
                        if (!shoppingListIsLocked) {
                          const requestBody = {
                            list_item_id: item.id,
                            shopping_list_id: shopping_list_id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            notes: item.notes,
                            collected: !item.collected,
                          }

                          updateListItemFunction({
                            variables: requestBody
                          }).then(() => {
                            shoppingListQuery.refetch();
                            setEditListItemModal(false);
                          })
                        }
                      }}
                  >
                    <View style={styles.feedView}>
                      <Text style={{ fontSize: 20, fontWeight: "600" }}> {item.name} </Text>
                      <Text style={styles.bold}>Quantity: {item.quantity} </Text>
                      <Text style={styles.bold}>Price: {item.price} </Text>
                      <Text style={styles.bold}>Notes: {item.notes || ' - '} </Text>
                      <Text style={item.collected ? styles.boldGreen : styles.boldRed}> {item.collected ? 'Collected' : 'Needs to collected'} </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </>
          }
        </View>
      </View>
      {!shoppingListIsLocked &&
        <Button style={styles.button} onPress={() => setOpen(!open)} title="Add list item" />
      }
      <Modal style={styles.modal} isVisible={open && !shoppingListIsLocked} onModalHide={() => {
        setNewListItemName(null);
        setNewListItemNotes(null);
        setNewListItemPrice(null);
        setNewListItemQuantity(null);
      }}>
        <View >
          <View style={styles.formWrapper}>
            <Text style={styles.formlabel}>Item</Text>
            <TextInput style={styles.styledinput}
              onChangeText={text => setNewListItemName(text)}
              value={newListItemName}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View >
          <View style={styles.formWrapper}>
            <Text style={styles.formlabel}>Price</Text>
            <TextInput style={styles.styledinput}
              onChangeText={price => setNewListItemPrice(price)}
              value={newListItemPrice}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View >
          <View style={styles.formWrapper}>
            <Text style={styles.formlabel}>Quantity</Text>
            <TextInput style={styles.styledinput}
              onChangeText={quantity => setNewListItemQuantity(quantity)}
              value={newListItemQuantity}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View >
          <View style={styles.formWrapper}>
            <Text style={styles.formlabel}>Notes</Text>
            <TextInput style={styles.styledinput}
              onChangeText={note => setNewListItemNotes(note)}
              value={newListItemNotes}
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
                const requestBody = {
                  shopping_list_id: shopping_list_id,
                  name: newListItemName,
                  price: newListItemPrice,
                  quantity: newListItemQuantity,
                  notes: newListItemNotes,
                }
                createListItemFunction({
                  variables: requestBody
                }).then(data => {
                  shoppingListQuery.refetch();
                  setOpen(false);
                })
              }}
              disabled={!newListItemName} style={styles.modalButton} title="Save"></Button>
          </View>
        </View>
      </Modal>
      <Modal style={styles.modal} isVisible={editListItemModal && !shoppingListIsLocked} onModalHide={() => {
        setEditListItem({})
      }}>
        <View >
          <View style={styles.collectWrapper}>
            <Button style={styles.collectButton}
              title={editListItem.collected ? 'UnCollect' : 'Collect'}
              onPress={() => setEditListItem({ ...editListItem, collected: !editListItem.collected })}
            />
          </View>
        </View>
        <View >
          <View style={styles.formWrapper}>
            <Text style={styles.formlabel}>Item</Text>
            <TextInput style={styles.styledinput}
              onChangeText={name => setEditListItem({ ...editListItem, name: name })}
              value={editListItem.name}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View >
          <View style={styles.formWrapper}>
            <Text style={styles.formlabel}>Price</Text>
            <TextInput style={styles.styledinput}
              onChangeText={price => setEditListItem({ ...editListItem, price: price })}
              value={editListItem.price}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View >
          <View style={styles.formWrapper}>
            <Text style={styles.formlabel}>Quantity</Text>
            <TextInput style={styles.styledinput}
              onChangeText={quantity => setEditListItem({ ...editListItem, quantity: quantity })}
              value={editListItem.quantity}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View >
          <View style={styles.formWrapper}>
            <Text style={styles.formlabel}>Notes</Text>
            <TextInput style={styles.styledinput}
              onChangeText={note => setEditListItem({ ...editListItem, notes: note })}
              value={editListItem.notes}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={[{ width: "30%", margin: 5, padding: 10 }]}>
            <Button onPress={
              () => {
                const requestBody = {
                  list_item_id: editListItem.id,
                  shopping_list_id: shopping_list_id,
                }
                deleteListItemFunction({
                  variables: requestBody
                }).then(() => {
                  shoppingListQuery.refetch();
                  setEditListItemModal(false);
                })
              }} color={"#ff000055"} style={styles.modalButton} title="Delete"></Button>
          </View>

          <View style={[{ width: "30%", margin: 5, padding: 10 }]}>
            <Button onPress={
              () => {
                const requestBody = {
                  list_item_id: editListItem.id,
                  shopping_list_id: shopping_list_id,
                  name: editListItem.name,
                  price: editListItem.price,
                  quantity: editListItem.quantity,
                  notes: editListItem.notes,
                  collected: editListItem.collected,
                }
                console.log(requestBody);
                updateListItemFunction({
                  variables: requestBody
                }).then(() => {
                  shoppingListQuery.refetch();
                  setEditListItemModal(false);
                })
              }}
              disabled={!editListItem.name} style={styles.modalButton} title="Update"></Button>
          </View>
          <View style={[{ width: "30%", margin: 5, padding: 10 }]}>
            <Button style={styles.modalButton} onPress={() => setEditListItemModal(false)} title="Close" />
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
    borderWidth: 1,
    borderColor: '#00000001',
    width: '66%',
    height: 50,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: 'white'
  },
  formlabel: {
    fontSize: 18,
    fontWeight: "bold",
    width: '34%',
    height: 50,
    display: 'flex',
    textAlignVertical: 'center',
    textAlign: "center",
    borderWidth: 1,
    borderColor: '#00000001',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: 'white'
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 3,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ced0ce'
  },
  feedView: {
    width: 300,
    padding: 5,
    borderRadius: 6,
    marginBottom: 5,
    marginTop: 5,
    overflow: 'hidden',
    backgroundColor: "#00000011",
    borderWidth: 1,
    borderColor: '#00000021',
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  collectWrapper: {
    width: 200,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "500",
    marginLeft: 10,
  },
  boldGreen: {
    fontWeight: "500",
    marginLeft: 10,
    color: "green"
  },
  boldRed: {
    fontWeight: "500",
    marginLeft: 10,
    color: "red"
  },
});

export default Item;