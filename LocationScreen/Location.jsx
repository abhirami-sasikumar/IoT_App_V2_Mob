import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import LocationCard from "./components/LocationCard/LocationCard";
import { styles } from "./Location.style"; // Assuming styles are exported this way
import Header from "../Components/Header/Header";
import API from "../Api";
import Loading from "../Components/Loading/Loading";
import Footer from "../Components/Footer/Footer";
import SafeScreen from "../Components/SafeArea/SafeArea";

// Define the wind direction mapping here, outside the component
const windDirectionMap = {
  "North": "N",
  "North-Northeast": "NNE",
  "Northeast": "NE",
  "East-Northeast": "ENE",
  "East": "E",
  "East-Southeast": "ESE",
  "Southeast": "SE",
  "South-Southeast": "SSE",
  "South": "S",
  "South-Southwest": "SSW",
  "Southwest": "SW",
  "West-Southwest": "WSW",
  "West": "W",
  "West-Northwest": "WNW",
  "Northwest": "NW",
  "North-Northwest": "NNW",
  "EastNorth": "EN",
  "EastNorth-Northeast": "ENNE"
};

// Define the pump status mapping
const pumpStatusMap = {
  "1": "ON",
  "0": "OFF"
};

const Location = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { clusterId, parameterName } = route.params || {};
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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


            const latestValueData = latestValueResponse.data?.data;
            // console.log(latestValueData)
            let valueToDisplay = latestValueData?.latestValue?.value ?? "Under Maintenance";

            // --- Apply Wind Direction Conversion ---
            if (parameterName === "Wind Direction" && typeof valueToDisplay === 'string') {
              valueToDisplay = windDirectionMap[valueToDisplay] || valueToDisplay; // Convert or use original
            }
            // --- End of Wind Direction Conversion ---

            // --- Apply Pump Status Conversion ---
            if (parameterName === "Pump Status" && (valueToDisplay === 0 || valueToDisplay === 1)) {
              valueToDisplay = pumpStatusMap[String(valueToDisplay)] || valueToDisplay; // Convert 0/1 to "OFF"/"ON"
            }
            // --- End of Pump Status Conversion ---

            const unit = latestValueData?.unit || "";
            const isChart = latestValueData?.isChart ?? false;
            const hideDevice = latestValueData?.hideDevice ?? false;
            


            return {
              ...location,
              latestValue: valueToDisplay, // Use the potentially converted value
              time: latestValueData?.latestValue?.time ?? "Under Maintenance",
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

      setLocations(enrichedLocations);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch locations:", err.message);
      setError("Failed to fetch locations: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;

    console.log("Parameter Name:", parameterName);

    if (clusterId && parameterName) {
      fetchLocations(); // initial load

      interval = setInterval(() => {
        fetchLocations();
      }, 900000); // 15 minutes
    } else {
      console.error("Missing clusterId or parameterName in route params.");
      setError("Missing cluster or parameter info.");
      setLoading(false);
    }

    return () => {
      clearInterval(interval); // cleanup on unmount
    };
  }, [clusterId, parameterName]);

  return (
    <SafeScreen>
      <View style={styles.screen}>
        <View style={styles.header1}>
         <Header title={parameterName === "Rainfall" ? "Rainfall [ last 24 h ]" :parameterName ==="Energy"?"Energy [Power consumption]" :(parameterName || "Locations")} />
         
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
                    key={index} // Consider using a unique ID from location data if available, instead of index
                    LocationName={location.name}
                    Value={location.latestValue} // This will now be the converted value for Wind Direction or Pump Status
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
    </SafeScreen>
  );
};

export default Location;