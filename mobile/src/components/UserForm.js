import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserForm = props => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigation = useNavigation();

    const handleSubmit = () => {
        props.action({
            variables: {
                name: name,
                email: email,
                password: password
            }
        });
    };

    return (
        <View style={styles.formview}>
            {props.formType === 'signUp' && (
                <View>
                    <Text style={styles.formlabel}>Your Name</Text>
                    <TextInput style={styles.styledinput}
                        onChangeText={text => setName(text)}
                        value={name}
                        textContentType="username"
                        autoCapitalize="none"
                        autoFocus={props.formType === 'signUp' ? true : false}
                    />
                </View>
            )}
            <View>
                <Text style={styles.formlabel}>Email</Text>
                <TextInput style={styles.styledinput}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    textContentType="emailAddress"
                    autoComplete="email"
                    autoFocus={props.formType !== 'signUp' ? true : false}
                    autoCapitalize="none"
                />
            </View>
            <Text style={styles.formlabel}>Password</Text>
            <TextInput style={styles.styledinput}
                onChangeText={text => setPassword(text)}
                value={password}
                textContentType="password"
                secureTextEntry={true}
            />
            <View style={styles.loginButton}>
                <Button
                    color="#0077aa"
                    title={props.formType === 'signUp' ? 'Sign Up' : 'Sign In'}
                    disabled={!email || !password || (props.formType === 'signUp' ? !name : false)}
                    onPress={() => handleSubmit()}
                />
            </View>
            <View style={styles.loginButton}>
                {props.formType !== 'signUp' && (
                    <Button color='#0077aa' title={'Not a member? Create one!'} onPress={() => navigation.navigate('SignUp')} />
                )}
            </View>
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
        marginBottom: 24,
        backgroundColor: '#8C888833',
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
    },
    loginButton: {
        width: 150,
        marginBottom: 15,
    }
});