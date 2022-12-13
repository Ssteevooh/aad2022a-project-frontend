import React from 'react';
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loading = () => {
    return (
        <View style={styles.loadingwrap}>
            <ActivityIndicator size={"large"} />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingwrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Loading;