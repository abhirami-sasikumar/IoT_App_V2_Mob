import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import styles from "./Loginfield.style";
import API from "../../Api"; 
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";  

const LoginField = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {  
    if (!email || !password) {  
      Alert.alert("Error", "Email and Password are required!");  
      return;  
    }  
  
    try {  
      console.log("Sending login request with:", { email, password });
  
      const response = await API.post("/login", {  
        email,  
        password,  
      });
  
      console.log("Login Successful! Response:", response.data);  
  
      // Extract Data from Response
      const { jwtToken, userId, name } = response.data;  
  
      // 🔹 Store Token & User ID properly  
      await AsyncStorage.setItem("token", jwtToken);  
      await AsyncStorage.setItem("userId", userId);
      await AsyncStorage.setItem("email", email);   
  
      console.log("Stored Token:", jwtToken);  
      console.log("Stored User ID:", userId);  
  
      Alert.alert("Success", `Welcome ${name}!\nEmail: ${email}`);

  
      // 🔹 Navigate to ClusterName screen with token & userId  
      navigation.dispatch(  
        CommonActions.reset({  
          index: 0,  
          routes: [{  
            name: "ClusterName",  
            params: { userId, jwtToken },  
          }],  
        })  
      );  
    } catch (error) {  
      console.error("Login Error:", error.message || error);  
      Alert.alert("Login Failed", error.response?.data?.message || "Please try again.");  
    }  
  };

  return (
    <>
      <View style={styles.view}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.button_view}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginField;
