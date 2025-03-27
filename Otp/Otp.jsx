import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import API from "../Api"; // Ensure correct API import
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Otpfield } from "./Components/Otpfield";
import { styles } from "./Otp.style";

export const Otp = ({ route }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const email = route?.params?.email; // Get email from navigation params

  const submitOtp = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/validate_otp", { email, otp });
      Alert.alert("Success", response.data.message);

      // Navigate to login screen after OTP verification
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      Alert.alert("OTP Verification Failed", error.response?.data?.message || "Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Otpfield otp={otp} setOtp={setOtp} />
      <TouchableOpacity style={styles.button} onPress={submitOtp}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};
