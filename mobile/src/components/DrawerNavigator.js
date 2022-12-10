import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import User from '../screens/user';
import SignOut from '../screens/signout';

const Drawer = createDrawerNavigator();

const AuthenticatedDrawerScreen = () => {
    return (
        <Drawer.Navigator initialRouteName="User">
            <Drawer.Screen name="User" component={User} />
            <Drawer.Screen name="SignOut" component={SignOut} />
        </Drawer.Navigator>
    );
};

export default AuthenticatedDrawerScreen;