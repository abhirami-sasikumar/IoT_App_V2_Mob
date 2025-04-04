import React from "react";
import { View } from "react-native";
import { SafeAreaView,SafeAreaProvider} from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ForgotPassword from "./ForgotPassword/ForgotPassword";
import { Otp } from "./Otp/Otp";
import Login from "./Login/Login";
import ClusterName from "./ClusterScreen/ClusterScreen"
import SignUp from "./Signup/Signup";
import LocationScreen from "./LocationScreen/LocationScreen";
import ParameterName from "./ParameterScreen/ParameterScreen";
import ResetOtp from "./ForgotPassword/components/Otp/Otp";

import { UserContext } from "./Contexts/UserContext";
import { useState,setUser } from "react";


import { useFonts } from "expo-font";


export default function App() {
  const [isFontLoaded] = useFonts({
    "Roboto": require('./assets/fonts/Roboto-Regular.ttf'),
  });
// Create Stack Navigator
const Stack = createNativeStackNavigator();

const [user, setUser] = useState({
  jwtToken: "",
  email: "",
  name: "",
});
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};


  return (
    <UserContext.Provider value={{ user, setUser }}>
    <StatusBar/>
    { isFontLoaded && <NavigationContainer theme={navTheme}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <Stack.Navigator
            screenOptions={{ headerShown: false, animation: "fade" }}
            initialRouteName="Login"
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="otp" component={Otp} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="clusters" component={ClusterName} />
          
            <Stack.Screen name="weather" component={LocationScreen} />
            <Stack.Screen name="parameter" component={ParameterName} />
            {/* <Stack.Screen name="profile" component={Profile} /> */}
            <Stack.Screen name="forgotPassword" component={ForgotPassword} />
            <Stack.Screen name="resetOtp" component={ResetOtp} />
          </Stack.Navigator>
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>}
  </UserContext.Provider>
);
}
