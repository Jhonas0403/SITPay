import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Modal } from "react-native";
import Label from "../../components/Label";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-qr-code";
import Buttons from "../../components/Buttons";
import ButtonPay from "../../components/ButtonPay";
const AllQr = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [modalN, setModalN] = useState(false); //state para modal de nuevo
  const [dataD, setDataD] = useState([]);

  const getIdUser = async () => {
    const value = await AsyncStorage.getItem("ID");
    setId(value);
  };
  useEffect(() => {
    getIdUser();
  }, []);

  const gettinAllQr = () => {
    axios
      .get(`http://192.168.1.8:4000/api/code/${id}`)
      .then((response) => {
        setData(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    gettinAllQr();
  }, [id !== ""]);

  const handleDeleteQR = (params) => {
    setModalN(!modalN);
    const { id, val } = params;
    setDataD([id, val]);
  };

  const updateStatusCode = () => {
    const id = dataD[0];
    //console.log(id);
    const data = {
      denomination: dataD[1].denoCode,
    };
    console.log(data);
    axios
      .put(`http://192.168.1.8:4000/api/code/cancel/${id}`, data)
      .then((response) => {
        console.log(response.data, "El código se elimno correctamente");
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const updateStatusQr = () => {
    setModalN(!modalN);
    updateStatusCode();
    gettinAllQr();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Label text={"Los QR relacionados a tu cuenta"} />
        {data.map((val, index) => {
          return (
            <View style={styles.qrContainer} key={index}>
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={id + "-" + val.denoCode}
                viewBox={`0 0 256 256`}
              />
              <Label text={val.denoCode} />
              <Buttons
                title={"Eliminar QR"}
                onClick={() => {
                  handleDeleteQR({ id, val });
                }}
              />
            </View>
          );
        })}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalN}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalN(!modalN);
        }}
        presentationStyle={"overFullScreen"}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Label text={"¡Advertencia!"} />

            <Text>
              El código QR actual se eliminará.
              {"\n"}Pulse confirmar para validar la operación.
            </Text>

            <Buttons title={"Confirmar"} onClick={updateStatusQr} />
            <ButtonPay title={"Cancelar"} onClick={() => setModalN(!modalN)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AllQr;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F6E8E2",
  },
  qrContainer: {
    alignItems: "center",
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
  },
});
