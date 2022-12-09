import React from 'react';
import { Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

const SIGNUP_USER = gql`
    mutation ($username: String!, $email: String!, $password: String!) {
        signUp(username: $username, email: $email, password: $password)
    }
`;

const SignUp = () => {
    const navigation = useNavigation();
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
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
            <UserForm action={signUp} fromType="signUp" />
        </React.Fragment>
    );
};

export default SignUp;