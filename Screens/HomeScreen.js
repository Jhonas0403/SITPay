import React from "react";

import{View, Text} from "react-native"
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ()=> {
    const navigation = useNavigation();
return (
    <View>
        <Text>
            Home
        </Text>
        <TouchableOpacity
        onPress={()=> navigation.navigate("Stack")}
        style={{
            padding:10,
        }}>
            <Text>Prueba</Text>
        </TouchableOpacity>
    </View>
)   
}
export default HomeScreen;