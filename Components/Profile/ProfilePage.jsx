import React, { useState } from "react";
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
  Button,
  Alert,
  Image // ✅ Added Image import
} from "react-native";
import Footer from "../Footer/Footer"; // Import Footer Component
import UserIcon from "../../assets/Userblack.png"; // Ensure the path is correct

const ProfilePage = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password must match.");
      return;
    }
    Alert.alert("Success", "Password changed successfully!");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* ✅ Corrected Image Component */}
        <Image source={UserIcon} style={styles.user_image} />

        <TouchableOpacity
          style={[styles.button, styles.clusterRequestButton]}
          onPress={() => navigation.navigate("ClusterRequest")}
        >
          <Text style={styles.buttonText}>Cluster Request</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.changePasswordButton]}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={() => navigation.navigate("Logout")}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={[styles.button, styles.deleteAccountButton]}
  onPress={() => navigation.navigate("DeleteAccount")}
>
  <Text style={[styles.buttonText, styles.deleteAccountText]}>
    Delete Account
  </Text>
</TouchableOpacity>
      </ScrollView>

      {/* Footer Component */}
      <Footer />
    </KeyboardAvoidingView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#000080",
  },
  button: {
    width: 300, // Uniform width
    height: 60, // Uniform height
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    borderRadius: 12,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  changePasswordButton: {
    backgroundColor: "#beb9be",
  },
  clusterRequestButton: {
    backgroundColor: "#beb9be",
  },
  deleteAccountButton: {
    backgroundColor: "#000000",
  },
  logoutButton: {
    backgroundColor: "#beb9be",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  user_image: {
    width: 80, // ✅ Fixed width (adjust as needed)
    height: 80, // ✅ Fixed height (adjust as needed)
    resizeMode: "contain",
    marginBottom: 20,
  },
  deleteAccountText: {
    color: '#d9645b',
    // You can add fontWeight or other styles if needed
  },
  
});
