import React from "react";
import { Text, Image, View } from "react-native";
import Arrow from "../../assets/arrowIcon.png"
import {styles} from "./LongCard.style";

const LongCard = ({ ParameterName }) => {
  return (
    <View style={styles.card}>
      {ParameterName ? <Text style={styles.cardText}>{ParameterName}</Text> : null}
      <Image source={Arrow} style={styles.arrow} />
    </View>
  );
};
export default LongCard