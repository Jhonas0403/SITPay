import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Label from "../../components/Label";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-qr-code";

const AllQr = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState([]);

  const getIdUser = async () => {
    const value = await AsyncStorage.getItem("ID");
    setId(value);
  };
  useEffect(() => {
    getIdUser();
  }, []);

  const gettinAllQr = () => {
    axios
      .get(`http://192.168.1.12:4000/api/code/${id}`)
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Label text={"Los QR relacionados a tu cuenta"} />
        {data.map((val) => {
          return (
            <View style={styles.qrContainer}>
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={id + "-" + val.denoCode}
                viewBox={`0 0 256 256`}
              />
              <Label text={val.denoCode} />
            </View>
          );
        })}
      </View>
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
  qrContainer:{
    alignItems:"center",
    marginTop: 30,
  }
});
