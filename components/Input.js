import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default (props) => {
  const { title, type, information, security } = props;
  return (
    <View>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        style={styles.field}
        onChangeText={(e) => information(e)}
        keyboardType={type}
        secureTextEntry={security}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "#C6553D",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  field: {
    backgroundColor: "#fff",
    width: 330,
    height: 49,
    borderRadius: 10,
    borderColor: "#C6553D",
    borderWidth: 1,
    fontSize: 16,
  },
});
