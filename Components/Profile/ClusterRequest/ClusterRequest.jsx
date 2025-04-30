import React, { useState, useEffect } from "react";
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
import { styles } from "./ClusterRequest.style";
import SafeScreen from "../../SafeArea/SafeArea";

const ClusterRequest = ({ navigation }) => {
  const [clusterCode, setClusterCode] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleRequest = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("@user");
      const userData = JSON.parse(userDataString);

      const token = userData?.jwtToken;
      const userEmail = userData?.email;
      const userName = userData?.name;

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
      setClusterCode("");
    } catch (error) {
      console.error("Cluster request error:", error.response?.data);
      alert(
        error.response?.data?.message ||
          "Failed to send cluster request. Please try again."
      );
    }
  };

  return (
    
    <View style={styles.flexContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="height"
          keyboardVerticalOffset={0}
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
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* Footer only visible when keyboard is not shown */}
      {!isKeyboardVisible && (
        <View style={styles.footerWrapper}>
          <Footer />
        </View>
      )}
    </View>
    
  );
};

export default ClusterRequest;
