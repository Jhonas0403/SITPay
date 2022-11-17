import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//navigation
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Label from "../components/Label";


const setInformation = async (props) => {
  const { rolUser, status, idUser } = props;
  try {
    await AsyncStorage.setItem("SESSION", status);
    await AsyncStorage.setItem("ROLE", String(rolUser));
    await AsyncStorage.setItem("ID", String(idUser));
  } catch (error) {
    console.log(error);
    console.log("Error when try to save data");
  }
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [exist, setExist] = useState(false);


  const handleLoginST = () => {
    const usuario = { user, password };
    axios
      .post("http://192.168.1.13:4000/api/users/login", usuario)
      .then((response) => {
        const { status } = response.data;
        if (status === "OK") {
          const { rolUser, idUser } = response.data.result[0];
          setInformation({ rolUser, status, idUser });
          rolUser === 1 && navigation.navigate("Transportist");
          rolUser === 2 && navigation.navigate("Passenger");
        }else if(status === "Error"){
          setExist(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Bienvenido</Text>
      <Text style={styles.Subtitle}>Registro</Text>

      <View style={styles.form}>
        <Text style={styles.labels}>Nombre de Usuario</Text>
        <TextInput
          style={styles.inputs}
          placeholder="a@a"
          onChangeText={(e) => setUser(e)}
        />

        <Text style={styles.labels}>Contraseña</Text>
        <TextInput
          style={styles.inputs}
          placeholder="contraseña"
          secureTextEntry={true}
          onChangeText={(e) => setPassword(e)}
        />

        <TouchableOpacity>
          <Text style={styles.forget}>¿Olvidaste tu Contraseña?</Text>
        </TouchableOpacity>
        {exist&&
          <Label text={"Ingrese correctamente sus crendenciales o Registrese"}/>
        }
        <TouchableOpacity style={styles.button_login} onPress={handleLoginST}>
          <Text style={styles.text_login}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button_register}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.text_register}>Registrate</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  button_register: {
    backgroundColor: "#F0D5CA",
    borderRadius: 15,
    height: 45,
    justifyContent: "center",
    marginTop: 20,
    width: "80%",
  },
  text_register: {
    color: "#C6553D",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  button_login: {
    backgroundColor: "#C6553D",
    borderRadius: 15,
    height: 40,
    justifyContent: "center",
    marginTop: 20,
  },
  text_login: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  forget: {
    color: "#CF7B5A",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Dimensions.get("window").height * 0.05,
  },
  Title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#C6553D",
  },
  Subtitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#C6553D",
    textAlign: "center",
  },
  form: {
    backgroundColor: "#F4F6F7",
    borderRadius: 20,
    padding: 25,
    width:
      Dimensions.get("window").width - Dimensions.get("window").width * 0.2,
    marginTop: 30,
  },
  labels: {
    color: "#C6553D",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  inputs: {
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
  },
});
