import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

//components
import Balance from "../../components/Balance";
import Buttons from "../../components/Buttons";
import Label from "../../components/Label";
import ButtonAdds from "../../components/ButtonAdds";

const Scaner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState(1);
  const [modal, setModal] = useState(false);
  const [amount, setAmount] = useState(1);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setModal(true);
    setText(data);
    console.log("type: " + type + "\nData: " + data);
  };
  const handleCancelScan = () => {
    setModal(!modal);
    setScanned(!scanned);
  };

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <>
          <View>
            <View style={styles.scannerQR}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.frame}
              />
            </View>
          </View>
          <View style={styles.text}>
            {scanned ? (
              <Label text={"QR ENCONTRADO"} />
            ) : (
              <Label text={"BUSCANDO QR"} />
            )}
          </View>

          <View>
            {scanned && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                  //Alert.alert("Modal has been closed.");
                  setModal(!modal);
                }}
                presentationStyle={"overFullScreen"}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Label text={"Monto a cobrarse"} />
                    <View style={styles.actions}>
                      <ButtonAdds
                        type={"add"}
                        onClick={() => {
                          setAmount(amount + 1);
                        }}
                      />
                      <Balance title={"Monto"} amount={amount} />
                      <ButtonAdds
                        type={"substract"}
                        onClick={() => {
                          setAmount(amount - 1);
                        }}
                      />
                    </View>

                    <Buttons title={"Cancelar"} onClick={handleCancelScan} />
                  </View>
                </View>
              </Modal>
            )}
          </View>
        </>
      ) : (
        <View style={{ marginTop: 10 }}>
          <Text>No access to camera</Text>
          <Buttons
            title={"Permitir acceso"}
            onClick={askForCameraPermission()}
          />
        </View>
      )}
    </View>
  );
};

export default Scaner;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F6E8E2",
  },
  actions: {
   flexDirection: "row",
   backgroundColor:"#F9F3F0",
   alignItems:"flex-end",
   justifyContent:"center",
   borderRadius:10
  },

  frame: {
    height: 400,
    width: 400,
    marginTop: 40,
  },
  text: {
    marginTop: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

//desactivar camara, emitir un modal para validar
