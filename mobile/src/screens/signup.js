import React, {useContext} from 'react';
import { Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

import { UserContext } from '../../context/UserContext'

const SIGNUP_USER = gql`
    mutation ($name: String!, $email: String!, $password: String!) {
        signUp(name: $name, email: $email, password: $password)
    }
`;

const SignUp = () => {
    const { setLoggedIn } = useContext(UserContext);
    const navigation = useNavigation();
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            SecureStore.setItemAsync('token', data.signUp).then(() => {
                setLoggedIn(true);
                navigation.navigate('AuthenticatedDrawerScreen');
            }
                
            );
        }
    });
    if (loading) return <Loading />;
    if (error) return <Text>{JSON.stringify(error)}</Text>
    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signUp" />
        </React.Fragment>
    );
};

export default SignUp;