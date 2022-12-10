import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ShoppingList = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>This is Shopping List</Text>
      <Button
        title="Go to About Screen"
        onPress={() => navigation.navigate("Item")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default ShoppingList;