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
  time,
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

  // Function to split location name at comma
  const renderLocationName = (name) => {
    const parts = name.split(',');
    
    if (parts.length === 1) {
      // Single line - no comma
      return (
        <Text style={styles.singleLineText} numberOfLines={1}>
          {name}
        </Text>
      );
    } else {
      // Multiple parts - split at comma
      return (
        <View style={styles.multiLineContainer}>
          <Text style={styles.firstLine} numberOfLines={1}>
            {parts[0].trim()}
          </Text>
          <Text style={styles.secondLine} numberOfLines={1}>
            {parts.slice(1).join(',').trim()}
          </Text>
        </View>
      );
    }
  };

  const centerAlignStyle = hideDevice || !isChart ? styles.centerContent : null;

  return (
    <View style={styles.card}>
      {/* Render location name with comma splitting */}
      {renderLocationName(LocationName)}
      
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