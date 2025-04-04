import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRoute } from "@react-navigation/native";
import API from "../Api"; // Ensure API is correctly configured

const screenWidth = Dimensions.get("window").width;

const ChartComponent = () => {
  const route = useRoute();
  const { clusterId, parameterName, locationName } = route.params || {};

  const [chartData, setChartData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    lockOrientation();

    fetchChartData();

    return () => {
      ScreenOrientation.unlockAsync(); // Unlock when leaving
    };
  }, []);

  const fetchChartData = async () => {
    try {
      console.log("Fetching chart data for:", clusterId, parameterName, locationName);
      const response = await API.post("/getValuesByInterval", {
        clusterId,
        parameterName,
        location: locationName,
        interval: "360h", // Adjust the interval as needed
      });

      if (response.data.success) {
        const { values, unit } = response.data.data;
        
        const extractedValues = values.map(entry => entry.value);
        const extractedTimestamps = values.map(entry => new Date(entry.time).toLocaleTimeString());

        setChartData(extractedValues);
        setTimestamps(extractedTimestamps);
        setUnit(unit);
      } else {
        setError("No data available.");
      }
    } catch (err) {
      console.error("Error fetching chart data:", err.message);
      setError("Failed to fetch chart data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{parameterName} Data</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#003399" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <LineChart
          data={{
            labels: timestamps,
            datasets: [{ data: chartData }],
          }}
          width={screenWidth - 20}
          height={250}
          yAxisSuffix={` ${unit}`}
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 50, 150, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: { r: "6", strokeWidth: "2", stroke: "#003399" },
          }}
          bezier
          style={styles.chart}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", alignItems: "center", padding: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  chart: { borderRadius: 16 },
  errorText: { fontSize: 16, color: "red", textAlign: "center", marginTop: 20 },
});

export default ChartComponent;
