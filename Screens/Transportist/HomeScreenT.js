import React from "react";

import{View, Text} from "react-native"
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreenT = ()=> {
    const navigation = useNavigation();
return (
    <View>
        <Text>
            Home
        </Text>
        <TouchableOpacity
        onPress={()=> navigation.navigate("Settings")}
        style={{
            padding:10,
        }}>
            <Text>Home Transportista</Text>
        </TouchableOpacity>
    </View>
)   
}
export default HomeScreenT;