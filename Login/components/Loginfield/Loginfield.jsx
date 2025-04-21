import React, { useState, useContext } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert,KeyboardAvoidingView,ScrollView,TouchableNativeFeedback,plat } from "react-native";
import styles from "./Loginfield.style";
import API from "../../../Api";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";
import { UserContext } from "../../../Components/Context/Context";
import ForgotAndReset from "../ForgotAndReset/ForgotAndReset";

const LoginField = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const { setUser } = useContext(UserContext);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and Password are required!");
      return;
    }
  
    try {
      const response = await API.post("/login", {
        email,
        password,
      });
  
      const { jwtToken, userId, name } = response.data;
  
      const userData = { jwtToken, userId, name, email };
  
      // Save all user data as one object
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
  
      // Update Context
      setUser(userData);
  
      Alert.alert("Success", `Welcome ${name}!`);
  
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Clusters" }],
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
            <Icon name={showPassword ? "eye" : "eye-off"} size={24} color="grey" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.button_view}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        
      </View>
    </>
  );
};

export default LoginField;