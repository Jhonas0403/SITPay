import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, TextInput } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

//components
import Balance from "../../components/Balance";
import Buttons from "../../components/Buttons";
import Amount from "../../components/Amount";

const Scaner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState(1);

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
    setText(data);
    console.log("type: " + type + "\nData: " + data);
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
          <Amount title={"Monto a cobrar S/."} quantity={2} />
          
          <View>
            {scanned && (
              <Buttons
                title={"Escanear Nuevo QR"}
                onClick={() => [setScanned(false), setText("1")]}
              />
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
    backgroundColor: "#fff",
    //marginTop: Dimensions.get("window").height * 0.05,
    backgroundColor: "#F6E8E2",
  },
  frame: {
    height: 400,
    width: 400,
    marginTop: 40,
  },
});

//desactivar camara, emitir un modal para validar