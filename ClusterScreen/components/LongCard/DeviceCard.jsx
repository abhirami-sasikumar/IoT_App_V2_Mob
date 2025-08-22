import React from 'react';
import { View, Text } from 'react-native';
import styles from './DeviceCard.style';

const DeviceCard = ({ 
  parameterName, 
  value, 
  measurement, 
  lastUpdatedTime, 
  clusterName, 
  deviceLocation 
}) => {

  // Helper function to format the time for better readability
  const formatTime = (isoString) => {
    if (!isoString) return 'N/A';
    try {
      const date = new Date(isoString);
      // Only show time with hour, minute, and AM/PM
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      console.error("Error formatting time:", e);
      return 'Invalid Time';
    }
  };

  return (
    <View style={styles.card}>
      {/* Left side: Parameter Name, Value, Last Updated Time */}
      <View style={styles.leftContent}>
        <Text style={styles.parameterName}>{parameterName || 'Unknown Parameter'}</Text>
        <Text style={styles.valueText}>
          {value !== undefined ? value : 'N/A'} {measurement || ''}
        </Text>
        <Text style={styles.timeText}>Last Updated: {formatTime(lastUpdatedTime)}</Text>
      </View>

      {/* Right side: Cluster Name and Device Location */}
      <View style={styles.rightContent}>
        <Text style={styles.clusterName}>{clusterName || 'Unknown Cluster'}</Text>
        <Text style={styles.deviceLocation}>{deviceLocation || 'Unknown Location'}</Text>
      </View>
    </View>
  );
};

export default DeviceCard;
