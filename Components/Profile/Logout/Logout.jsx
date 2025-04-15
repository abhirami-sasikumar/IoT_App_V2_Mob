import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import API from "../../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Logout.style"

const Logout = ({ navigation }) => {
  useEffect(() => {
    const performLogout = async () => {
      try {
        // Call the logout endpoint
        const response = await API.post("/logout");
        
        // Clear AsyncStorage on successful logout
        await AsyncStorage.clear();
        
        Alert.alert("Success", response.data.message, [
          {
            text: "OK",
            onPress: () => {
              // Reset navigation stack and navigate to Login screen
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            },
          },
        ]);
      } catch (error) {
        console.error("Logout error:", error);
        Alert.alert(
          "Error",
          error.response?.data?.message || "Error logging out.",
          [
            {
              text: "Go to Login",
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              },
            },
          ]
        );
      }
    };

    performLogout();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Logging Out...</Text>
      {/* Fallback button removed so it doesn't show */}
    </View>
  );
};

export default Logout;


 

