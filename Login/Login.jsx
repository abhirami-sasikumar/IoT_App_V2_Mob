import React from "react";
import { View, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard } from "react-native";
import Logo from "../Components/logo/logo";
import ForgotAndReset from "./ForgotAndReset/ForgotAndReset";
import LoginField from "./Loginfield/Loginfield";
import Register from "./Register/Registration";
import { Icfosslogo } from "../Components/Icfosslogo/Icfosslogo";
import styles from "./Login.style"; // Import styles

const Login = () => {
  return (
    <View style={styles.container}>
    
     : (
      <>
        <Logo />
        <LoginField  />
        <ForgotAndReset />
        <Register />
        <Icfosslogo />
      </>
    )
  </View>
);
};

export default Login;

