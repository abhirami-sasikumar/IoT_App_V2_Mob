import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { styles } from "./Otp.style";
import { Icfosslogo } from "../../../Components/Icfosslogo/Icfosslogo";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation, useRoute } from "@react-navigation/native";
import Logo from "../../../Components/Logo/Logo";
// Adjust if needed

const ResetOtp = () => {
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
    lockOrientation();

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const route = useRoute();
  const nav = useNavigation();

  const email = route?.params?.email || "";

  const handleResetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match.");
      return;
    }

    try {
      const response = await User.resetPasswordSubmitOtp(email, otp, newPassword);
      Alert.alert("Success", response.message);
      nav.replace("Login"); // Replace to prevent going back to OTP screen
    } catch (error) {
      setOtp("");
      Alert.alert("Error", error.response?.data?.message || "Error updating password");
    }
  };

  return (
    <>
      <View>
        <Logo />
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Reset Your Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Icfosslogo />
        </View>
      </View>
    </>
  );
};

export default ResetOtp;