import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import Loading from '../components/Loading';

const AuthLoadingScreen = () => {
    const navigation = useNavigation();
    const checkLoginState = async () => {
        const userToken = await SecureStore.getItemAsync('token');
        userToken ? navigation.navigate('AuthenticatedScreens') : navigation.navigate('UnAuthenticatedScreens')
    };
    useEffect(() => {
        checkLoginState();
    });
    return <Loading />;
};

export default AuthLoadingScreen;