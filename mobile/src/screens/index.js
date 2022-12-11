import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AuthenticatedTabScreen from '../components/TabNavigator';
import { UnAuthenticatedStackScreen } from '../components/StackNavigator';

import User from './user';
import SignOut from './signout';
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const AllStack = createStackNavigator();

function AuthenticatedScreen() {
    return (
        <Drawer.Navigator initialRouteName="User">
            <Drawer.Screen name="Main Screen" component={AuthenticatedTabScreen} />
            <Drawer.Screen name="User" component={User} />
            <Drawer.Screen name="Sign Out" component={SignOut} />
        </Drawer.Navigator>
    );
};

export default function AllScreens() {
    return (
        <AllStack.Navigator>
            <AllStack.Screen name='UnAuthenticatedStackScreen' component={UnAuthenticatedStackScreen}
                options={{ title: 'UnAuthenticatedStackScreen', headerShown: false }} />
            <AllStack.Screen name='AuthenticatedScreen' component={AuthenticatedScreen}
                options={{ title: 'AuthenticatedScreen', headerShown: false }} />
        </AllStack.Navigator>
    );
};