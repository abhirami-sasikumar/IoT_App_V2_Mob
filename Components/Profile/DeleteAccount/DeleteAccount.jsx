import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import Footer from "../../Footer/Footer";
import API from "../../../Api"; // Make sure your API instance is set up correctly
import styles from "./DeleteAccount.style"

const DeleteAccount = ({ navigation }) => {
  const handleDelete = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user");
  
      if (!userData) {
        Alert.alert("Error", "User data not found.");
        return;
      }
  
      const { email } = JSON.parse(userData);
  
      if (!email) {
        Alert.alert("Error", "User email not found.");
        return;
      }
  
      const response = await API.delete("/delete", {
        data: { email },
      });
  
      if (response.status === 200) {
        Alert.alert("Deleted", "Your account has been deleted.", [
          {
            text: "OK",
            onPress: async () => {
              await AsyncStorage.clear();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                })
              );
            },
          },
        ]);
      } else {
        Alert.alert("Error", "Unable to delete account. Please try again.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      Alert.alert("Error", "Something went wrong during deletion.");
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.header}>
          Are you sure you want to delete your account?
        </Text>

        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Yes, Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText1}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </KeyboardAvoidingView>
  );
};

export default DeleteAccount;

