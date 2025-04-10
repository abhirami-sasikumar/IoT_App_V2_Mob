import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { styles } from "./ForgotPassword.style";
import { useNavigation } from "@react-navigation/native";
import { Icfosslogo } from "../Components/Icfosslogo/Icfosslogo";
import * as ScreenOrientation from "expo-screen-orientation";
import Logo from "../Components/Logo/Logo";
// Make sure to import your User service/API


const ForgotPassword = () => {
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
    lockOrientation();

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  const nav = useNavigation();
  const [email, setEmail] = useState("");
  const [buttonDisable, setButtonDisabel] = useState(false);

  const handleSubmit = async () => {
    setButtonDisabel(true);
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      setButtonDisabel(false);
      return;
    }

    try {
      const response = await User.resetPasswordOtp(email);
      Alert.alert(response.message);
      nav.navigate("resetOtp", {  }); 
    } catch (error) {
      setButtonDisabel(false);
      Alert.alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <View>
        <Logo />
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Forgot Password ?</Text>
        <Text style={styles.label}>Enter your email address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={buttonDisable}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Icfosslogo />
        </View>
      </View>
    </>
  );
};

export default ForgotPassword;