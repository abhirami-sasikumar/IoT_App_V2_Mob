import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  keyboardVisible,
  TouchableWithoutFeedback
  
} from "react-native";
import { styles } from "./ForgotPassword.style";
import { useNavigation } from "@react-navigation/native";
import { Icfosslogo } from "../Components/Icfosslogo/Icfosslogo";
import * as ScreenOrientation from "expo-screen-orientation";
import Logo from "../Components/Logo/Logo";
import API from "../Api";

const ForgotPassword = () => {
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
    lockOrientation();
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  const nav = useNavigation();
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

useEffect(() => {
  const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardVisible(true);
  });
  const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardVisible(false);
  });

  return () => {
    showSubscription.remove();
    hideSubscription.remove();
  };
}, []);

  const handleSubmit = async () => {
    setButtonDisabled(true);
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      setButtonDisabled(false);
      return;
    }

    try {
      const res = await API.post("/forgetpassword", { email });
      if (res.data.message === "OTP sent to email") {
        Alert.alert("Success", "OTP sent to your email");
        nav.navigate("resetotp", { email });
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong.");
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 ,backgroundColor:"#fff"}}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Logo style={{backgroundColor:"#fff"}}/>
            <View style={styles.container}>
              <Text style={styles.heading}>Forgot Password?</Text>
              <Text style={styles.label}>Enter your email address:</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={buttonDisabled}
              >
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          
        </View>
        
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    {!keyboardVisible && (
  <View style={styles.icfosslogo}>
    <Icfosslogo />
  </View>
)}

   </> 
  );
};

export default ForgotPassword;
