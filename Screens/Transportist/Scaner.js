import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

//components
import Balance from "../../components/Balance";
import Buttons from "../../components/Buttons";
import Label from "../../components/Label";
import ButtonAdds from "../../components/ButtonAdds";
import ButtonPay from "../../components/ButtonPay";
import axios from "axios";

const Scaner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState([]); //information qr
  const [modal, setModal] = useState(false);
  const [amount, setAmount] = useState(1);

  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const [sufficientBalance, setSufficientBalance] = useState(false);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };
  useEffect(() => {
    askForCameraPermission();
  }, [0]);

  const validationStatus = (params) => {
    const deno = params.substr(2, params.length);
    const id = params[0];
    const data = {
      denomination: deno,
    };
    axios
      .post(`http://192.168.1.8:4000/api/code/status/${id}`, data)
      .then((response) => {
        response.data.result[0].status===1 && setModal(true);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //setModal(true);
    setCode(data);
    validationStatus(data);
  };
  const handleCancelScan = () => {
    modal && setModal(!modal);
    insufficientBalance && setInsufficientBalance(!insufficientBalance);
    sufficientBalance && setSufficientBalance(!sufficientBalance);

    setScanned(!scanned);
    setAmount(1);
  };

  const validateAmount = () => {
    if (amount < 0) {
      setAmount(0);
    }
  };

  useEffect(() => {
    validateAmount();
  }, [amount]);

  const handlePayment = () => {
    //hacer validacion
    const amountCode = parseInt(code);
    setModal(!modal);

    if (amountCode < amount) {
      setInsufficientBalance(true);
    } else if (amountCode >= amount) {
      setSufficientBalance(true);
    }
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
                        type={"substract"}
                        onClick={() => {
                          setAmount(amount - 1);
                        }}
                      />
                      <Balance title={"Monto"} amount={amount} />
                      <ButtonAdds
                        type={"add"}
                        onClick={() => {
                          setAmount(amount + 1);
                        }}
                      />
                    </View>
                    <ButtonPay title={"Cobrar"} onClick={handlePayment} />
                    <Buttons title={"Cancelar"} onClick={handleCancelScan} />
                  </View>
                </View>
              </Modal>
            )}

            {insufficientBalance && (
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={insufficientBalance}
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
                        <Text>Saldo insuficiente</Text>
                      </View>
                      <Buttons title={"Cancelar"} onClick={handleCancelScan} />
                    </View>
                  </View>
                </Modal>
              </View>
            )}

            {sufficientBalance && (
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={sufficientBalance}
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
                        <Text>Cobro realizado con éxito</Text>
                      </View>
                      <Buttons title={"Cancelar"} onClick={handleCancelScan} />
                    </View>
                  </View>
                </Modal>
              </View>
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
    backgroundColor: "#F9F3F0",
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: 10,
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
