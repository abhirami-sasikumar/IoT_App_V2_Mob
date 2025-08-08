import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, Linking } from "react-native";
import API from "../../../Api"; // Import API
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import styles from "./SignupFields.style"; // Import styles
import Icon from "react-native-vector-icons/Feather";
import Checkbox from 'expo-checkbox';

const SignupField = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clusterID, setClusterID] = useState("");
  const navigation = useNavigation();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);

  const validatePassword = (pwd) => {
    const minLength = pwd.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasDigitOrSpecial = /[\d\W]/.test(pwd); // \W = non-word character (special chars)
    return minLength && hasLetter && hasDigitOrSpecial;
  };

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

    if (!validatePassword(password)) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters long and include both letters and numbers or special characters."
      );
      return;
    }

    try {
      const response = await API.post("/signup", {
        name,
        email,
        password,
        clustersCode: clusterID,
      });
      Alert.alert("Success", "Signup successful! Check your email for OTP.");
      navigation.navigate("Otp", { email, clusterID });
    } catch (error) {
      Alert.alert("Signup Failed", error.response?.data?.message || "Please try again.");
    }
  };

  const openPrivacyPolicy = () => {
    Linking.openURL("https://app.openiot.in/api/privacy-policy");
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
          placeholder="Cluster ID (Default ID :: OIOT) *"
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