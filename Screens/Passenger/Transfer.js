import React, { useState } from "react";

import { View, StyleSheet } from "react-native";
import Label from "../../components/Label";
import Amount from "../../components/Amount";
import Buttons from "../../components/Buttons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Transfer = ({ route }) => {
  const [monto, setMonto] = useState(0);
  const navigation = useNavigation();

  let cantidad = 0;
  let id = "";
  if (route.params !== undefined) {
    cantidad = route.params.cantidad;
    id = route.params.id;
  }

  const handleCharge = () => {
    if (monto === 0 || monto < 0) {
      console.log("el monto minimo es 1");
      setMonto(0);
    } else {
      const data = {
        amount: parseInt(monto) + cantidad,
      };
      axios
        .put(`http://192.168.1.13:4000/api/amount/recarga/${id}`, data)
        .then((response) => {
          console.log(response.data);
          navigation.navigate("HomePS");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Label text={"Haciendo Recarga"} />
      <Amount
        title={"Ingrese el monto a Recargar"}
        quantity={setMonto}
        defaultMount={monto + ""}
      />
      <Buttons title={`Crear QR por S/. ${monto}`} onClick={handleCharge} />
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F6E8E2",
  },
});
