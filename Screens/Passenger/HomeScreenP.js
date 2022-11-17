import React, { useEffect, useState } from "react";

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
import passenger from "../../assets/passenger.png";

//Components
import Header from "../../components/Header";
import Balance from "../../components/Balance";
import Buttons from "../../components/Buttons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreenP = () => {
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState("");

  //recuperando informacion
  const getIdUser = async () => {
    const value = await AsyncStorage.getItem("ID");
    setId(value);
  };

  useEffect(() => {
    getIdUser();
  }, []);
  const navigation = useNavigation();


  //query pide monto
  const getAmount = () => {
    axios
      .get(`http://192.168.1.13:4000/api/amount/${id}`)
      .then((response) => {
        const {status} = response.data
        if(status === 'OK'){
          const { amoAcc } = response.data.result[0];
          setAmount(amoAcc);
        }else if(status==="Error"){
          console.log("no tienes saldo en cuenta");
        }
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  useEffect(() => {
    getAmount();
  }, [id!== "" ]);

  return (
    <View style={styles.container}>
      <Header title="Bienvenido Pasajero(a)" />

      <View style={styles.imageContainerDriver}>
        <Image source={passenger} style={styles.imageDriver} />
      </View>

      <Text style={styles.nameDriver}>Jhonatan Huisacayna</Text>

      <Balance title={"Tienes un saldo de S/."} amount={amount} />

      <Buttons
        title={"Crear QR"}
        onClick={() => navigation.navigate("Create")}
      />
      <Buttons
        title={"Hacer Recarga"}
        onClick={() => navigation.navigate("Transfer")}
      />
    </View>
  );
};
export default HomeScreenP;

const styles = StyleSheet.create({
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
