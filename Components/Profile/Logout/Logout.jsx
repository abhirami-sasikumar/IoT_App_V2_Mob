import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import API from "../../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Logout.style";
import SafeScreen from "../../SafeArea/SafeArea";

const Logout = ({ navigation }) => {
  const performLogout = async () => {
    try {
      // Step 1: Call the logout endpoint on the server
      await API.post("/logout");

      // Step 2: Clear local storage after successful API call
      await AsyncStorage.clear();

      // Step 3: Navigate to the login screen
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Logout error:", error);
      
      // If API call fails, still clear local storage and navigate to login
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Alert.alert(
        "Logout",
        "Are you sure you want to log out?",
        [
          {
            text: "No",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: performLogout,
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loading...</Text>
    </View>
  );
};

export default Logout;