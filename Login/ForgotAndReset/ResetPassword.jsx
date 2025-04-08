import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import API from "../../Api";
import { useNavigation } from "@react-navigation/native"; // ✅ Import navigation hook

const ResetPassword = ({ route }) => {
  const { email } = route.params;
  const navigation = useNavigation(); // ✅ Initialize navigation

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }

    try {
      const res = await API.post("/resetpassword", {
        email,
        otp,
        newPassword,
      });

      Alert.alert("Success", "Password reset successfully", [
        { 
          text: "OK",
          onPress: () => navigation.navigate("Login"), // ✅ Navigate to Login
        },
      ]);
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Reset Password</Text>

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

        <TouchableOpacity style={styles.button} onPress={resetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;

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
    backgroundColor: "#beb9be",
    paddingVertical: 18,
    paddingHorizontal: 30,
    width: "85%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    minHeight: 55,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
