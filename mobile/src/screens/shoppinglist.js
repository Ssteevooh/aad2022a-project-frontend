import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useQuery, useMutation, gql } from '@apollo/client';
import { Loading } from '../components/Loading'
import Modal from "react-native-modal";

import ShoppingListComponent from "../components/ShoppingList";

const GET_MY_SHOPPING_LISTS = gql`
query Querry{
  getMyShoppingLists {
    id
    name
    locked
    createdAt
    owner_family {
      owner {
        id
      }
    }
  }
}
`;

const CREATE_SHOPPING_LIST = gql`
mutation Mutation($name: String) {
  createShoppingList(name: $name) {
    name
  }
}
`;

const GET_ME = gql`
  query Query {
    me {
      id
    }
  }
`;

const ShoppingList = ({ navigation }) => {

  const [open, setOpen] = useState(false);
  const [ShoppingListName, setShoppingListName] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_MY_SHOPPING_LISTS);
  const me = useQuery(GET_ME);
  const [createShoppingList, createShoppingListResult] = useMutation(CREATE_SHOPPING_LIST);
  if (loading || me.loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading shopping lists</Text>;

  return (
    <>
      <View style={{maxHeight: '94%'}}>
        <ShoppingListComponent shoppingLists={data.getMyShoppingLists} me={me.data} navigation={navigation} refetch={() => refetch()}/>
      </View>
      <Button style={styles.button} title="Create shopping list" onPress={() => setOpen(true)}/>
      <Modal isVisible={open} style={styles.modal} onModalHide={() => {
        setShoppingListName(null);
      }}>
        <View style={{ width: '100%' }}>
            <Text style={{fontSize: 18, marginLeft: 10}}>Shopping list name</Text>
            <TextInput style={styles.styledinput}
              onChangeText={text => setShoppingListName(text)}
              value={ShoppingListName}
              autoCapitalize=""
            />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={[{ width: "40%", margin: 10, padding: 10 }]}>
            <Button style={styles.modalButton} onPress={() => setOpen(!open)} title="Close" />
          </View>
          <View style={[{ width: "40%", margin: 10, padding: 10 }]}>
          <Button onPress={
              () => {
                createShoppingList({
                  variables: {
                    name: ShoppingListName,
                  }
                }).then(() => {
                  refetch();
                  setOpen(false);
                })
              }}
              disabled={!ShoppingListName} style={styles.modalButton} title="Save"></Button>
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
    width: 80,
  },
  modalButton: {
    padding: 3,
    margin: 3,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: '50%',
    maxHeight: 150,
    backgroundColor: '#ced0ce',
    borderRadius: 6,
  },
  styledinput: {
    backgroundColor: 'white',
    margin: 10,
    fontSize: 16,
  }
});

export default ShoppingList;