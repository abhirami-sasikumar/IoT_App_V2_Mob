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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Footer from "../../Footer/Footer";
import API from "../../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./ChangePassword.style";
import SafeScreen from "../../SafeArea/SafeArea";

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  const getUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("@user");
      if (!userDataString) {
        Alert.alert("Error", "User not logged in. Please log in again.");
        return null;
      }
      const userData = JSON.parse(userDataString);
      console.log("Read from AsyncStorage in ChangePassword:", userData);
      if (!userData?.email || !userData?.userId) {
        Alert.alert("Error", "User info is incomplete. Please log in again.");
        return null;
      }
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
      return null;
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password must match.");
      return;
    }
    // Password validation
    if (newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }
    const hasLetter = /[A-Za-z]/.test(newPassword);
    const hasDigit = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    if (
      !(hasLetter && (hasDigit || hasSpecialChar)) ||
      /^[A-Za-z]+$/.test(newPassword) ||
      /^\d+$/.test(newPassword)
    ) {
      Alert.alert(
        "Error",
        "Password must contain a mix of letters and digits or special characters."
      );
      return;
    }

    try {
      const userData = await getUserData();
      if (!userData) return;
      const { userId } = userData;
      const response = await API.post(`/change_password/${userId}`, {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (response.status === 200) {
        await AsyncStorage.clear();


        Alert.alert(
          "Success",
          "Password changed successfully! Please log in with your new password.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              },
            },
          ]
        );
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
          <Text style={styles.header}>Change Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry={!showCurrent}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowCurrent(!showCurrent)}>
              <Ionicons name={showCurrent ? "eye" : "eye-off"} size={22} color="#999" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowNew(!showNew)}>
              <Ionicons name={showNew ? "eye" : "eye-off"} size={22} color="#999" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons name={showConfirm ? "eye" : "eye-off"} size={22} color="#999" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
      {!isKeyboardVisible && <Footer />}
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;