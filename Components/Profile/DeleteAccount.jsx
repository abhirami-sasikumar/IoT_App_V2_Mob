import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Footer from "../Footer/Footer";

const DeleteAccount = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.header}>Are you sure you want to delete your account?</Text>

        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => alert("Account Deleted!")}
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

      {/* 📌 Footer fixed at bottom */}
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
    color: "#000080",
  },
  buttonDelete: {
    backgroundColor: "#000000", // black
    paddingVertical: 15,
    width: "85%",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonCancel: {
    backgroundColor: "#beb9be", // grey
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
});
