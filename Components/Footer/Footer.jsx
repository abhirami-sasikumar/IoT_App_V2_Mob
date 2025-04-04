import React from "react";
import { View, Text, Image,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Footer.style";
import HomeIcon from "../../assets/Homeblack.png";
import UserIcon from "../../assets/Userblack.png";

export const Footer = () => {
  const navigation = useNavigation(); // Get navigation instance
  return (
    <View style={styles.footer}>
    {/* Home Icon */}
    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Home")}>
      <Image source={HomeIcon} style={styles.home_image} />
      <Text style={styles.text}>Home</Text>
    </TouchableOpacity>

    {/* Profile Icon */}
    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Profile")}>
      <Image source={UserIcon} style={styles.user_image} />
      <Text style={styles.text}>Profile</Text>
    </TouchableOpacity>
  </View>
  );
};

export default Footer;
