import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default (props) => {
  const { title, onClick } = props;

  return (
    <TouchableOpacity style={styles.buttonQR} onPress={onClick}>
      <Text style={styles.TextQR}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
    buttonQR: {
      marginTop: 30,
      backgroundColor: "#3181C7",
      borderRadius: 10,
      width: 250,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    TextQR: {
      fontSize: 19,
      fontWeight: "bold",
      color: "#F9F3F0",
    },
  });