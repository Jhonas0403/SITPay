import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./Screens/HomeScreen";

import HomeScreenT from "./Screens/Transportist/HomeScreenT";
import Scaner from "./Screens/Transportist/Scaner";

import SettingsScreen from "./Screens/SettingScreen";
import StackScreen from "./Screens/StackScreen";
import LoginScreen from "./Screens/LoginScreen";
import Welcomescreen from "./Screens/WelcomeScreen";
import { Entypo } from "@expo/vector-icons";

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
    </LoginStackNavigator.Navigator>
  );
};

const TransportistStack = createNativeStackNavigator();
//Stack from Transportist
const TransportistS = () => {
  return (
    <TransportistStack.Navigator initialRouteName="HomeTS">
      <TransportistStack.Screen name="HomeTS" component={HomeScreenT} options={{headerShown:false}} />
      <TransportistStack.Screen name="Scanner" component={Scaner}/>
    </TransportistStack.Navigator>
  );
};

const TTab = createBottomTabNavigator();

const TransportistaTab = () => {
  return (
    <TTab.Navigator initialRouteName="Home">
      <TTab.Screen
        name="Home"
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

const isSigned = true; //Variable que validará para el token

export default function Navigation() {
  return (
    <NavigationContainer>
      {isSigned ? TransportistaTab() : LogginStack()}
    </NavigationContainer>
  );
}

const getval = async () => {
  return await AsyncStorage.getItem("ACCESS");
};
