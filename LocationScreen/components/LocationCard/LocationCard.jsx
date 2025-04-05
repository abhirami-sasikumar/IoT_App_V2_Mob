import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./LocationCard.style";
import chartIcon from "../../../assets/chart.png";

const LocationCard = ({ LocationName, Value, Measurement, isChart, clusterId, parameterName }) => {
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

  return (
    <View style={styles.card}>
      <Text style={styles.headText}>{LocationName}</Text>
      <View style={styles.line} />

      <View style={styles.bottomRow}>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{Value}</Text>
          <Text style={styles.measurementText}>{Measurement}</Text>
        </View>

        {isChart && (
          <TouchableOpacity onPress={handleChartPress}>
            <View style={styles.chartIconContainer}>
              <Image source={chartIcon} style={[styles.chartIcon, { tintColor: 'lightblue' }]} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


// Prop validation
// LocationCard.propTypes = {
//   LocationName: PropTypes.string.isRequired,
//   Value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   Measurement: PropTypes.string.isRequired,
//   showChart: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]), // ✅ accepts function now
// };

export default LocationCard;
