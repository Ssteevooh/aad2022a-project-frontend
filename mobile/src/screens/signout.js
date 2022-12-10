import React from 'react';
import { View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const SignOut = () => {
    const navigation = useNavigation();
    const signOut = async () => {
        SecureStore.deleteItemAsync('token').then(
            navigation.navigate('UnAuthenticatedScreens')
        );
    };
    return (
        <View>
            <Button title="Sign Out" onPress={signOut} />
        </View>
    );
};

export default SignOut;