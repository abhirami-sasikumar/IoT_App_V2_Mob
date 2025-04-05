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
import Footer from "../Footer/Footer";
import API from "../../Api"; // Make sure your API instance is set up correctly

const DeleteAccount = ({ navigation }) => {
  const handleDelete = async () => {
    try {
      const email = await AsyncStorage.getItem("email");

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
              await AsyncStorage.clear(); // Clear all data
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
      behavior={Platform.OS === "ios" ? "padding" : undefined}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000000",
  },
  buttonDelete: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    width: "85%",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonCancel: {
    backgroundColor: "#beb9be",
    paddingVertical: 15,
    width: "85%",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#d9645b",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText1: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
