import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import * as ScreenOrientation from 'expo-screen-orientation';

const screenWidth = Dimensions.get('window').width; // Set graph width to fit screen

const ChartComponent = () => {
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync(); // Unlock when leaving
    };
  }, []);

  // Replace with real data
  const rainfallData = [0, 16.4, 16.4, 16.4, 16.4, 16.4, 16.4, 0]; 
  const timestamps = ['13:00', '16:25', '19:00', '22:00', '01:00', '04:00', '07:00', '10:00'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Rainfall</Text>

      <LineChart
        data={{
          labels: timestamps,
          datasets: [{ data: rainfallData }],
        }}
        width={screenWidth - 20} // Fit graph within the screen
        height={250}
        yAxisLabel=""
        yAxisSuffix=" mm"
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 50, 150, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: { r: '6', strokeWidth: '2', stroke: '#003399' },
        }}
        bezier
        style={styles.chart}
      />

      {/* Min and Max Values */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Min: 0 mm (27/03/2025, 12:55:58)</Text>
        <Text style={styles.footerText}>Max: 16.4 mm (27/03/2025, 16:25:58)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  chart: { borderRadius: 16 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10 },
  footerText: { fontSize: 14, color: '#003399', fontWeight: 'bold' },
});

export default ChartComponent;
