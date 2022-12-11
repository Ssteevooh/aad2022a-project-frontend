import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useQuery, gql } from '@apollo/client';
import {Loading} from '../components/Loading'

import ShoppingListComponent from "../components/ShoppingList";

const GET_MY_SHOPPING_LISTS = gql`
query {
  getMyShoppingLists {
    id
    name
    locked
    createdAt
  }
}
`;

const ShoppingList = ({ navigation }) => {

  const { loading, error, data } = useQuery(GET_MY_SHOPPING_LISTS);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading notes</Text>;

  return (
    <ShoppingListComponent shoppingLists={data.getMyShoppingLists} navigation={navigation} />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default ShoppingList;