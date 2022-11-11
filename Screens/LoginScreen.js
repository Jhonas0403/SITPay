import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  AsyncStorage,
} from "react-native";

//navigation
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Bienvenido</Text>
      <Text style={styles.Subtitle}>Registro</Text>

      <View style={styles.form}>
        <Text style={styles.labels}>Nombre de Usuario</Text>
        <TextInput style={styles.inputs} placeholder="a@a" />

        <Text style={styles.labels}>Contraseña</Text>
        <TextInput
          style={styles.inputs}
          placeholder="contraseña"
          secureTextEntry={true}
        />

        <TouchableOpacity>
          <Text style={styles.forget}>¿Olvidaste tu Contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_login}>
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
