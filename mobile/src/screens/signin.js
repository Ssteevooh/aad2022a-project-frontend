import React, { useContext } from 'react';
import { Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

import { UserContext } from '../../context/UserContext'

const SIGNIN_USER = gql`
    mutation ($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const SignIn = () => {
    const { setLoggedIn } = useContext(UserContext);
    const navigation = useNavigation();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            SecureStore.setItemAsync('token', data.signIn).then(() => {
                setLoggedIn(true)
                navigation.navigate('AuthenticatedDrawerScreen');
            }
            );
        }
    });
    if (loading) return <Loading />;
    if (error) return <Text>{JSON.stringify(error)}</Text>
    return (
        <React.Fragment>
            <UserForm action={signIn} formType="signIn" />
        </React.Fragment>
    );
};

export default SignIn;