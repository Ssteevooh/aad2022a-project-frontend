import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import * as SecureStore from 'expo-secure-store';
import { UserProvider } from './context/UserContext';

import Screens from './src/screens/index';

import getEnvVars from './config';

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

export default function App() {
    return (
        <UserProvider>
            <ApolloProvider client={client}>
                <NavigationContainer>
                    <Screens />
                </NavigationContainer>
            </ApolloProvider>
        </UserProvider>
    );
};