import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { UnAuthenticatedStackScreen } from '../components/StackNavigator';
import AuthenticatedTabScreen from '../components/TabNavigator';
import AuthenticatedDrawerScreen from '../components/DrawerNavigator';

const AllStack = createStackNavigator();

export default function AllScreens() {
    return (
        <AllStack.Navigator>
            {/*
            <AllStack.Screen name='UnAuthenticatedStackScreen' component={UnAuthenticatedStackScreen}
                options={{ headerShown: false}} />
            */}
            <AllStack.Screen name='AuthenticatedTabScreen' component={AuthenticatedTabScreen}
                options={{ headerShown: false}} />
            <AllStack.Screen name='AuthenticatedDrawerScreen' component={AuthenticatedDrawerScreen}
                options={{ headerShown: false}} />
        </AllStack.Navigator>
    )
};