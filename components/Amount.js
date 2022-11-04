import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Label from "./Label";


export default (props) => {
  const { title, quantity, defaultMount } = props;
  return (
    <View style={styles.containerData}>
      <Label text={title}/>
      <View style={styles.balanceContainer}>
      <TextInput
              style={styles.balance}
              onChangeText={e=>quantity(e)}
              value={1}
              defaultValue={defaultMount}
              keyboardType="numeric"
            />
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
  },
});
