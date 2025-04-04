import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Footer from "../Footer/Footer";

const DeleteAccount = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Are you sure you want to delete your account?</Text>

      <TouchableOpacity style={styles.buttonDelete} onPress={() => alert("Account Deleted!")}>
        <Text style={styles.buttonText}>Yes, Delete</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>

      <Footer />
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
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
    backgroundColor: "red",
    paddingVertical: 15,
    width: "85%",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonCancel: {
    backgroundColor: "#000080",
    paddingVertical: 15,
    width: "85%",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});