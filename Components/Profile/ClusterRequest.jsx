import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Footer from "../Footer/Footer";

const ClusterRequest = ({ navigation }) => {
  const [requestDetails, setRequestDetails] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cluster Request</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Enter request details..."
        multiline
        value={requestDetails}
        onChangeText={setRequestDetails}
      />

      <TouchableOpacity style={styles.button} onPress={() => alert("Cluster Request Sent!")}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>

      <Footer />
    </View>
  );
};

export default ClusterRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000080",
  },
  input: {
    width: "85%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#fff",
    minHeight: 100,
    textAlignVertical: "top",
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