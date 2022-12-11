import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AuthenticatedTabScreen from '../components/TabNavigator';

import User from './user';
import SignOut from './signout';

const Drawer = createDrawerNavigator();


export default function AllScreens() {
    return (
        <Drawer.Navigator initialRouteName="User">
            <Drawer.Screen name="Main Screen" component={AuthenticatedTabScreen} />
            <Drawer.Screen name="User" component={User} />
            <Drawer.Screen name="Sign Out" component={SignOut} />
        </Drawer.Navigator>
    )
};