import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./Footer.style";
import HomeIcon from "./assets/HomeH.png";
import HomeIconActive from "./assets/Home.png";
import UserIcon from "./assets/UserH.png";
import UserIconActive from "./assets/User.png";
import GoBack from "../../assets/backArrow.png";

export const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.footer}>
      {/* Back Arrow - Always visible */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.circleWrapper}>
          <Image
            source={GoBack}
            style={[
              styles.backArrow,
              { tintColor: route.name === "Clusters" ? "#810541" : "white" },
            ]}
          />
        </View>
      </TouchableOpacity>

      {/* Home Icon */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.replace("Clusters")}
      >
        <View style={styles.circleWrapper}>
          <Image source={HomeIconActive} style={styles.home_image} />
        </View>
      </TouchableOpacity>

      {/* Profile Icon */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.replace("profile")}
      >
        <View style={styles.circleWrapper}>
          <Image source={UserIconActive} style={styles.user_image} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
