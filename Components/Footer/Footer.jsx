import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./Footer.style";
import HomeIcon from "../../assets/HomeH.png";
import UserIcon from "../../assets/User.png";

export const Footer = () => {
  return (
    <View style={styles.footer}>
      {/* Home Icon */}
      <View style={styles.iconContainer}>
        <Image source={HomeIcon} style={styles.home_image} />
        <Text style={styles.text}>Home</Text>
      </View>

      {/* User Icon */}
      <View style={styles.iconContainer}>
        <Image source={UserIcon} style={styles.user_image} />
        <Text style={styles.text}>Profile</Text>
      </View>
    </View>
  );
};

export default Footer;
