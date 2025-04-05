import React, { useState } from "react";
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

const ClusterRequest = ({ navigation }) => {
  const [clusterCode, setClusterCode] = useState("");

  const handleRequest = () => {
    alert(`Cluster request sent for code: ${clusterCode}`);
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
