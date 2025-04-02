import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

// import Login from "./Login/Login";
// import ClusterName from "./ClusterScreen/ClusterScreen"
// import SignUp from "./Signup/Signup";
// import LocationScreen from "./LocationScreen/LocationScreen";

// Create Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <View>
    <ForgotPassword/>
   </View>
  );
}
