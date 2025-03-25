import React from "react";
import { Text, Image, View } from "react-native";
import Arrow from "../../../assets/arrowIcon.png"
import styles from "./LongCard.style";

export const LongCard = ({ clusterName }) => {
  return (
    <View style={styles.card}>
      {clusterName ? <Text style={styles.cardText}>{clusterName}</Text> : null}
      <Image source={Arrow} style={styles.arrow} />
    </View>
  );
};
export default LongCard