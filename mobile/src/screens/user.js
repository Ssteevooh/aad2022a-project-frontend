import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Image, Button, Alert, ScrollView } from "react-native";
import { useQuery, useMutation, gql } from '@apollo/client';


const User = () => {
  const GET_USER_DATA = gql`
  query {
    me {
      invitations {
        family_name
        id
      }
      avatar
      name
      email
    }
  }
  `
  const UPDATE_USER_DATA = gql`
  mutation($name: String, $email: String) {
    updateSelf(name: $name, email: $email) {
      email
      name
      id
    }
  }
  `
  const ACCEPT_INVITE = gql`
  mutation AcceptFamily($family_id: ID!) {
    acceptFamily(family_id: $family_id) {
      family_name
    }
  }
  `
  
 
  const userDataQuery = useQuery(GET_USER_DATA)
  const [updateDataFunction, updateResult] = useMutation(UPDATE_USER_DATA);
  const [acceptInvite, inviteResult] = useMutation(ACCEPT_INVITE);

  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("Email");

  useEffect(() => {
      if (userDataQuery.data) {
        setUserEmail(userDataQuery.data.me.email);
        setUserName(userDataQuery.data.me.name);
      }
  }, [userDataQuery.data]);

  const showAlert = (err) => {
    if(err === undefined) {
      Alert.alert(
        "Message:",
        "Updated successfully",
      );
    } else {
      Alert.alert(
        "Message:",
        "Update failed",
      );
    }
  }

  if (userDataQuery.loading) return <Text> Loading...</Text>
  if (userDataQuery.error) {
    return <Text> Error fetching items</Text>
  } 

  return (
    <ScrollView>
      <View style={styles.center}>
        <Text style={styles.text}>Avatar:</Text>
          <Image
            style={styles.avatar}
            source={{
              uri: userDataQuery.data.me.avatar,
            }}
          />
        <Text style={styles.text}>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUserName(text)}
          value={userName}
        />
        <Text style={styles.text}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUserEmail(text)}
          value={userEmail}
        />
        <Button
          style={styles.button}
          title="Update"
          onPress={() => {
            updateDataFunction({variables: {name: userName, email: userEmail}})
              .then(() => {showAlert(updateResult.error); userDataQuery.refetch()})
          }}
        />
      </View>
      <View style={styles.center}>
        <Text style={styles.text}>Family invitations:</Text>
          {
            userDataQuery.data.me.invitations.map(inv => {
              return (
                <View>
                  <Text>Family name: {inv.family_name}</Text>
                  <Button 
                    style={styles.button}
                    title="Accept invite"
                    onPress={() => {
                      console.log(inv);
                        acceptInvite({variables: {family_id: inv.id}}).then(() => {
                          userDataQuery.refetch();
                        })
                      }
                    } 
                  />
                </View>
              )
            })
          }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  input: {
    fontSize: 20,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  button: {
    height: 80
  }
});

export default User;