import React from "react";
import {View, Text, StyleSheet} from "react-native";

export default (props) => {
    const {text} = props;


    return (
        <View>
            <Text style={styles.textMount}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textMount: {
        fontSize: 19,
        color: "#97382C",
        fontWeight: "500",
      },
})