import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserForm = props => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigation = useNavigation();

    const handleSubmit = () => {
        props.action({
            variables: {
                username: username,
                email: email,
                password: password
            }
        });
    };
    return (
        <View style={styles.formview}>
            <Text style={styles.formlabel}>Username</Text>
            <TextInput style={styles.styledinput}
                onChangeText={text => setUsername(text)}
                value={username}
                textContentType="username"
                autoCapitalize="none"
            />
            {props.formType === 'signUp' && (
                <View>
                    <Text style={styles.formlabel}>Email</Text>
                    <TextInput style={styles.styledinput}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        textContentType="emailAddress"
                        autoComplete="email"
                        autoFocus={true}
                        autoCapitalize="none"
                    />
                </View>
            )}
            <Text style={styles.formlabel}>Password</Text>
            <TextInput style={styles.styledinput}
                onChangeText={text => setPassword(text)}
                value={password}
                textContentType="password"
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={handleSubmit}>
                <Text>Sign In</Text>
            </TouchableOpacity>
            {props.formType !== 'signUp' && (
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text>
                        Not a member? <Text>Create one!</Text>
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default UserForm;

const styles = StyleSheet.create({
    formview: {
        padding: 10
    },
    styledinput: {
        border: 1,
        fontSize: 18,
        padding: 8,
        marginBottom: 24
    },
    formlabel: {
        fontSize: 18,
        fontWeight: "bold"
    },
    formbutton: {
        backgroundColor: "#0077cc",
        width: "100%",
        padding: 8
    },
    buttontext: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18
    }
});