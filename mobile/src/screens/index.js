import React, { useContext } from 'react';
import { UnAuthenticatedStackScreen } from '../components/StackNavigator';
import AuthenticatedDrawerScreen from '../components/DrawerNavigator';
import { createStackNavigator } from '@react-navigation/stack';

import { UserContext } from '../../context/UserContext';

const AllStack = createStackNavigator();

export default function AllScreens() {
    const { loggedIn } = useContext(UserContext);
    return (
        <AllStack.Navigator>
            {
                loggedIn ? <AllStack.Screen name='AuthenticatedDrawerScreen' component={AuthenticatedDrawerScreen}
                    options={{ title: 'AuthenticatedDrawerScreen', headerShown: false }} /> : <AllStack.Screen name='UnAuthenticatedStackScreen' component={UnAuthenticatedStackScreen}
                        options={{ title: 'UnAuthenticatedStackScreen', headerShown: false }} />
            }


        </AllStack.Navigator>
    );
};