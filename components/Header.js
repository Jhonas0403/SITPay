import React, { Children } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
export default (props) => {
  const { title } = props;
  return (
    <View style={styles.header}>
      
        <Text style={styles.title}>{title}</Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F9F3F0",
    
  },
  header: {
    backgroundColor: "#C6553D",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: 70,
    justifyContent: "center",
  },
});
