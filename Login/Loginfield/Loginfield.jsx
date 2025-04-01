import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import styles from "./Loginfield.style";
import API from "../../Api"; // Ensure this is correctly pointing to your API handler
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";  

const LoginField = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [clusterID, setClusterID] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {  
    if (!email || !password || !clusterID) {  
      Alert.alert("Error", "All fields are required!");  
      return;  
    }  
  
    try {  
      console.log("Sending login request with:", { email, password, clustersCode: clusterID });
  
      const response = await API.post("/login", {  
        email,  
        password,  
        clustersCode: clusterID,  
      });
  
      console.log("Login Successful! Response:", response.data);  
  
      // Extract Data from Response
      const { jwtToken, userId, name } = response.data;  
  
      // 🔹 Store Token & User ID properly  
      await AsyncStorage.setItem("token", jwtToken);  
      await AsyncStorage.setItem("userId", userId);  
  
      // Verify if stored correctly  
      const storedToken = await AsyncStorage.getItem("token");  
      const storedUserId = await AsyncStorage.getItem("userId");  
  
      console.log("Stored Token:", storedToken);  
      console.log("Stored User ID:", storedUserId);  
  
      Alert.alert("Success", `Welcome ${name}!`);  
  
      // 🔹 Navigate to ClusterName and pass token & userId  
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
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginField;
