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
import { useNavigation } from "@react-navigation/native";
import API from "../../Api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const sendOtp = async () => {
    try {
      const res = await API.post("/forgetpassword", { email });
      if (res.data.message === "OTP sent to email") {
        Alert.alert("Success", "OTP sent to your email");
        navigation.navigate("ResetPassword", { email });
      }
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Forgot Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={sendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;

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
