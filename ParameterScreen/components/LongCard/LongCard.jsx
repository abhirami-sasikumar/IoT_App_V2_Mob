import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Arrow from "../../../assets/arrowIcon.png";
import styles from "./LongCard.style";

export const LongCard = ({ parameterName, clusterId, measurementId }) => {
  const navigation = useNavigation(); // Get navigation object

  const handlePress = () => {
    navigation.navigate("Location", {
      clusterId,
      parameterName,
      measurementId,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>{parameterName}</Text>
        <Image source={Arrow} style={styles.arrow} />
      </View>
    </TouchableOpacity>
  );
};
