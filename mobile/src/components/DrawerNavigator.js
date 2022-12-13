import React, { useState, useContext } from 'react';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ShoppingListStackScreen } from './StackNavigator';
import Family from '../screens/family';
import User from '../screens/user';
import SignOut from '../screens/signout';
import { UserContext } from '../../context/UserContext';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import Modal from "react-native-modal";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const { setLoggedIn } = useContext(UserContext);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const navigation = useNavigation();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => setLogoutOpen(!logoutOpen)} />
            <Modal style={styles.modal} isVisible={logoutOpen}>
                <View style={styles.modalWrapper}>
                    <Text style={{ marginLeft: 10 }}>...Are you sure you want to logout?</Text>
                    <View style={styles.buttonWrapper}>
                        <Button style={styles.button} title="Cancel" onPress={() => setLogoutOpen(false)} />
                        <Button style={styles.button} title="Yes" onPress={() => 
                        SecureStore.deleteItemAsync('token').then(() => {
                            setLoggedIn(false);
                            navigation.navigate('UnAuthenticatedStackScreen');
                        })
                        } />
                    </View>
                </View>
            </Modal>
        </DrawerContentScrollView>
    );
}

const AuthenticatedDrawerScreen = (props) => {
    return (
        <Drawer.Navigator initialRouteName="Shopping Lists" drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name='Shopping Lists' component={ShoppingListStackScreen} options={{ title: 'Shopping Lists' }} />
            <Drawer.Screen name="Family" component={Family} />
            <Drawer.Screen name="User" component={User} />
            {/*<Drawer.Screen name="SignOut" component={SignOut} />*/}
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    modal: {
        marginTop: '50%',
        maxHeight: 100,
        width: '90%',
        backgroundColor: '#ced0ce',
        borderRadius: 6,
    },
    modalWrapper: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },
    buttonWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
    },
    button: {
        margin: 10,
        minWidth: 150
    }
});

export default AuthenticatedDrawerScreen;