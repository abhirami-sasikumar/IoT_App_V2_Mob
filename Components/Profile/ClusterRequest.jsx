import React, { useState } from "react";
import API from "../../Api"; // Make sure your API instance is set up correctly
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Footer from "../Footer/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClusterRequest = ({ navigation }) => {
  const [clusterCode, setClusterCode] = useState("");

  const handleRequest = async () => {
    const token = await AsyncStorage.getItem("token");
    const userEmail = await AsyncStorage.getItem("email");
    const userName = await AsyncStorage.getItem("name");
    console.log("Cluster Code:", clusterCode);
    console.log("Email:", userEmail);
    console.log("Name:", userName);
    console.log("Token:", token);

  
    // Check if any field is missing
    if (!clusterCode || !userEmail || !userName) {
      alert("All fields are required.");
      return;
    }
  
    try {
      const response = await API.post(
        "/request_cluster",
        {
          email: userEmail,
          name: userName,
          clusterCode: clusterCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert(response.data.message);
      setClusterCode(""); // Reset input
    } catch (error) {
      console.error("Cluster request error:", error.response?.data);
      alert(
        error.response?.data?.message ||
          "Failed to send cluster request. Please try again."
      );
    }
  };
  
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.header}>Cluster Request</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Cluster Code..."
          value={clusterCode}
          onChangeText={setClusterCode}
        />

        <TouchableOpacity style={styles.button} onPress={handleRequest}>
          <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>
      </View>

      {/* 📌 Stick Footer to the Bottom */}
      <Footer />
    </KeyboardAvoidingView>
  );
};

export default ClusterRequest;

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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
  },
  input: {
    width: "85%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#beb9be",
    paddingVertical: 15,
    width: "85%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    minHeight: 50,
  },
  buttonText: {
    color: "#fff",
  fontSize: 20, 
  fontWeight: "bold",
  lineHeight: 22, 
  },
});
