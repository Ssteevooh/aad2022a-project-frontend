import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/signin';
import SignUp from '../screens/signup';
import ShoppingList from '../screens/shoppinglist';
import Item from '../screens/item';

const Stack = createStackNavigator();

const UnAuthenticatedStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName='SignIn'>
            <Stack.Screen name='SignIn' component={SignIn}
                options={{ title: 'Sign In' }} />
            <Stack.Screen name='SignUp' component={SignUp}
                options={{ title: 'Sign Up' }} />
        </Stack.Navigator>
    );
};

const ShoppingListStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName='ShoppingList'>
            <Stack.Screen name="Shopping List" component={ShoppingList} />
            <Stack.Screen name="Item" component={Item} />
        </Stack.Navigator>
    );
};

export { UnAuthenticatedStackScreen, ShoppingListStackScreen };