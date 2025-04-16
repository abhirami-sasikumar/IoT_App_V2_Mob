import React, { useState } from "react";
import API from "../../../Api";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Footer from "../../Footer/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./ClusterRequest.style"; // Make sure you're using named export

const ClusterRequest = ({ navigation }) => {
  const [clusterCode, setClusterCode] = useState("");

  const handleRequest = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("@user");
      const userData = JSON.parse(userDataString);
  
      const token = userData?.jwtToken;
      const userEmail = userData?.email;
      const userName = userData?.name;
  
      console.log("Cluster Code:", clusterCode);
      console.log("Email:", userEmail);
      console.log("Name:", userName);
      console.log("Token:", token);
  
      if (!clusterCode || !userEmail || !userName) {
        alert("All fields are required.");
        return;
      }
  
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={20}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
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
        </ScrollView>

        <Footer />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ClusterRequest;