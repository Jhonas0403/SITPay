import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text,TouchableOpacity } from "react-native";


export default (props) => {
  const { type, onClick } = props;
  const [buttonText, setButtonText] = useState("");

  const typeButton = () => {
    if (type === "add") {
      setButtonText("+");
    } else if (type === "substract") {
      setButtonText("-");
    }
  };

  useEffect(() => {
    typeButton();
  }, [0]);

  return (
    <View>
      <TouchableOpacity style={
        buttonText === "+"
          ? [style.add, style.container]
          : [style.delete, style.container]
      }
      onPress={onClick}
      >
        <Text style={style.label}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  add: {
    backgroundColor: "#3ABF74",
  },
  label:{
    color:"white",
    fontSize:27,
    fontWeight:"bold"
  },
  delete: {
    backgroundColor: "#B01C42",
  },
  container: {
    width: 50,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin:20
  },
});
