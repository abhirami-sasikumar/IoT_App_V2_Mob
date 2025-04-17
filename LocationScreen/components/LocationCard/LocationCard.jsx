import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./LocationCard.style";
import chartIcon from "../../../assets/chart.png";

const LocationCard = ({ LocationName, Value, Measurement, isChart, hideDevice, clusterId, parameterName }) => {
  const navigation = useNavigation();

  const handleChartPress = () => {
    if (isChart) {
      navigation.navigate("Chart", {
        clusterId,
        parameterName,
        locationName: LocationName,
      });
    }
  };

  const displayValue = hideDevice ? "Maintenance" : Value;

  return (
    <View style={styles.card}>
      <Text style={styles.headText}>{LocationName}</Text>
      <View style={styles.line} />

      <View style={styles.bottomRow}>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{displayValue}</Text>
          {!hideDevice && <Text style={styles.measurementText}>{Measurement}</Text>}
        </View>

        {isChart && !hideDevice && (
          <TouchableOpacity onPress={handleChartPress}>
            <View style={styles.chartIconContainer}>
              <Image source={chartIcon} style={[styles.chartIcon, { tintColor: 'white' }]} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LocationCard;
