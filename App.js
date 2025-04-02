import React from "react";
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
    <NavigationContainer theme={DefaultTheme}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Stack.Navigator initialRouteName="Login"> */}
          {/* <Stack.Screen name="Login" component={Login} /> */}
          {/* <Stack.Screen name="ClusterName" component={ClusterName} /> */}
          {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
          {/* <Stack.Screen name="LocationScreen" component={LocationScreen} /> */}
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        {/* </Stack.Navigator> */}
      </SafeAreaView>
    </NavigationContainer>
  );
}
