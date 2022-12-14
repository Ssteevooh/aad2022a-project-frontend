import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useQuery, useMutation, gql } from '@apollo/client';
import { Loading } from '../components/Loading'
import Modal from "react-native-modal";
import { Link } from '@react-navigation/native';

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
    name
  }
}
`;

const GET_MY_FAMILY = gql`
  query GetMyFamily {
    getMyFamily {
      family_name
      id
    }
  }
`;

const ShoppingList = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [ShoppingListName, setShoppingListName] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_MY_SHOPPING_LISTS);
  const familyResults = useQuery(GET_MY_FAMILY);
  const me = useQuery(GET_ME);
  const [createShoppingList, createShoppingListResult] = useMutation(CREATE_SHOPPING_LIST);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      me.refetch().then(() => refetch().then(() => familyResults.refetch()))
    });
    return unsubscribe;
  }, [navigation]);

  if (loading || me.loading || familyResults.loading) return <Text>Loading...</Text>;
  if (error || me.error || familyResults.error) {
    return <Text>Error loading shopping lists</Text>;
  }
  return (
    <>
      {familyResults.data.getMyFamily ?
        <>
          <View style={{ maxHeight: '94%' }}>
            <ShoppingListComponent shoppingLists={data.getMyShoppingLists} me={me.data} navigation={navigation} refetch={() => refetch()} />
          </View>
          <Button style={styles.button} title="Create shopping list" onPress={() => setOpen(true)} />
          <Modal isVisible={open} style={styles.modal} onModalHide={() => {
            setShoppingListName(null);
          }}>
            <View style={{ width: '100%' }}>
              <Text style={{ fontSize: 18, marginLeft: 10 }}>Shopping list name</Text>
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
        </> :
        <View style={styles.center}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}> You don't belong to any family...</Text>
          <Text> </Text>
          <Text> Visit <Link to={{ screen: 'Family' }} style={{ fontWeight: "500", color: "blue" }}> Family page </Link>to create one</Text>
          <Text> </Text>
          <Text> Or check if you have invitations in <Link to={{ screen: 'User' }} style={{ fontWeight: "500", color: "blue" }}>user page</Link></Text>
        </View>

      }
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