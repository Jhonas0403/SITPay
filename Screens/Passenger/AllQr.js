import React from "react";
import { View, StyleSheet } from "react-native";
import Label from "../../components/Label";

const AllQr= () =>{
return (
    <View style={styles.container}>
        <Label text={"Los QR relacionados a tu cuenta"} />
    </View>
)
}

export default AllQr;

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1,
      backgroundColor: "#F6E8E2",
    }
});