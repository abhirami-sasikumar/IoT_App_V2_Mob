import React from "react";
import { View } from "react-native";
import SignupField from "./Components/SignupFields/SignupFields";
import Logo from "../Components/Logo/Logo";
import { Icfosslogo } from "../Components/Icfosslogo/icfosslogo";
import styles from "./Signup.style";
import Registration from "./Components/Registered/Registered";

const SignUp = () => {
  return ( 
  <View style={styles.container}>
  
      <>
        <Logo />
        <SignupField  />
        <Registration />
        <Icfosslogo />
      </>
    
  </View>
  )
}

export default SignUp;
