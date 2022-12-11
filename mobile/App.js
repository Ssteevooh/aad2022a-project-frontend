import 'react-native-gesture-handler';
import { View, Text, TextInput, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import * as SecureStore from 'expo-secure-store';

import getEnvVars from './config';

import HomeStack from './src/screens/HomeStack';
import AuthStack from './src/screens/AuthStack';

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

function UserScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.navigate('Home')} title='Modify'/>
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
            {/* TODO: Jos ei autentikoitu mene authstack */}
            <AuthStack/>
            {/* TODO: Jos autentikointi on, mene homeen */}
            {/* <HomeStack/> */}
            
        </NavigationContainer>
        </ApolloProvider>
    );
};