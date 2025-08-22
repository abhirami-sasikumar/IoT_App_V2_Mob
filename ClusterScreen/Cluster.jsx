import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import Footer from "../Components/Footer/Footer";
import LongCard from "./components/LongCard/LongCard";
import styles from "./Cluster.style";
import API from "../Api"; // Assuming API.js handles your axios or fetch calls
import { UserContext } from "../Components/Context/Context";
import * as ScreenOrientation from "expo-screen-orientation";
import Loading from "../Components/Loading/Loading";
import SafeScreen from "../Components/SafeArea/SafeArea";
import * as Location from 'expo-location';
import DeviceCard from "./components/LongCard/DeviceCard";

// --- Placeholder Maps for Value Conversion (You'll replace these with actual values/imports) ---
const windDirectionMap = {
  "N": "North",
  "NE": "North-East",
  "E": "East",
  "SE": "South-East",
  "S": "South",
  "SW": "South-West",
  "W": "West",
  "NW": "North-West",
};

const pumpStatusMap = {
  "0": "OFF",
  "1": "ON",
};
// --- End Placeholder Maps ---

const Cluster = () => {
  const [clusters, setClusters] = useState([]);
  const [allApiDevices, setAllApiDevices] = useState([]); // Stores all enriched devices from API
  const [nearbyDevices, setNearbyDevices] = useState([]); // Stores filtered nearby devices
  const [userLocation, setUserLocation] = useState(null);
  const [fullAddress, setFullAddress] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext);

  // Haversine formula to calculate distance between two points on Earth
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  // Function to filter devices based on user's location
  const filterNearbyDevices = useCallback((devicesToFilter, location) => {
    console.log("--- filterNearbyDevices ---");
    console.log("User Location (lat, lon):", location?.latitude, location?.longitude);
    console.log("Total API Devices to filter:", devicesToFilter.length);

    if (!location || !devicesToFilter || devicesToFilter.length === 0) {
      console.log("Filter skipped: User location or device data is missing.");
      return [];
    }
    
    const { latitude: userLat, longitude: userLon } = location;
    const nearby = [];
    const MAX_DISTANCE_KM = 20; // 5 km radius

    devicesToFilter.forEach((device, index) => {
      console.log(`  Processing device ${index + 1}: ${device.deviceLocation} (Cluster: ${device.clusterName})`);
      console.log(`    Device Coords (lat, lon): ${device.latitude}, ${device.longitude}`);
      console.log(`    HideDevice flag: ${device.hideDevice}`);

      // Ensure device has valid latitude and longitude for filtering
      if (
        typeof device.latitude === 'number' &&
        typeof device.longitude === 'number' &&
        !isNaN(device.latitude) &&
        !isNaN(device.longitude)
      ) {
        const distance = getDistanceFromLatLonInKm(
          userLat,
          userLon,
          device.latitude,
          device.longitude
        );
        console.log(`    Calculated Distance: ${distance.toFixed(2)} km (Max: ${MAX_DISTANCE_KM} km)`);
        
        if (distance <= MAX_DISTANCE_KM && !device.hideDevice) {
          nearby.push(device);
          console.log("    => Device ADDED to nearbyDevices.");
        } else {
          console.log("    => Device SKIPPED (Reason: Too far or hideDevice is true).");
        }
      } else {
        console.log(`    => Device SKIPPED (Reason: Invalid coordinates or type).`);
      }
    });
    console.log("--- Filter Nearby Devices COMPLETE. Found:", nearby.length, "devices ---");
    return nearby;
  }, []);

  // Comprehensive function to fetch all cluster, parameter, location, and latest value data
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    let allProcessedDevices = [];
    console.log("fetchAllData: Starting data fetching process.");

    try {
      if (!user.jwtToken || !user.userId) {
        console.warn("fetchAllData: Missing user credentials. Skipping API calls.");
        setError("Missing user credentials. Please log in.");
        setLoading(false);
        return;
      }
      console.log("fetchAllData: User credentials found. Proceeding with API calls.");

      // 1. Fetch all clusters for the user
      const clustersResponse = await API.get(`/get_clusters/${user.userId}`);
      const fetchedClusters = clustersResponse.data.clusters || [];
      console.log("fetchAllData: Fetched Clusters (count):", fetchedClusters.length);
      console.log("fetchAllData: Fetched Clusters data:", fetchedClusters); // <--- THIS LINE IS NOW UNCOMMENTED FOR DEBUGGING
      setClusters(fetchedClusters); // Keep clusters state for LongCard rendering

      // Process each cluster to get its parameters, locations, and latest values
      for (const cluster of fetchedClusters) {
        console.log(`fetchAllData: Processing Cluster: ${cluster.clusterName} (ID: ${cluster._id})`);
        // 2. Fetch parameters for the current cluster
        const parametersResponse = await API.get(`/get_parameter/${cluster._id}`);
        const parameters = parametersResponse.data.parameters || [];
        console.log(`fetchAllData:   Parameters for ${cluster.clusterName} (count):`, parameters.length);
        // console.log(`fetchAllData:   Parameters data for ${cluster.clusterName}:`, parameters); // Uncomment for full parameters data debug

        for (const param of parameters) {
          const parameterName = param.parameterName;
          const measurementUnit = param.measurement; // Unit from get_parameter API
          // console.log(`fetchAllData:     Processing Parameter: ${parameterName}`);

          // 3. Fetch locations for the current parameter within the current cluster
          const locationsResponse = await API.get(`/get_location/${cluster._id}/${encodeURIComponent(parameterName)}`);
          const locationData = locationsResponse.data.locations || [];
          console.log(`fetchAllData:       Locations for ${parameterName} (count):`, locationData.length);
          // console.log(`fetchAllData:       Locations data for ${parameterName}:`, locationData); // Uncomment for full locations data debug

          // For each location, fetch its latest value
          for (const location of locationData) {
            try {
              const latestValueResponse = await API.post(`/get_latest_value`, {
                clusterId: cluster._id,
                parameterName,
                location: location.name,
              });
              const latestValueData = latestValueResponse.data?.data;
              // console.log(`fetchAllData:         Latest value for ${location.name} (${parameterName}):`, latestValueData); // Uncomment for full latest value data debug

              let valueToDisplay = latestValueData?.latestValue?.value ?? "Under Maintenance";

              // Apply Wind Direction Conversion
              if (parameterName === "Wind Direction" && typeof valueToDisplay === 'string') {
                valueToDisplay = windDirectionMap[valueToDisplay] || valueToDisplay;
              }
              // Apply Pump Status Conversion
              if (parameterName === "Pump Status" && (valueToDisplay === 0 || valueToDisplay === 1)) {
                valueToDisplay = pumpStatusMap[String(valueToDisplay)] || valueToDisplay;
              }

              const time = latestValueData?.latestValue?.time ?? "N/A";
              const hideDevice = latestValueData?.hideDevice ?? false;
              
              // Construct the enriched device object with all necessary props for DeviceCard
              allProcessedDevices.push({
                _id: `${cluster._id}-${parameterName}-${location.name}`, // Unique ID for each device reading
                parameterName: parameterName,
                value: valueToDisplay,
                measurement: measurementUnit || latestValueData?.unit || "", // Prioritize unit from get_parameter, then get_latest_value
                lastUpdatedTime: time,
                clusterName: cluster.clusterName,
                deviceLocation: location.name, // This is the location name from get_location API
                latitude: location.latitude,
                longitude: location.longitude,
                hideDevice: hideDevice,
              });

            } catch (latestValueError) {
              console.error(`Error fetching latest value for ${cluster.clusterName}, ${parameterName}, ${location.name}:`, latestValueError.message);
              // Push a device object even if fetching its latest value fails
              allProcessedDevices.push({
                _id: `${cluster._id}-${parameterName}-${location.name}`,
                parameterName: parameterName,
                value: "N/A",
                measurement: measurementUnit || "",
                lastUpdatedTime: "N/A",
                clusterName: cluster.clusterName,
                deviceLocation: location.name,
                latitude: location.latitude,
                longitude: location.longitude,
                hideDevice: false,
              });
            }
          }
        }
      }
      console.log("fetchAllData: All processed devices (total count):", allProcessedDevices.length);
      setAllApiDevices(allProcessedDevices); // Update state with all fetched and enriched devices
      setError(null);
    } catch (generalError) {
      console.error("fetchAllData: Error fetching all cluster data:", generalError.message);
      setError("Failed to fetch all cluster data: " + generalError.message);
    } finally {
      setLoading(false);
      console.log("fetchAllData: Data fetching process completed.");
    }
  }, [user.jwtToken, user.userId]); // Dependencies for useCallback

  // Main effect for initial app setup, location, and data fetching
  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      console.log("initializeApp: Starting app initialization.");

      // 1. Get Location Permissions and User Location
      let locationCoords;
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            "Permission Denied",
            "Permission to access location was denied. Cannot show nearby devices.",
            [{ text: "OK" }]
          );
          setError("Location access denied.");
          setLoading(false);
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        locationCoords = location.coords;
        setUserLocation(locationCoords); // Set real user location
        console.log("initializeApp: User Location obtained:", locationCoords);

        // Reverse geocode the obtained location to get full address details
        await reverseGeocode(locationCoords.latitude, locationCoords.longitude);
        console.log("initializeApp: Reverse geocoding completed.");

      } catch (locErr) {
        console.error("initializeApp: Error getting location:", locErr.message);
        Alert.alert(
          "Location Error",
          "Could not get your current location. Please ensure GPS is enabled.",
          [{ text: "OK" }]
        );
        setError("Failed to get current location.");
        setLoading(false);
        return;
      }

      // 2. Fetch all data from APIs (clusters, parameters, locations, latest values)
      await fetchAllData();
      console.log("initializeApp: All data fetched from APIs.");

      setLoading(false);
      console.log("initializeApp: App initialization completed. Loading set to false.");
    };

    initializeApp();

    // Set interval for polling new data every 15 minutes
    const interval = setInterval(() => {
      console.log("Interval: Re-initializing app to refresh data.");
      initializeApp(); // Re-initialize to refresh location and data
    }, 900000); // Polling every 15 minutes (900000 ms)

    // Cleanup interval and orientation lock on unmount
    return () => {
      console.log("Cleanup: Clearing interval and unlocking screen orientation.");
      clearInterval(interval);
      ScreenOrientation.unlockAsync(); // Unlock orientation on component unmount
    };
  }, [fetchAllData, reverseGeocode]); // Dependencies for useEffect

  // Effect to filter nearby devices whenever allApiDevices or userLocation changes
  useEffect(() => {
    console.log("useEffect [allApiDevices, userLocation]: Running filter for nearby devices.");
    if (allApiDevices.length > 0 && userLocation) {
      const filtered = filterNearbyDevices(allApiDevices, userLocation); // Filter from all fetched devices
      setNearbyDevices(filtered);
      console.log("useEffect [allApiDevices, userLocation]: Updated nearbyDevices count:", filtered.length);
    } else {
      setNearbyDevices([]);
      console.log("useEffect [allApiDevices, userLocation]: allApiDevices or userLocation is empty. nearbyDevices set to empty.");
    }
  }, [allApiDevices, userLocation, filterNearbyDevices]);

  // Helper function to get full address details from reverse geocoding
  const reverseGeocode = useCallback(async (latitude, longitude) => {
    console.log("reverseGeocode: Attempting to reverse geocode Lat:", latitude, "Lon:", longitude);
    try {
      let result = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (result && result.length > 0) {
        setFullAddress(result[0]); 
        console.log("reverseGeocode: Full address found:", result[0]);
      } else {
        setFullAddress(null);
        console.log("reverseGeocode: No address found for the given coordinates.");
      }
    } catch (err) {
      console.error("reverseGeocode: Error reverse geocoding:", err);
      setFullAddress(null);
    }
  }, []);

  // Helper function to format the full address for display
  const formatFullAddress = (address) => {
    if (!address) {
      return "Location details not available.";
    }
    const { name, street, city, subregion, district, region, country } = address;
    const addressParts = [
      name,
      street,
      district, 
      city,
      subregion,
      region,
      country
    ].filter(part => part);
    return addressParts.join(', ');
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>CLUSTERS</Text>
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
            >
              {error ? (
                <Text style={styles.emptyMessage}>{error}</Text>
              ) : clusters.length > 0 ? (
                // Section 1: All LongCards fetched from API
                clusters.map((cluster) => (
                  <LongCard
                    key={cluster._id}
                    clusterName={cluster.clusterName}
                    clusterId={cluster._id}
                    clusterDescription={cluster.description}
                  />
                ))
              ) : (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyMessage}>
                    "Thanks for your request! It has been sent to the admin and is awaiting approval."
                  </Text>
                </View>
              )}

              {/* User Location Section (real data, left-aligned with icon) */}
              <View style={styles.userLocationSection}>
                <View style={styles.locationLineCombined}> 
                  <Text style={styles.locationIcon}>📍</Text>
                  {userLocation ? (
                    <Text style={styles.userLocationSubText} numberOfLines={2}> 
                      {formatFullAddress(fullAddress)}
                    </Text>
                  ) : (
                    <Text style={styles.userLocationText} numberOfLines={2}> 
                      Fetching location...
                    </Text>
                  )}
                </View>
              </View>

              {/* Section 2: Device Readings */}
              <View> {/* This View ensures the heading and grid are grouped */}
                <Text style={styles.allNearbyDevicesHeading}>
                    Nearby Device Readings
                </Text>
                {nearbyDevices.length > 0 ? (
                    <View style={styles.deviceCardsGrid}>
                        {nearbyDevices.map((device) => (
                            <DeviceCard
                                key={device._id}
                                parameterName={device.parameterName}
                                value={device.value} 
                                measurement={device.measurement} 
                                lastUpdatedTime={device.lastUpdatedTime} 
                                clusterName={device.clusterName}
                                deviceLocation={device.deviceLocation}
                            />
                        ))}
                    </View>
                ) : ( // Display message if no nearby devices are found
                  <View style={styles.emptyCard}>
                    <Text style={styles.emptyMessage}>
                      No nearby devices found within 5km or API data not available.
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>

            <Footer />
          </>
        )}
      </View>
    </SafeScreen>
  );
};

export default Cluster;
