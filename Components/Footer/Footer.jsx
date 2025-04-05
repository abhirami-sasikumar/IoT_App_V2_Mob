import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./Footer.style";
import HomeIcon from "./assets/HomeH.png";
import HomeIconActive from "./assets/Home.png";
import UserIcon from "./assets/UserH.png";
import UserIconActive from "./assets/User.png";

export const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (screenName) => route.name === screenName;

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.replace("clusters")}
      >
        <Image
          source={isActive("clusters") ? HomeIcon : HomeIconActive}
          style={[styles.home_image]}
        />
        <Text style={[styles.text]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.replace("profile")}
      >
        <Image
          source={isActive("profile") ? UserIcon : UserIconActive}
          style={[styles.user_image]}
        />
        <Text style={[styles.text]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
