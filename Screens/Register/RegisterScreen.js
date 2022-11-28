import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Picker,
  ScrollView,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

//images
import user from "../../assets/user.png";

//components
import Input from "../../components/Input";
import Buttons from "../../components/Buttons";
import Label from "../../components/Label";

const RegisterScreen = () => {
    const navigation = useNavigation();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [dni, setDNI] = useState();
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [role, setRole] = useState(1);
  const roles = ["Transportista", "Pasajero"];

  const handleAdduser = () => {
    if (password === passwordC) {
      const usuario = {
        namUser: name,
        lasNamUser: lastName,
        rolUser: role,
        emailUser: email,
        phoneUser: phone,
        dniUser: dni,
        passUser: password,
      };
      axios
        .post("http://192.168.1.12:4000/api/users/add", usuario)
        .then((response) => {
          if(response.data.status === 'OK'){
            navigation.navigate("LoginScreen")
          }
        })
        .catch((error) => {
          console.log(error);
        });
        {/*axios.get("https://rickandmortyapi.com/api/character").then(response=>{
          console.log(response);
        })*/}
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Image source={user} style={styles.photo} />
        </View>

        <View style={styles.form}>
          <Input title={"Nombre"} information={setName} />
          <Input title={"Apellidos"} information={setLastName} />
          <Input title={"Correo Electrónico"} information={setEmail} />

          <SelectDropdown
            data={roles}
            onSelect={(selectedItem, index) => {
              setRole(index+1);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />

          <Input title={"Número de Celular"} information={setPhone} type={"numeric"} />
          <Input title={"Número de DNI"} information={setDNI} type={"numeric"}/>
          <Input
            title={"Ingresa tu contraseña"}
            information={setPassword}
            security={true}
          />
          <Input
            title={"Vuelve ingresar tu contraseña"}
            information={setPasswordC}
            security={true}
          />
          {
            password!==passwordC && (
                <Label text={"Las contraseñas no coinciden"}/>
            )
          }

          <View style={styles.button}>
            <Buttons title={"Crear usuario"} onClick={handleAdduser} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F6E8E2",
  },
  photoContainer: {
    backgroundColor: "#E6AD97",
    borderRadius: 100,
    height: 180,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  photo: {
    width: 100,
    height: 100,
  },
  form: {
    alignItems: "center",
  },
  button: {
    marginBottom: 20,
  },
});
