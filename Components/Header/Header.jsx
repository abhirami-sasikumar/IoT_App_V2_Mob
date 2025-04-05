import React from "react";
import { Text, View, Image,TouchableOpacity } from "react-native";
import { styles } from "./Header.style";
import backArrow from "../../assets/BackArrow.png";
import { useNavigation } from "@react-navigation/native";
export const Header = ({ title }) => {

  const nav = useNavigation();

  return (
   <View style={styles.header}>
      <TouchableOpacity onPress={() => nav.goBack()}>
        <Image source={backArrow} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
