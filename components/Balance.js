import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default (props) => {
  const { title, amount } = props;
  return (
    <View style={styles.containerData}>
      <Text style={styles.textMount}>{title}</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>{amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balance: {
    fontSize: 20,
    fontWeight: "bold",
  },
  balanceContainer: {
    marginTop: 10,
    backgroundColor: "#D9D9D9",
    width: 70,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  textMount: {
    fontSize: 19,
    color: "#97382C",
    fontWeight: "500",
  },
    containerData: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F3F0",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom:10,
  },
});
