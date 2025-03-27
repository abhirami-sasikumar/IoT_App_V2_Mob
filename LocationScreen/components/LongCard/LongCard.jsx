import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./LongCard.style";

export const LongCard = ({ locationName, value }) => {
  return (
    <TouchableOpacity>
      <View style={styles.card}>
        {locationName ? <Text style={styles.cardText}>{locationName}</Text> : null}
        {value ? <Text style={styles.valueText}>{value}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};
