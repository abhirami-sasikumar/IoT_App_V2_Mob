import React from "react";
import { View, Text, Image,TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";import styles from "./Footer.style";
import HomeIcon from "../../assets/Homeblack.png";
import HomeIconActive from "../../assets/Homeblacklignt.png";

import UserIcon from "../../assets/Userblack.png";
import UserIconActive from "../../assets/userblacklight.png";


export const Footer = () => {
  const navigation = useNavigation(); // Get navigation instance
  const route = useRoute();
  const isActive = (screenName) => route.name === screenName;
  return (
    <View style={styles.footer}>
    {/* Home Icon */}
    <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.replace("ClusterName")}
      >
        <Image
          source={isActive("ClusterName") ? HomeIcon : HomeIconActive}
          style={[styles.home_image]}
        />
        <Text style={[styles.text]}>Home</Text>
      </TouchableOpacity>

    {/* Profile Icon */}
    <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.replace("Profile")}      >
        <Image
          source={isActive("Profile") ? UserIcon : UserIconActive}
          style={[styles.user_image]}
        />
        <Text style={[styles.text]}>Profile</Text>
      </TouchableOpacity>
  </View>
  );
};

export default Footer;

