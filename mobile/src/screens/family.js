import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity, Image, ScrollView } from "react-native";
import { useQuery, useMutation, gql } from '@apollo/client';

import Modal from "react-native-modal";

const GET_MY_FAMILY = gql`
  query GetMyFamily {
    getMyFamily {
      family_name
      id
      members {
        name
        avatar
      }
      owner {
        avatar
        name
      }
    }
  }
`;

const LEAVE_FAMILY = gql`
  mutation Mutation {
    leaveFamily
  }
`;

const CREATE_FAMILY = gql`
  mutation Mutation($family_name: String) {
    createFamily(family_name: $family_name) {
      family_name
    }
  }
`;

const USERS_TO_INVITE = gql`
  query Query {
    usersToInvite {
      id
      name
      avatar
    }
  }
`;

const INVITE_MEMBER_TO_FAMILY = gql`
  mutation Mutation($user_id: ID!) {
    inviteMember(user_id: $user_id)
  }
`;

const Family = () => {

  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_MY_FAMILY);
  const usersToInviteResults = useQuery(USERS_TO_INVITE);

  const [leaveFamilyFunction, leaveResult] = useMutation(LEAVE_FAMILY);
  const [createFamilyFunction, createResult] = useMutation(CREATE_FAMILY);
  const [inviteMemberFunction, inviteResult] = useMutation(INVITE_MEMBER_TO_FAMILY);

  const [familyName, setFamilyName] = useState(null);

  if (loading) return <Text> Loading...</Text>
  if (error) { return <Text> Error...</Text>; }
  if (data?.getMyFamily) {
    return (
      <>
      <ScrollView>
        <View style={styles.center}>
          <View style={styles.wrapperHeader}>
            <Text style={{ fontSize: 30 }}>FAMILY {data.getMyFamily.family_name}</Text>
          </View>
          <Text style={{ fontSize: 30, margin: 10 }}>Owner</Text>
          <View style={styles.wrapper}>
            <Text style={{ fontSize: 20 }}>{data.getMyFamily.owner.name}</Text>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: data.getMyFamily.owner.avatar,
              }}
            />
          </View>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Members</Text>
          <View style={styles.memberWrapper}>
            {data.getMyFamily.members.map((member, index) => {
              return (
                <View style={styles.members}>
                  <Text key={'text' + index} style={{ fontSize: 20, paddingTop: 15 }}>{member.name}</Text>
                  <Image
                    key={'image' + index}
                    style={styles.tinyLogo}
                    source={{
                      uri: member.avatar,
                    }}
                  />
                </View>
              )
            })}
          </View>
          <View>
            <Button title="Leave family" onPress={() => { leaveFamilyFunction(); setUpdate(!update); refetch(); }} />
          </View>
        </View>
      </ScrollView>
        
        <View>
          <Button onPress={() => setOpen(!open)} title="Add New Member To Your Family" />
          <Modal isVisible={open}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              <Text style={{ fontSize: 20 }}>MEMBERS WITHOUT FAMILY</Text>
              <View>
                {usersToInviteResults?.data?.usersToInvite?.map(user => {
                  return (
                    <>
                      <Text style={{ fontSize: 20 }}>Name: {user.name}</Text>
                      <Image
                        style={styles.tinyLogo}
                        source={{
                          uri: user.avatar,
                        }}
                      />
                      <View style={[{ width: "40%", margin: 10, padding: 10 }]}>
                        <Button title="Add" onPress={
                          () => {
                            inviteMemberFunction({
                              variables: {
                                user_id: user.id,
                              }
                            }).then(data => {
                              usersToInviteResults.refetch();
                              setUpdate(!update)
                            })
                          }}
                        ></Button>
                      </View>
                    </>
                  )
                })}
              </View>
              <Button title="Close" onPress={() => { refetch(); setOpen(!open) }} />
            </View>
          </Modal>
        </View>
      </>
    );
  } else {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 20 }}>You dont belong to any family.</Text>
        <Text style={{ fontSize: 20 }}>Do you want to create one?</Text>
        <TextInput style={styles.styledinput}
          onChangeText={text => setFamilyName(text)}
          value={familyName}
          textContentType="name"
          autoCapitalize="sentences"
          autoFocus={true}
          placeholder="Family name"
        />
        <View>
          <Button title="Create" onPress={() => { createFamilyFunction({ variables: { family_name: familyName } }); setUpdate(!update); refetch(); }} />
        </View>

      </View>

    )
  }
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#11111133',
    padding: 10,
    alignContent: 'center',
    width: 300,
    height: 70,
    borderRadius: 6,
    marginBottom: 10,
  },
  wrapperHeader: {
    marginBottom: 5,
  },
  tinyLogo: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 50,
    height: 50,
    marginLeft: 30,
  },
  styledinput: {
    margin: 20,
    padding: 5,
    width: 200,
    height: 60,
    lineHeight: 50,
    fontSize: 25,
    backgroundColor: "#11111133",
  },
  memberWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    alignContent: 'center',
    width: 300,
    borderRadius: 6,
    marginBottom: 30,
  },
  members: {
    height: 60,
  }
});

export default Family;