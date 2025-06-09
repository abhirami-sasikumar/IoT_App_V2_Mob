import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./LocationCard.style";
import chartIcon from "../../../assets/chart.png";

const LocationCard = ({
  LocationName,
  Value,
  Measurement,
  isChart,
  hideDevice,
  clusterId,
  parameterName,
  time, // Use directly from props without formatting
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

  const displayValue = hideDevice ? "Under Maintenance" : Value;

  // Conditional styling based on hideDevice or isChart
  const centerAlignStyle = hideDevice || !isChart ? styles.centerContent : null;

  return (
    <View style={styles.card}>
      <Text
        style={styles.headText}
        numberOfLines={1}
        ellipsizeMode="tail"
        adjustsFontSizeToFit={true}
      >
        {LocationName}
      </Text>
      <View style={styles.line} />
      <View style={[styles.bottomRow, centerAlignStyle]}>
        <View style={styles.valueContainer}>
          <Text
            style={[
              styles.value,
              hideDevice && styles.maintenanceText
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
            ellipsizeMode="tail"
          >
            {`${displayValue}${!hideDevice && Measurement ? ` ${Measurement}` : ""}`}
          </Text>
        </View>


        {isChart && !hideDevice && (
          <View style={styles.chart}>
            <TouchableOpacity onPress={handleChartPress}>
              <View style={styles.chartIconContainer}>
                <Image
                  source={chartIcon}
                  style={[styles.chartIcon, { tintColor: "white" }]}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>


      {/* Time Display */}
      {/* Time Display */}
      {!hideDevice && time && (
        <View style={styles.timeContainer}>
          <Text style={styles.updatedText}>Last updated :</Text>
          <Text style={styles.timeText}>
            {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      )}

    </View>
  );
};

export default LocationCard;