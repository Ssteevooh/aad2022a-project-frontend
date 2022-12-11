import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import User from './user'

const Stack = createStackNavigator();

const UserStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name="UserPage"
            component={User}
            />
        </Stack.Navigator>
    )
}
export default Stack;