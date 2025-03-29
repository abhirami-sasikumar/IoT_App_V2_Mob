import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Logout = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      alert("Session Expired!");
      navigation.navigate("Login"); 
    }, 3000); 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Session Expired</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#d9534f",
  },
  button: {
    backgroundColor: "#000080",
    paddingVertical: 15,
    width: "85%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
