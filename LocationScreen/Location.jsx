import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import LocationCard from "./components/LocationCard/LocationCard";
import { styles } from "./Location.style";
import Header from "../Components/Header/Header";
import API from "../Api";
import Loading from "../Components/Loading/Loading";
import Footer from "../Components/Footer/Footer";

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
      // console.log("Fetched locations:", locationData);
  
      const enrichedLocations = await Promise.all(
        locationData.map(async (location) => {
          try {
            const latestValueResponse = await API.post(`/get_latest_value`, {
              clusterId,
              parameterName,
              location: location.name,
            });
  
            // console.log(`Latest value for ${location.name}:`, latestValueResponse.data);
  
            const latestValue = latestValueResponse.data?.data?.latestValue || {};
            const unit = latestValueResponse.data?.data?.unit || "";
            const isChart = latestValueResponse.data?.data?.isChart ?? false;
            const hideDevice = latestValueResponse.data?.data?.hideDevice ?? false;
  
            return {
              ...location,
              latestValue: latestValue.value ?? "N/A",
              time: latestValue.time ?? "N/A",
              unit,
              isChart,
              hideDevice,
            };
          } catch (err) {
            console.error(`Error fetching latest value for ${location.name}:`, err.message);
            return {
              ...location,
              latestValue: "N/A",
              time: "N/A",
              unit: "",
              isChart: false,
              hideDevice: false,
            };
          }
        })
      );
  
      // console.log("Enriched locations with latest values:", enrichedLocations);
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
      <View style={styles.header1}>
        <Header title={parameterName || "Locations"} />
      </View>

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
                  hideDevice={location.hideDevice}
                  clusterId={clusterId}
                  parameterName={parameterName}
                  time={location.time}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      <View>
        <Footer />
      </View>
    </View>
  );
};

export default Location;
