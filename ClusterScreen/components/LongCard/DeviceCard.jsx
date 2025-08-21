import React from "react";
import { Text, View } from "react-native";
import { styles } from "./DeviceCard.style";

const DeviceCard = ({
  LocationName,
  Value,
  Measurement,
  hideDevice,
  parameterName,
  time,
}) => {
  const displayValue = hideDevice ? "Under Maintenance" : Value;

  return (
    <View style={styles.card}>
      {/* Parameter Name */}
      <Text
        style={styles.headText}
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.9}
        ellipsizeMode="tail"
      >
        {parameterName}
      </Text>

      <View style={styles.line} />

      {/* Value and Measurement / Maintenance Status */}
      <View style={styles.bottomRow}>
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
      </View>

      {/* Last Updated Time Display */}
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

export default DeviceCard;