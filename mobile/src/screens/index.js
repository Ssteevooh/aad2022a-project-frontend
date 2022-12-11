import React from 'react';
import { UnAuthenticatedStackScreen } from '../components/StackNavigator';
import AuthenticatedDrawerScreen from '../components/DrawerNavigator';
import { createStackNavigator } from '@react-navigation/stack';

const AllStack = createStackNavigator();

export default function AllScreens() {
    return (
        <AllStack.Navigator>
            <AllStack.Screen name='UnAuthenticatedStackScreen' component={UnAuthenticatedStackScreen}
                options={{ title: 'UnAuthenticatedStackScreen', headerShown: false }} />
            <AllStack.Screen name='AuthenticatedDrawerScreen' component={AuthenticatedDrawerScreen}
                options={{ title: 'AuthenticatedDrawerScreen', headerShown: false }} />
        </AllStack.Navigator>
    );
};