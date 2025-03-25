import React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./Header.style";
import backArrow from "../../assets/BackArrow.png";

export const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      {/* Back Arrow (Without Navigation) */}
      <Image source={backArrow} style={styles.image} />
      
      {/* Title */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
