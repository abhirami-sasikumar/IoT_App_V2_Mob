import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { scale } from "react-native-size-matters";
import { styles } from "./ProfilePage.style";

import Footer from "../../Footer/Footer";
import UserIcon from "../../../assets/usericon.png";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";

import Loading from "../../Loading/Loading"; // Add this import

const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("@user");
        if (userData) {
          const parsed = JSON.parse(userData);
          setUser({
            name: parsed.name || "",
            email: parsed.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loading after data fetched
      }
    };

    fetchUser();
  }, []);

  // Show loading spinner until data is ready
  if (loading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.Profile}>PROFILE</Text>
        </View>

        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <Image source={UserIcon} style={styles.avatar} />
        </View>

        {/* Username */}
        <View style={styles.UserName}>
          <Text style={styles.Username}>{user.name}</Text>
        </View>

        {/* Email */}
        <View style={styles.Card}>
          <Ionicons name="mail" size={scale(20)} color="#c0c0c0" />
          <Text style={styles.CardText}>{user.email}</Text>
        </View>

        {/* Menu Buttons */}
        <View style={styles.menuWrapper}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate("ClusterRequest")}
          >
            <MaterialIcons name="send" size={scale(15)} color="#c0c0c0" />
            <Text style={styles.menuText}>Cluster Request</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Ionicons name="lock-closed" size={scale(15)} color="#c0c0c0" />
            <Text style={styles.menuText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate("Logout")}
          >
            <Ionicons name="power" size={scale(15)} color="#c0c0c0" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Deletebutton}
            onPress={() => navigation.navigate("DeleteAccount")}
          >
            <MaterialIcons name="delete" size={scale(15)} color="#c0c0c0" />
            <Text style={styles.Delete}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer />
    </KeyboardAvoidingView>
  );
};

export default ProfilePage;
