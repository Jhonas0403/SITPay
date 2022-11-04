import React, { useState } from "react";

import { View, Text, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Label from "../../components/Label";
import Amount from "../../components/Amount";
import Buttons from "../../components/Buttons";
import ButtonPay from "../../components/ButtonPay";

const CreateQR = () => {
  const navigation = useNavigation();
  const [monto, setMonto] = useState(10);
  const [confirmation, setConfirmation] = useState(false);

  const handleCreationQR = () => {
    setConfirmation(!confirmation);
    navigation.navigate("PassengerQR", {
      amount: monto,
      idQR:1,
      isNew:true,
    });
  };

  return (
    <View style={styles.container}>
      <Label text={"Creando QR"} />
      <Amount
        title={"Ingrese el monto para QR"}
        quantity={setMonto}
        defaultMount={monto + ""}
      />
      <Buttons
        title={`Crear QR por S/. ${monto}`}
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
            <Label text={"Monto a cobrarse"} />
            <Text>
              Se creará un código QR por S/.{monto}. Presione confirmar para
              continuar
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
