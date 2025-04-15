import React from "react";
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

import { scale, verticalScale } from "react-native-size-matters";
import { styles } from "./ProfilePage.style";

import Footer from "../../Footer/Footer";
import UserIcon from "../../../assets/usericon.png";

import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";

const ProfilePage = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header section with curve */}
        <View style={styles.headerContainer}>
          <Text style={styles.Profile}>Profile</Text>
        </View>

        {/* Profile picture overlapping header */}
        <View style={styles.avatarWrapper}>
          <Image source={UserIcon} style={styles.avatar} />
        </View>
        <View style={styles.UserName}>
          <Text style={styles.Username}>Ameen</Text>
        </View>
        <View style={styles.Card}>
          <Ionicons name="mail" size={scale(20)} color="#c0c0c0" />
          <Text style={styles.CardText}>alameennizam1@gmail.com</Text>

        </View>

        {/* Menu buttons */}
        
          <View style={styles.menuWrapper}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate("ClusterRequest")}
            >
              <MaterialIcons name="send" size={scale(15)} color="#c0c0c0"/>
              <Text style={styles.menuText}>Cluster Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate("ChangePassword")}
            >
              <Ionicons name="lock-closed" size={scale(15)} color="#c0c0c0"/>

              <Text style={styles.menuText}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate("Logout")}
            >
              <Ionicons name="power" size={scale(15)} color="#c0c0c0"/>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Deletebutton}
              onPress={() => navigation.navigate("DeleteAccount")}
            >
              <MaterialIcons name="delete" size={scale(15)} color="#c0c0c0"/>
              <Text style={styles.Delete}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        
      </ScrollView>

      <Footer />
    </KeyboardAvoidingView>
  );
};

export default ProfilePage;
