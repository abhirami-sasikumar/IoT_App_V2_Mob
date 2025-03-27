import React from "react";
import { Text, Image, View } from "react-native";
import Arrow from "../../../assets/arrowIcon.png";
import styles from "./LongCard.style";

export const LongCard = ({ parameterName }) => {
  return (
    <View style={styles.card}>
      {parameterName ? <Text style={styles.cardText}>{parameterName}</Text> : null}
      <Image source={Arrow} style={styles.arrow} />
    </View>
  );
};
