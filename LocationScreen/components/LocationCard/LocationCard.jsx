import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./LocationCard.style";
import chartIcon from "../../../assets/chart.png";
import moment from "moment";  // Import moment for date formatting

const LocationCard = ({
  LocationName,
  Value,
  Measurement,
  isChart,
  hideDevice,
  clusterId,
  parameterName,
  time, // Include time here as prop
}) => {
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

  // Show only the time, e.g., "5:33 AM"
  const formattedTime = time ? moment(time).format("h:mm A") : "N/A";

  const displayValue = hideDevice ? "Under Maintenance" : Value;

  // Conditional styling based on hideDevice or isChart
  const centerAlignStyle = hideDevice || !isChart ? styles.centerContent : null;

  return (
    <View style={styles.card}>
      <Text style={styles.headText}  numberOfLines={1} ellipsizeMode="tail">{LocationName}</Text>
      <View style={styles.line} />

      <View style={[styles.bottomRow, centerAlignStyle]}>
        {/* Value & Measurement Column */}
        <View style={styles.valueContainer}>
          <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">{displayValue}</Text>
          {!hideDevice  && (
            <Text style={styles.measurementText} numberOfLines={1} ellipsizeMode="tail">{Measurement}</Text>
          )}
        </View>

        {/* Chart Icon Column */}
        {isChart && !hideDevice && (
          <View style={styles.chart}>
            <TouchableOpacity onPress={handleChartPress}>
              <View style={styles.chartIconContainer}>
                <Image source={chartIcon} style={[styles.chartIcon, { tintColor: 'white' }]} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Time Display */}
      {!hideDevice && time && (
        
        <View style={styles.timeContainer}>
          <Text style={styles.updatedText}>Last updated :</Text>

          <Text style={styles.timeText}>{formattedTime}</Text>
        </View>
        
      )}
    </View>
  );
};

export default LocationCard;
