import React, { useContext, useEffect } from 'react';
import { UnAuthenticatedStackScreen } from '../components/StackNavigator';
import AuthenticatedDrawerScreen from '../components/DrawerNavigator';
import { createStackNavigator } from '@react-navigation/stack';

import { UserContext } from '../../context/UserContext';

const AllStack = createStackNavigator();

export default function AllScreens(props) {
    const { loggedIn } = useContext(UserContext);
    useEffect(() => {
        if(!loggedIn) {
            props.client.clearStore();
            console.log('here', loggedIn);
        }
    }, [loggedIn])
    return (
        <AllStack.Navigator>
            {
                loggedIn
                ? <AllStack.Screen name='AuthenticatedDrawerScreen' component={AuthenticatedDrawerScreen} options={{ title: 'AuthenticatedDrawerScreen', headerShown: false }} />
                : <AllStack.Screen name='UnAuthenticatedStackScreen' component={UnAuthenticatedStackScreen} options={{ title: 'UnAuthenticatedStackScreen', headerShown: false }} />
            }


        </AllStack.Navigator>
    );
};