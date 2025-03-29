import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Footer from "../Footer/Footer"; // Import Footer Component

const ProfilePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Your Profile</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ChangePassword")}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ClusterRequest")}>
          <Text style={styles.buttonText}>Cluster Request</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("DeleteAccount")}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Logout")}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Component */}
      <Footer />
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Pushes content up and footer to the bottom
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ensures buttons stretch properly
  },
  header: {
    fontSize: 26,  
    fontWeight: "bold",
    marginBottom: 30,
    color: "#000080", 
  },
  button: {
    backgroundColor: "#000080", 
    paddingVertical: 18,  
    borderRadius: 10, 
    width: "85%", // Ensures all buttons have the same width
    alignItems: "center",
    marginVertical: 12, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  buttonText: {
    color: "#fff",
    fontSize: 18, 
    fontWeight: "bold",
    textAlign: "center",
    width: "100%", // Ensures text aligns properly inside buttons
  },
});
