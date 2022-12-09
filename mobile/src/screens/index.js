import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons'; 
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const FeedStack = createStackNavigator();
const AuthenticationStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const AllStack = createStackNavigator();

const FeedStackScreen = () => {
    return (
        <FeedStack.Navigator>
            <FeedStack.Screen name="FeedS" component={Feed} options={{ headerShown: false }} />
            <FeedStack.Screen name="NoteS" component={NoteScreen} />
        </FeedStack.Navigator>
    );
};

const SettingsStackScreen = () => {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name='Settings' component={Settings} />
        </SettingsStack.Navigator>
    );
};

function UnAuthenticatedScreens() {
    return (
        <AuthenticationStack.Navigator initialRouteName='SignIn'>
            <AuthenticationStack.Screen name='SignIn' component={SignIn}
            options={{ title: 'Sign In' }}/>
            <AuthenticationStack.Screen name='SignUp' component={SignUp}
            options={{ title: 'Sign Up' }}/>
        </AuthenticationStack.Navigator>
    )
};

function AuthenticatedScreens() {
    return (
        <Tab.Navigator initialRouteName='Feed'>
            <Tab.Screen  
            name="Feed" 
            component={FeedStackScreen} 
            options={{
                title: 'Feed',
                tabBarIcon: ({}) => (
                <AntDesign name="home" size={24} color="black" />
                ),
            }} 
            />
            <Tab.Screen 
            name="Favorites"
            component={Favorites}
            options={{
                title: 'My Favorites',
                tabBarIcon: ({}) => (
                <AntDesign name="staro" size={24} color="black" />
                ),
            }}
            />
            <Tab.Screen 
            name="My Notes"
            component={MyNotes}
            options={{
                title: 'My Notes',
                tabBarIcon: ({}) => (
                <AntDesign name="book" size={24} color="black" />
                ),
            }}
            />
            <Tab.Screen 
            name='SettingsS'
            component={SettingsStackScreen}
            options={{
                title: 'Settings',
                headerShown: false,
                tabBarIcon: ({}) => (
                    <AntDesign name="setting" size={24} color="black" />
                ),
            }}
            />
        </Tab.Navigator>
    )
}

export default function AllScreens() {
    return (
        <AllStack.Navigator initialRouteName='AuthLoadingScreen'>
            <AllStack.Screen name='AuthLoadingScreen' component={AuthLoadingScreen}
            options={{ title: 'AuthLoadingScreen', headerShown: false }}/>
            <AllStack.Screen name='AuthenticatedScreens' component={AuthenticatedScreens}
            options={{ title: 'AuthenticatedScreens', headerShown: false }}/>
            <AllStack.Screen name='UnAuthenticatedScreens' component={UnAuthenticatedScreens}
            options={{ title: 'UnAuthenticatedScreens', headerShown: false }}/>
        </AllStack.Navigator>
    )
};