import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./icfosslogo.style";
import logo from "./../../assets/ICFOSS_Logo.png";

export const Icfosslogo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textWithLine}>
        <View style={styles.line} />
        <Text style={styles.text}>Powered by</Text>
        <View style={styles.line} />
      </View>

      <Image source={logo} style={styles.image} />
    </View>
  );
};
