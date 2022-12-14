import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./Screens/HomeScreen";

import HomeScreenT from "./Screens/Transportist/HomeScreenT";
import Scaner from "./Screens/Transportist/Scaner";

import HomeScreenP from "./Screens/Passenger/HomeScreenP";
import CreateQR from "./Screens/Passenger/CreateQR";
import Transfer from "./Screens/Passenger/Transfer";
import PassengerQR from "./Screens/Passenger/PassengerQR";
import AllQr from "./Screens/Passenger/AllQr"

import SettingsScreen from "./Screens/SettingScreen";
import StackScreen from "./Screens/StackScreen";
import LoginScreen from "./Screens/LoginScreen";
import Welcomescreen from "./Screens/WelcomeScreen";
import RegisterScreen from "./Screens/Register/RegisterScreen";

import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeStackNavigator = createNativeStackNavigator();
//ejemplo de Stack
function MyStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName="HomeScreen">
      <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStackNavigator.Screen name="Stack" component={StackScreen} />
    </HomeStackNavigator.Navigator>
  );
}

//ejemplo de tab
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={MyStack}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
          headerShown: false,
        }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const LoginStackNavigator = createNativeStackNavigator();
const LogginStack = () => {
  return (
    <LoginStackNavigator.Navigator initialRouteName="Welcome">
      <LoginStackNavigator.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <LoginStackNavigator.Screen
        name="Welcome"
        component={Welcomescreen}
        options={{ headerShown: false }}
      />
      <LoginStackNavigator.Screen name="Register" component={RegisterScreen} />
      <LoginStackNavigator.Screen name="Transportist" component={TransportistaTab}  options={{ headerShown: false }}/>
      <LoginStackNavigator.Screen name="Passenger" component={PassengerTab}  options={{ headerShown: false }}/>
    </LoginStackNavigator.Navigator>
  );
};

const PassengerStack = createNativeStackNavigator();
//Stack from Transportist
const PassengerS = () => {
  return (
    <PassengerStack.Navigator initialRouteName="HomePS">
      <PassengerStack.Screen
        name="HomePS"
        component={HomeScreenP}
        options={{ headerShown: false }}
      />
      <PassengerStack.Screen name="Create" component={CreateQR} />
      <PassengerStack.Screen name="PassengerQR" component={PassengerQR} />
      <PassengerStack.Screen name="Transfer" component={Transfer} />
    </PassengerStack.Navigator>
  );
};

const PTab = createBottomTabNavigator();

const PassengerTab = () => {
  return (
    <PTab.Navigator initialRouteName="HomeP">
      <PTab.Screen
        name="HomeP"
        component={PassengerS}
        options={{
          headerShown: false,
          tabBarLabel: "Inicio",
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
          headerShown: false,
        }}
      />
      <PTab.Screen name="See" component={AllQr} />
    </PTab.Navigator>
  );
};

const TransportistStack = createNativeStackNavigator();
//Stack from Transportist
const TransportistS = () => {
  return (
    <TransportistStack.Navigator initialRouteName="HomeTS">
      <TransportistStack.Screen
        name="HomeTS"
        component={HomeScreenT}
        options={{ headerShown: false }}
      />
      <TransportistStack.Screen name="Scanner" component={Scaner} />
    </TransportistStack.Navigator>
  );
};

const TTab = createBottomTabNavigator();

const TransportistaTab = () => {
  return (
    <TTab.Navigator initialRouteName="HomeT">
      <TTab.Screen
        name="HomeT"
        component={TransportistS}
        options={{
          headerShown: false,
          tabBarLabel: "Inicio",
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
          headerShown: false,
        }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </TTab.Navigator>
  );
};

export default function Navigation() {
  const [isSigned, setIsSigned] = useState("");
  const [isTransportist, setIsTransportist] = useState("");
  const getInformation = async () => {
    try {
      value1 = await AsyncStorage.getItem("SESSION");
      setIsSigned(value1);
      value2 = await AsyncStorage.getItem("ROLE");
      setIsTransportist(value2);
    } catch (e) {
      //    console.log(error);
    }
  };

  getInformation();

  return (
    <NavigationContainer>
      {isSigned === "OK"
        ? isTransportist == "1"
          ? TransportistaTab()
          : PassengerTab()
        : LogginStack()}
    </NavigationContainer>
  );
}

const getval = async () => {
  return await AsyncStorage.getItem("ACCESS");
};
