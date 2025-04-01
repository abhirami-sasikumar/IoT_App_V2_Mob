import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "./Location.style";
import API from "../Api"; // Ensure API is correctly set up

const LocationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { clusterId, parameterName } = route.params || {};

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("LocationScreen Mounted");
    console.log("Received Params - Cluster ID:", clusterId, "Parameter Name:", parameterName);

    if (clusterId && parameterName) {
      fetchLocations();
    } else {
      console.error("Missing clusterId or parameterName in route params.");
      setLoading(false);
    }
  }, [clusterId, parameterName]);

  const fetchLocations = async () => {
    try {
      console.log("Fetching locations for:", clusterId, parameterName);
      const response = await API.get(`/get_location/${clusterId}/${parameterName}`);
      const locationData = response.data.locations || [];

      console.log("Fetched Locations:", locationData);

      // Fetch latest value for each location
      const enrichedLocations = await Promise.all(
        locationData.map(async (location) => {
          try {
            console.log(`Fetching latest value for ${location.name} with Cluster ID:`, clusterId);
            const latestValueResponse = await API.post(`/get_latest_value`, {
              clusterId,
              parameterName,
              location: location.name,
            });

            console.log(`Latest Value for ${location.name}:`, latestValueResponse.data);

            const latestValue = latestValueResponse.data?.data?.latestValue || {};
            const unit = latestValueResponse.data?.data?.unit || "";

            return {
              ...location,
              latestValue: latestValue.value ?? "N/A",
              time: latestValue.time ?? "N/A",
              unit,
            };
          } catch (err) {
            console.error(`Error fetching latest value for ${location.name}:`, err.message);
            return { ...location, latestValue: "N/A", time: "N/A", unit: "" };
          }
        })
      );

      setLocations(enrichedLocations);
    } catch (err) {
      setError("Failed to fetch locations: " + err.message);
      console.error("Error fetching locations:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LOCATIONS</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : locations.length > 0 ? (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id || item._id} // Ensures a valid unique key
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Chart", {
                clusterId,
                parameterName,
                locationName: item.name,
              })}
              style={styles.locationItem}
            >
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.latestValue}>
                Latest: {item.latestValue} {item.unit}
              </Text>
              <Text style={styles.timestamp}>Time: {item.time}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.text}>No locations available</Text>
      )}
    </View>
  );
};

export default LocationScreen;
