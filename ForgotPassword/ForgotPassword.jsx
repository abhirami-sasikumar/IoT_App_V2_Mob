import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { styles } from "./ForgotPassword.style";
import { useNavigation } from "@react-navigation/native";
import { Icfosslogo } from "../Components/Icfosslogo/Icfosslogo";
import * as ScreenOrientation from "expo-screen-orientation";
import Logo from "../Components/Logo/Logo";
import API from "../Api"; // ✅ Correct pa
import SafeScreen from "../Components/SafeArea/SafeArea";


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
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async () => {
    setButtonDisabled(true);
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      setButtonDisabled(false);
      return;
    }

    try {
      const res = await API.post("/forgetpassword", { email });
      if (res.data.message === "OTP sent to email") {
        Alert.alert("Success", "OTP sent to your email");
        nav.navigate("resetotp", { email });
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong.");
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <>
    <SafeScreen>
      <View>
        <Logo />
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Forgot Password?</Text>
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
          disabled={buttonDisabled}
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Icfosslogo />
        </View>
      </View>
      </SafeScreen>
    </>
  );
};

export default ForgotPassword;
