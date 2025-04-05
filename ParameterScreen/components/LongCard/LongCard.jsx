import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Arrow from "../../../assets/arrowIcon.png";
import styles from "./LongCard.style";

const LongCard = ({ parameterName, clusterId, measurementId }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Location", {
      clusterId,
      parameterName,
      measurementId,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
        <Text style={styles.cardText}>{parameterName}</Text>
        <Image source={Arrow} style={styles.arrow} />
    </TouchableOpacity>
  );
};

export default LongCard;
