import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView
} from "react-native";
import Footer from "../Footer/Footer"; // ✅ Import Footer
import API from "../../Api"; // Make sure your API instance is set up correctly
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ Add this import

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
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
      const email = await AsyncStorage.getItem("email");
  
      if (!email) {
        Alert.alert("Error", "User email not found.");
        return;
      }
  
      const userId = await AsyncStorage.getItem("userId");

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

      {/* ✅ Footer at bottom */}
      <Footer />
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
  },
  input: {
    width: "85%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#beb9be", // ✅ updated color
    paddingVertical: 18,         // ✅ slightly increased
    paddingHorizontal: 30,
    width: "85%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    minHeight: 55,               // ✅ more button height
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
