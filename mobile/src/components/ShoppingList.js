import React, { useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import SingleShoppingList from './SingleShoppingList';
import { useMutation, gql } from '@apollo/client';
import Modal from "react-native-modal";

const DELETE_SHOPPING_LIST = gql`
  mutation Mutation($shopping_list_id: ID!) {
    deleteShoppingList(shopping_list_id: $shopping_list_id)
  }
`;

const TOGGLE_SHOPPING_LIST = gql`
  mutation Mutation($shopping_list_id: ID!) {
    toggleShoppingList(shopping_list_id: $shopping_list_id) {
      id
      locked
    }
  }
`;

const ShoppingListComponent = props => {
  const myID = props.me.me.id;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [deleteShoppingList, deleteShoppingListResult] = useMutation(DELETE_SHOPPING_LIST);
  const [toggleShoppingList, toggleShoppingListResult] = useMutation(TOGGLE_SHOPPING_LIST);

  return (
    <>
    <View>
      <FlatList
        data={props.shoppingLists}
        keyExtractor={({ id }) => id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => 
              props.navigation.navigate('Item', {
                id: item.id,
                locked: item.locked,
              })
            }
            onLongPress={() => {
              if (myID === item.owner_family.owner.id) {
                setModalData(item);
                setModalOpen(true);
              }
              
            }}
          >
            <View style={styles.feedView}>
                <SingleShoppingList list={item}/>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
    <Modal style={styles.modal} isVisible={modalOpen} onModalHide={() => {
        setModalData(null);
      }}>
        <View >
          <View style={styles.collectWrapper}>
            <Button style={styles.modalButton}
              title={!modalData?.locked ? 'Lock shopping list' : 'Unlock shopping list'}
              onPress={
                () => {
                  toggleShoppingList({
                    variables: {
                      shopping_list_id: modalData.id,
                    }
                  }).then(data => {
                    setModalData({...modalData, locked: data.data.toggleShoppingList.locked});
                  })
                }}
            />
          </View>
        </View>
        <View >
          <View style={styles.collectWrapper}>
            <Button style={styles.modalButton}
              color={'red'}
              title={'Delete shopping list'}
              onPress={
                () => {
                  deleteShoppingList({
                    variables: {
                      shopping_list_id: modalData.id,
                    }
                  }).then(() => {
                    setModalData(null);
                    setModalOpen(false);
                    props.refetch();
                  })
                }}
            />
          </View>
        </View>
        <View >
          <View style={styles.collectWrapper}>
          <Button style={styles.modalButton} color={'#CCCCCC'} onPress={() => setModalOpen(false)} title="Close" />
          </View>
        </View>
      </Modal>
    </>
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
    modalButton: {
      padding: 3,
      margin: 3,
    },
  });

export default ShoppingListComponent;