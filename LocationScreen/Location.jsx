import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import LocationCard from "./components/LocationCard/LocationCard";
import { styles } from "./Location.style";
import Header from "../Components/Header/Header";
import API from "../Api";
import Loading from "../Components/Loading/Loading";

const Location = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { clusterId, parameterName } = route.params || {};

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (clusterId && parameterName) {
      fetchLocations();
    } else {
      console.error("Missing clusterId or parameterName in route params.");
      setError("Missing cluster or parameter info.");
      setLoading(false);
    }
  }, [clusterId, parameterName]);

  const fetchLocations = async () => {
    try {
      const response = await API.get(`/get_location/${clusterId}/${parameterName}`);
      const locationData = response.data.locations || [];

      const enrichedLocations = await Promise.all(
        locationData.map(async (location) => {
          try {
            const latestValueResponse = await API.post(`/get_latest_value`, {
              clusterId,
              parameterName,
              location: location.name,
            });

            const latestValue = latestValueResponse.data?.data?.latestValue || {};
            const unit = latestValueResponse.data?.data?.unit || "";
            const isChart = latestValueResponse.data?.data?.isChart ?? false;

            return {
              ...location,
              latestValue: latestValue.value ?? "N/A",
              time: latestValue.time ?? "N/A",
              unit,
              isChart,
            };
          } catch (err) {
            console.error(`Error fetching latest value for ${location.name}:`, err.message);
            return { ...location, latestValue: "N/A", time: "N/A", unit: "", isChart: false };
          }
        })
      );

      setLocations(enrichedLocations);
    } catch (err) {
      console.error("Failed to fetch locations:", err.message);
      setError("Failed to fetch locations: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Header title={parameterName || "Locations"} />

      {loading ? (
        <Loading />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <View style={styles.cardContainer}>
              {locations.map((location, index) => (
                <LocationCard
                  key={index}
                  LocationName={location.name}
                  Value={location.latestValue}
                  Measurement={location.unit}
                  isChart={location.isChart}
                  clusterId={clusterId}
                  parameterName={parameterName}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Location;
