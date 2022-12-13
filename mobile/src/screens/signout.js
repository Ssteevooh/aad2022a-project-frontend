import React, { useContext } from 'react';
import { View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/UserContext';

const SignOut = () => {
    const { setLoggedIn } = useContext(UserContext);
    const navigation = useNavigation();
    const signOut = async () => {
        SecureStore.deleteItemAsync('token').then(() => {
            setLoggedIn(false);
            navigation.navigate('UnAuthenticatedStackScreen');
        });
    };
    return (
        <View>
            <Button title="Sign Out" onPress={signOut} />
        </View>
    );
};

export default SignOut;