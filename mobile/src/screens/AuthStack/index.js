import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './signin';
import SignUp from './signup'

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='AuthScreen'>
            <Stack.Screen
            name='LoginScreen'
            component={SignIn}
            />
            <Stack.Screen
            name='SignUpScreen'
            component={SignUp}
            />
        </Stack.Navigator>
    )
}

export default AuthStack;