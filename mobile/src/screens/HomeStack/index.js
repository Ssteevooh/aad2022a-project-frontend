import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home'

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen
        name='HomeScreen'
        component={Home}
        />
        
    </Stack.Navigator>
    )
}

export default HomeStack;