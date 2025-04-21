import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  Keyboard
} from "react-native";
import Footer from "../../Footer/Footer";
import API from "../../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./ChangePassword.style";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); // 👈 Track keyboard state

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password must match.");
      return;
    }

    try {
      const userDataString = await AsyncStorage.getItem("@user");
      const userData = JSON.parse(userDataString);

      const email = userData?.email;
      const userId = userData?.userId;

      if (!email || !userId) {
        Alert.alert("Error", "User info not found.");
        return;
      }

      const response = await API.post(`/change_password/${userId}`, {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (response.status === 200) {
        Alert.alert("Success", "Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        Alert.alert("Error", response.data?.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Change password error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Change Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </ScrollView>

      {!isKeyboardVisible && <Footer />} {/* ✅ Only show Footer when keyboard is hidden */}
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
