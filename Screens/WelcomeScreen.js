import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import favicon from "../assets/favicon.png"
import { AntDesign } from "@expo/vector-icons";

const Welcomescreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={favicon}/>
      <Text style={styles.Title}>SITPay{"\n"} APP</Text>

      <Text style={styles.Subtitle}>Una forma sencilla de pagar el Bus</Text>

      <TouchableOpacity style={styles.button_continuar}
      onPress={()=> navigation.navigate("LoginScreen")}>
        <Text style={styles.label_continuar}>Continuar</Text>
        <AntDesign
          name="arrowright"
          size={24}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Welcomescreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: Dimensions.get("window").height * 0.05,
    backgroundColor: "#F0D5CA",
  },
  Title: {
    fontSize: 64,
    fontWeight: "bold",
    textAlign: "center",
    color: "#C6553D",
  },
  Subtitle: {
    fontSize: 14,
    color: "#E16C52",
  },
  button_continuar: {
    backgroundColor: "#C6553D",
    height: 60,
    width: 300,
    marginTop: 100,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  label_continuar: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  icon: {
    justifyContent: "flex-end",
    marginRight: 30,
  },
});
