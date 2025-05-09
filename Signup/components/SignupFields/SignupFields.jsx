import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import API from "../../../Api"; // Import API
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import styles from "./SignupFields.style"; // Import styles
import Icon from "react-native-vector-icons/Feather";
import { Linking } from "react-native";
import Checkbox from 'expo-checkbox';
// Install if not already


const SignupField = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clusterID, setClusterID] = useState(""); // Added Cluster ID input
  const navigation = useNavigation(); // Initialize navigation hook
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToPolicy, setAgreeToPolicy] = useState(false); // ✅ New checkbox state


  const handleSubmit = async () => {
    if (!agreeToPolicy) {
      Alert.alert("Error", "You must agree to the Terms and Privacy Policy to sign up.");
      return;
    }


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
      navigation.navigate("Otp", { email, clusterID });
    } catch (error) {
      Alert.alert("Signup Failed", error.response?.data?.message || "Please try again.");
    }
  };
  const openPrivacyPolicy = () => {
    Linking.openURL("https://devapp.v2.openiot.in/api/policy"); // Replace with actual URL
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
          placeholder="New Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            fontFamily="Roboto"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon name={showConfirmPassword ? "eye" : "eye-off"} size={24} color="grey" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Cluster ID"
          value={clusterID}
          onChangeText={setClusterID}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.privacyContainer}>
        <Checkbox
          value={agreeToPolicy}
          onValueChange={setAgreeToPolicy}
          color={agreeToPolicy ? "#007bff" : undefined}
        />

        <Text style={styles.privacyText}>
          I agree to the{" "}
          <Text style={styles.link} onPress={openPrivacyPolicy}>
            Terms and Privacy Policy
          </Text>
        </Text>
      </View>


      <View style={styles.button_view}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>

    </>
  );
};

export default SignupField;
