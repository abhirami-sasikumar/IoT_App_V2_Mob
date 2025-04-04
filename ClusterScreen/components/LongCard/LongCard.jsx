import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Arrow from "../../../assets/arrowIcon.png";
import styles from "./LongCard.style";

export const LongCard = ({ clusterName, clusterId }) => {
  const navigation = useNavigation();

  console.log("LongCard - clusterId:", clusterId); // Debugging

  const handlePress = () => {
    navigation.navigate("Parameters", { clusterId });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View>
        <Text style={styles.cardText}>{clusterName}</Text>
        <Image source={Arrow} style={styles.arrow} />
      </View>
    </TouchableOpacity>
  );
};


export default LongCard;
