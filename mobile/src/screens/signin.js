import React from 'react';
import { Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

const SIGNIN_USER = gql`
    mutation ($username: String!, $password: String!) {
        signIn(username: $username, password: $password)
    }
`;

const SignIn = () => {
    const navigation = useNavigation();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            SecureStore.setItemAsync('token', data.signIn).then(
                navigation.navigate('AuthenticatedScreens')
            );
        }
    });

    if (loading) return <Loading />;

    if (error) return <Text>{JSON.stringify(error)}</Text>

    return (
        <React.Fragment>
            <UserForm action={signIn} fromType="signIn" />
        </React.Fragment>
    );
};

export default SignIn;