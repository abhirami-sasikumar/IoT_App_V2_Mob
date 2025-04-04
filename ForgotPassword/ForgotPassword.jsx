import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { styles } from "./ForgotPassword.style";
import { Icfosslogo } from "../Components/Icfosslogo/Icfosslogo";
import * as ScreenOrientation from "expo-screen-orientation";
import {Logo} from "../Components/logo/logo";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
    lockOrientation();

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  const handleSubmit = () => {
    setButtonDisable(true);

    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      setButtonDisable(false);
      return;
    }

    // Simulated response
    setTimeout(() => {
      Alert.alert("Success", "Password reset link has been sent to your email.");
      setButtonDisable(false);
    }, 1500);
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
