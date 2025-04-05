import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Arrow from "../../../assets/arrowIcon.png";
import styles from "./LongCard.style";

const LongCard = ({ clusterName, clusterId }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (clusterId) {
      navigation.navigate("Parameters", { clusterId });
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={styles.cardText}>{clusterName}</Text>
      <Image source={Arrow} style={styles.arrow} />
    </TouchableOpacity>
  );
};

export default LongCard;
