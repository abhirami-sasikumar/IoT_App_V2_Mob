import React from "react";
import { View } from "react-native";
import Logo from "../Components/logo/logo";
import ForgotAndReset from "./ForgotAndReset/ForgotAndReset";
import LoginField from "./Loginfield/Loginfield";
import styles from "./Login.style"; // Import styles
import Register from "./Register/Registration";
import { Icfosslogo } from "../Components/Icfosslogo/icfosslogo";

const Login = () => {
  return (
    <View style={styles.container}>
      <Logo /> */
      <LoginField /> 
      <Register />


      <ForgotAndReset />
      <Icfosslogo/>



    </View>


  );
};

export default Login;
