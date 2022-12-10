import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShoppingListStackScreen } from './StackNavigator';

import Family from '../screens/family';

const Tab = createBottomTabNavigator();

const AuthenticatedTabScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="ShoppingListS"
                component={ShoppingListStackScreen}
                options={{
                    headerShown: false,
                    title: 'Shopping List',
                }}
            />
            <Tab.Screen
                name="Family"
                component={Family}
                options={{
                    title: 'Family',
                }}
            />
        </Tab.Navigator>
    );
};

export default AuthenticatedTabScreen;