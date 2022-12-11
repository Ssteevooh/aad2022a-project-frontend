import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Family from './family'

const Stack = createNativeStackNavigator();

const FamilyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name="Family"
            component={Family}
            />
        </Stack.Navigator>
    )
}