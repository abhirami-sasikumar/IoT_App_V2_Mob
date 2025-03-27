import React from "react";
import { View } from "react-native";
import Logo from "../Components/Logo/Logo";
import ForgotAndReset from "./ForgotAndReset/ForgotAndReset";
import LoginField from "./Loginfield/Loginfield";
import styles from "./Login.style"; // Import styles
import Register from "./Register/Registration";
import { Icfosslogo } from "../Components/Icfosslogo/icfosslogo";

const Login = () => {
  return (
    <View style={styles.container}>
      <Logo /> 
      <LoginField />
      <ForgotAndReset /> 
      <Register />
      <Icfosslogo/>
    </View>


  );
};

export default Login;
