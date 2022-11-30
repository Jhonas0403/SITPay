import React, { useState } from "react";

import { View, Text, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";


import Label from "../../components/Label";
import Denomination from "../../components/Amount";
import Buttons from "../../components/Buttons";
import ButtonPay from "../../components/ButtonPay";
import Balance from "../../components/Balance";
import Input from "../../components/Input";

const CreateQR = ({ route }) => {
  const navigation = useNavigation();
  const [denominatios, setDenominations] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const { amount, account, id } = route.params;

  
  const data = { idAccount: account, denoCode: denominatios };

  const addCode = () => {
    axios
      .post("http://192.168.1.8:4000/api/code/add", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreationQR = () => {
    setConfirmation(!confirmation);

    addCode();
    
    navigation.navigate("PassengerQR", {
      nombre: denominatios,
      amount,
      account,
      id,
      isNew: true,
    });
  };

  return (
    <View style={styles.container}>
      <Label text={"Creando QR"} />
      <Balance title={"Se crearan los códigos QR por"} amount={amount} />
      <Input title="Denominación para el QR" information={setDenominations} />
      <Buttons
        title={`Crear QR para ${denominatios}`}
        onClick={() => setConfirmation(true)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmation}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModal(!confirmation);
        }}
        presentationStyle={"overFullScreen"}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Label text={"Creando QR"} />
            <Text>
              Se creará un código QR para {denominatios}. Presione confirmar
              para continuar
            </Text>
            <ButtonPay title={"Confirmar"} onClick={handleCreationQR} />
            <Buttons
              title={"Cancelar"}
              onClick={() => setConfirmation(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateQR;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F6E8E2",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    backgroundColor: "#F9F3F0",
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
