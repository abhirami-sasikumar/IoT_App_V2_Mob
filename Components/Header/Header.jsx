import React from "react";
import { Text, View, Image,TouchableOpacity } from "react-native";
import { styles } from "./Header.style";
import backArrow from "../../assets/BackArrow.png";

export const Header = ({ title,onBackPress }) => {
  return (
    <View style={styles.header}>
      {/* Back Arrow (Without Navigation) */}
      <TouchableOpacity onPress={onBackPress}>
        <Image source={backArrow} style={styles.image} />
      </TouchableOpacity>      
      {/* Title */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
