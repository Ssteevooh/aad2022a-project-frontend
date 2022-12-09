import 'react-native-gesture-handler';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import * as SecureStore from 'expo-secure-store';

import getEnvVars from './config';

import Screens from './src/screens/index';

const { API_URI } = getEnvVars();

const uri = API_URI;
const httpLink = createHttpLink({ uri: uri });

const authLink = setContext(async (_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: (await SecureStore.getItemAsync('token')) || ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        </View>
    );
}

function UserScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        </View>
    );
}

function FamilyScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        </View>
    );
}

function SignOut() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="User" component={UserScreen} />
                    <Drawer.Screen name="Family" component={FamilyScreen} />
                    <Drawer.Screen name="Sign Out" component={SignOut} />
                </Drawer.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    );
};