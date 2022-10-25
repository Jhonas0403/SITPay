import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//Images
import Chofer from "../../assets/Chofer.png";

//Components
import Header from "../../components/Header";
import Balance from "../../components/Balance";
import Buttons from "../../components/Buttons";

const HomeScreenT = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header title="Bienvenido" />

      <View style={styles.imageContainerDriver}>
        <Image source={Chofer} style={styles.imageDriver} />
      </View>

      <Text style={styles.nameDriver}>Jhonatan Huisacayna</Text>

      <Balance title={"Tienes un saldo de S/."} amount={0} />

      <Buttons
        title={"Escanear QR"}
        onClick={() => navigation.navigate("Scanner")}
      />
    </View>
  );
};
export default HomeScreenT;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#C6553D",
    alignItems: "flex-start",
    width: Dimensions.get("window").width,
    height: 70,
    justifyContent: "flex-start",
  },

  buttonQR: {
    marginTop: 30,
    backgroundColor: "#C6553D",
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

  nameDriver: {
    color: "#CC6655",
    fontWeight: "bold",
    fontSize: 21,
    marginTop: 15,
  },
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Dimensions.get("window").height * 0.05,
    backgroundColor: "#F6E8E2",
  },
  imageDriver: {
    width: 100,
    height: 100,
  },
  imageContainerDriver: {
    borderColor: "#C6553D",
    width: 150,
    height: 150,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F3F0",
    borderRadius: 100,
    marginTop: 60,
  },
});
