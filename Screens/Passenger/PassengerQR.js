import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import QRCode from "react-qr-code";
import { useNavigation } from "@react-navigation/native";

import Buttons from "../../components/Buttons";
import ButtonPay from "../../components/ButtonPay";
import Label from "../../components/Label";

const PassengerQR = ({ route }) => {
  //const { amount,idQR,isNew } = route.params;
  //amount===undefined&&(amount="10");
  let idQR=1
  let amount =10
  let isNew=false
  if(route.params!==undefined){
    amount = route.params.amount;
    idQR = route.params.idQR;
    isNew = route.params.isNew;
  }
  
  const [status, setStatus] = useState(0);
  const [modalE, setModalE] = useState(true); //state para el modal de éxito
  const [modalEr, setModalEr] = useState(true); //state para error
  const [modalI, setModalI] = useState(true); //state para internet
  const [modalN, setModalN] = useState(false); //state para modal de nuevo

  const navigation = useNavigation();
  const handleQrError = () => {
    setModalEr(!modalEr);
    navigation.navigate("HomePS");
  };
  const handleInternetError = () => {
    setModalI(!modalI);
    navigation.navigate("HomePS");
  };
  const handleNewQR = () => {
    setModalN(!modalN);

    navigation.navigate("Create");
  };
  const validation = () => {
    const response = "OK";

    if (response === "OK") {
      setStatus(1);
    } else if (response === "saldo") {
      setStatus(2);
    } else if (response === "internet") {
      setStatus(3);
    }
  };

  useEffect(() => {
    validation();
  }, [status]);

  return (
    <View style={styles.container}>
      {status === 1 && (
        <>
          {isNew && (
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalE}
            onRequestClose={() => {
              //Alert.alert("Modal has been closed.");
              setModalE(!modalE);
            }}
            presentationStyle={"overFullScreen"}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Label text={"¡Exito!"} />

                <Text>
                  El código QR se ha creado con éxito.
                  {"\n"}Presione continuar para poder usarlo.
                </Text>

                <Buttons
                  title={"Continuar"}
                  onClick={() => setModalE(!modalE)}
                />
              </View>
            </View>
          </Modal>
          )}
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={amount + "-"+idQR}
            viewBox={`0 0 256 256`}
          />
          <Buttons
            title={"Crear nuevo QR"}
            onClick={() => setModalN(!modalN)}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalN}
            onRequestClose={() => {
              //Alert.alert("Modal has been closed.");
              setModalE(!modalN);
            }}
            presentationStyle={"overFullScreen"}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Label text={"¡Advertencia!"} />

                <Text>
                  El código QR actual se eliminará.
                  {"\n"}El código QR se eliminará y se creará uno nuevo. Pulse confirmar para validar la operación.
                </Text>

                <Buttons title={"Confirmar"} onClick={handleNewQR}/>
                <ButtonPay title={"Cancelar"}  onClick={()=> setModalN(!modalN)}/>

              </View>
            </View>
          </Modal>
        </>
      )}
      {status === 2 && (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalEr}
            onRequestClose={() => {
              //Alert.alert("Modal has been closed.");
              setModalE(!modalEr);
            }}
            presentationStyle={"overFullScreen"}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Label text={"¡Saldo Insuficiente!"} />

                <Text>
                  El código QR no se ha creado.
                  {"\n"}No cuentas con saldo suficiente para realizar esta
                  operación.
                </Text>

                <Buttons title={"Continuar"} onClick={handleQrError} />
              </View>
            </View>
          </Modal>
        </>
      )}
      {status === 3 && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalI}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setModalE(!modalI);
          }}
          presentationStyle={"overFullScreen"}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Label text={"¡Error de Conexión!"} />

              <Text>
                Error de Conexión
                {"\n"}Al parecer hubo un error con tu conexión de Internet.
                {"\n"}Por favor vuelva a intentarlo más tarde.
              </Text>

              <Buttons title={"Continuar"} onClick={handleInternetError} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default PassengerQR;

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
