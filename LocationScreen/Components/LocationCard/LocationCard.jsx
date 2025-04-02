import React from "react";
import { Text, Image, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./LocationCard.style";
import chartIcon from "../../../assets/chart.png";

export const LocationCard = ({ LocationName, Value, Measurement, showChart = true }) => {
  return (
    <View style={styles.card}>
      {/* Location Name */}
      <Text style={styles.headText}>{LocationName}</Text>

      {/* Separator Line */}
      <View style={styles.line} />

      {/* Bottom Row: Value in Center, Chart at End */}
      <View style={styles.bottomRow}>
        {/* Centered Value & Measurement */}
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{Value}</Text>
          <Text style={styles.measurementText}>{Measurement}</Text>
        </View>

        {/* Chart Icon at the End */}
        {showChart && <Image source={chartIcon} style={styles.chartIcon} />}
      </View>
    </View>
  );
};

// Prop validation
LocationCard.propTypes = {
  LocationName: PropTypes.string.isRequired,
  Value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  Measurement: PropTypes.string.isRequired,
  showChart: PropTypes.bool,
};
