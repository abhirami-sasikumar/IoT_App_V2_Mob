import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import API from "../../../Api"; // Import API
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import styles from "./SignupFields.style"; // Import styles

const SignupField = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clusterID, setClusterID] = useState(""); // Added Cluster ID input
  const navigation = useNavigation(); // Initialize navigation hook

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword || !clusterID) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      const response = await API.post("/signup", { name, email, password, clustersCode: clusterID });
      Alert.alert("Success", "Signup successful! Check your email for OTP.");
      
      // Navigate to OTP screen, passing email as a parameter
      navigation.navigate("Otp", { email });
    } catch (error) {
      Alert.alert("Signup Failed", error.response?.data?.message || "Please try again.");
    }
  };
  
  return (
    <>
      <View style={styles.view}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Cluster ID"
          value={clusterID}
          onChangeText={setClusterID}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.button_view}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>SIGNUP</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignupField;
