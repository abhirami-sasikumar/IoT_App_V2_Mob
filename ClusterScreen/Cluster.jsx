import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import Footer from "../Components/Footer/Footer";
import LongCard from "./components/LongCard/LongCard";
import styles from "./Cluster.style";
import API from "../Api";
import { UserContext } from "../Components/Context/Context";
import * as ScreenOrientation from "expo-screen-orientation";
import Loading from "../Components/Loading/Loading";
import SafeScreen from "../Components/SafeArea/SafeArea";
import * as Location from 'expo-location';
import DeviceCard from "./components/LongCard/DeviceCard";
import Icon from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';

// --- Placeholder Maps for Value Conversion ---
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
  const [allApiDevices, setAllApiDevices] = useState([]);
  const [uniqueNearbyDevices, setUniqueNearbyDevices] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [fullAddress, setFullAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasFetchedInitialData, setHasFetchedInitialData] = useState(false);
  const isFocused = useIsFocused();

  const { user } = useContext(UserContext);

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
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

  const filterUniqueNearestDevices = useCallback((devicesToFilter, location) => {
    if (!location || !devicesToFilter || devicesToFilter.length === 0) {
      return [];
    }
    
    const { latitude: userLat, longitude: userLon } = location;
    const uniqueNearestDevices = {};
    const MAX_DISTANCE_KM = 5;

    devicesToFilter.forEach((device) => {
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
        
        if (distance <= MAX_DISTANCE_KM && !device.hideDevice) {
          const { parameterName } = device;
          if (
            !uniqueNearestDevices[parameterName] || 
            distance < uniqueNearestDevices[parameterName].distance
          ) {
            uniqueNearestDevices[parameterName] = { ...device, distance };
          }
        }
      }
    });

    const result = Object.values(uniqueNearestDevices);
    return result;
  }, []);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    let allProcessedDevices = [];
    try {
      if (!user.jwtToken || !user.userId) {
        setError("Missing user credentials. Please log in.");
        setLoading(false);
        return;
      }
 
      const clustersResponse = await API.get(`/get_clusters/${user.userId}`);
      const fetchedClusters = clustersResponse.data.clusters || [];
      setClusters(fetchedClusters);
 
      const allParametersPromises = fetchedClusters.map(cluster =>
        API.get(`/get_parameter/${cluster._id}`).then(res => ({
          clusterId: cluster._id,
          clusterName: cluster.clusterName,
          parameters: res.data.parameters || []
        }))
      );
 
      const allParametersResults = await Promise.all(allParametersPromises);
      const allLocationsPromises = allParametersResults.flatMap(clusterData =>
        clusterData.parameters.map(param =>
          API.get(`/get_location/${clusterData.clusterId}/${encodeURIComponent(param.parameterName)}`).then(res => ({
            ...clusterData,
            parameterName: param.parameterName,
            measurementUnit: param.measurement,
            locations: res.data.locations || []
          }))
        )
      );
 
      const allLocationsResults = await Promise.all(allLocationsPromises);
      const allLatestValuesPromises = allLocationsResults.flatMap(paramData =>
        paramData.locations.map(location =>
          API.post(`/get_latest_value`, {
            clusterId: paramData.clusterId,
            parameterName: paramData.parameterName,
            location: location.name,
          }).then(res => {
            const latestValueData = res.data?.data;
            let valueToDisplay = latestValueData?.latestValue?.value ?? "Under Maintenance";
 
            if (paramData.parameterName === "Wind Direction" && typeof valueToDisplay === 'string') {
              valueToDisplay = windDirectionMap[valueToDisplay] || valueToDisplay;
            }
            if (paramData.parameterName === "Pump Status" && (valueToDisplay === 0 || valueToDisplay === 1)) {
              valueToDisplay = pumpStatusMap[String(valueToDisplay)] || valueToDisplay;
            }
            const time = latestValueData?.latestValue?.time ?? "N/A";
            const hideDevice = latestValueData?.hideDevice ?? false;
 
            return {
              _id: `${paramData.clusterId}-${paramData.parameterName}-${location.name}`,
              parameterName: paramData.parameterName,
              value: valueToDisplay,
              measurement: paramData.measurementUnit || latestValueData?.unit || "",
              lastUpdatedTime: time,
              clusterName: paramData.clusterName,
              deviceLocation: location.name,
              latitude: location.latitude,
              longitude: location.longitude,
              hideDevice: hideDevice,
            };
          }).catch(latestValueError => {
            console.error(`Error fetching latest value for ${paramData.clusterName}, ${paramData.parameterName}, ${location.name}:`, latestValueError.message);
            return {
              _id: `${paramData.clusterId}-${paramData.parameterName}-${location.name}`,
              parameterName: paramData.parameterName,
              value: "N/A",
              measurement: paramData.measurementUnit || "",
              lastUpdatedTime: "N/A",
              clusterName: paramData.clusterName,
              deviceLocation: location.name,
              latitude: location.latitude,
              longitude: location.longitude,
              hideDevice: false,
            };
          })
        )
      );
      allProcessedDevices = await Promise.all(allLatestValuesPromises);
      setAllApiDevices(allProcessedDevices);
      setError(null);
    } catch (generalError) {
      console.error("fetchAllData: Error fetching all cluster data:", generalError.message);
      setError("Failed to fetch all cluster data: " + generalError.message);
    } finally {
      setLoading(false);
    }
  }, [user.jwtToken, user.userId]);

  const reverseGeocode = useCallback(async (latitude, longitude) => {
    try {
      let result = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (result && result.length > 0) {
        setFullAddress(result[0]); 
      } else {
        setFullAddress(null);
      }
    } catch (err) {
      console.error("reverseGeocode: Error reverse geocoding:", err);
      setFullAddress(null);
    }
  }, []);

  const formatFullAddress = (address) => {
    if (!address) {
      return "Location details not available.";
    }
    const { name, street, city, district } = address;
    const addressParts = [
      name,
      street,
      district, 
      city
    ].filter(part => part);
    return addressParts.join(', ');
  };

  useEffect(() => {
    // This condition is the key to caching.
    // It runs only if the screen is focused AND the initial data hasn't been fetched yet.
    if (isFocused && !hasFetchedInitialData) {
      const initializeApp = async () => {
        setLoading(true);
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

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
          setUserLocation(locationCoords);
          await reverseGeocode(locationCoords.latitude, locationCoords.longitude);
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
        
        await fetchAllData();
        setHasFetchedInitialData(true);
        setLoading(false);
      };

      initializeApp();
    }

    // This interval provides a periodic refresh, separate from navigation.
    const interval = setInterval(() => {
      if (isFocused) {
        fetchAllData();
      }
    }, 900000);

    return () => {
      clearInterval(interval);
      ScreenOrientation.unlockAsync();
    };
  }, [isFocused, hasFetchedInitialData, fetchAllData, reverseGeocode]);

  useEffect(() => {
    if (allApiDevices.length > 0 && userLocation) {
      const filtered = filterUniqueNearestDevices(allApiDevices, userLocation);
      setUniqueNearbyDevices(filtered);
    } else {
      setUniqueNearbyDevices([]);
    }
  }, [allApiDevices, userLocation, filterUniqueNearestDevices]);

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
 
                <Text style={styles.allNearbyDevicesHeading}>
                    Nearby Device Readings
                </Text>
 
                <View style={styles.userLocationSection}>
                    <View style={styles.locationLineCombined}>
                      <Text style={styles.locationIcon}>
                        <Icon name="location" size={15} color="#810541" />
                        <Text style={styles.userLocationHeading}>Your Location</Text>
                      </Text>
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
            
 
              <View>
 
                {uniqueNearbyDevices.length > 0 ? (
                    <View style={styles.deviceCardsGrid}>
                        {uniqueNearbyDevices.map((device) => (
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
                ) : (
                  <View style={styles.emptyCard}>
                    <Text style={styles.emptyMessage}>
                      No nearby devices found within 5km. 
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




// Cluster.js (Conceptual update)
// Cluster.js
// import React, { useEffect } from "react";
// import { View, Text, ScrollView } from "react-native"; // Alert is handled in DataStoreContext
// import Footer from "../Components/Footer/Footer";
// import LongCard from "./components/LongCard/LongCard";
// import styles from "./Cluster.style";
// // API, UserContext, ScreenOrientation, Location are no longer directly used here
// import Loading from "../Components/Loading/Loading";
// import SafeScreen from "../Components/SafeArea/SafeArea"; // Uncommented this import
// import DeviceCard from "./components/LongCard/DeviceCard";
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useIsFocused } from '@react-navigation/native';
// import { useDataStore } from "./DataStoreContext"; // <-- Corrected path again

// // --- Placeholder Maps for Value Conversion (Can be removed if only used in DataStoreContext) ---
// // If these maps are only used inside DataStoreContext.js, you can remove them from here.
// // Keeping them here for completeness if other components might also use them directly.
// const windDirectionMap = {
//   "N": "North",
//   "NE": "North-East",
//   "E": "East",
//   "SE": "South-East",
//   "S": "South",
//   "SW": "South-West",
//   "W": "West",
//   "NW": "North-West",
// };

// const pumpStatusMap = {
//   "0": "OFF",
//   "1": "ON",
// };
// // --- End Placeholder Maps ---

// const Cluster = () => {
//   // Pull all necessary state and functions from the global store
//   const { 
//     clusters, 
//     allApiDevices, // Still useful for debugging or if Cluster needed to re-filter
//     uniqueNearbyDevices, 
//     userLocation, 
//     fullAddress, 
//     loadingGlobal,    // Overall loading state for the data store
//     loadingNearby,    // Loading state specifically for location/nearby devices
//     errorGlobal,      // Overall error state from the data store
//     hasFetchedInitialData, // Flag from data store
//     fetchAllDataOptimized, // Function to trigger a full data fetch (if needed)
//     updateNearbyDevices,   // Function to trigger location/nearby device update (if needed)
//     formatFullAddress      // Helper function from context
//   } = useDataStore();

//   const isFocused = useIsFocused();

//   useEffect(() => {
//     // This useEffect ensures that if the user logs in while the app is running,
//     // and the DataStore hasn't fetched data yet, it initiates the fetch.
//     // The DataStoreContext's own useEffect handles the primary "on mount" fetch.
//     if (isFocused && !hasFetchedInitialData) {
//       // You can optionally call fetchAllDataOptimized() and updateNearbyDevices() here
//       // if you need to explicitly trigger a re-fetch when the screen becomes focused
//       // and initial data is still missing (e.g., after a login).
//       // However, the DataStoreContext's useEffect should already manage this if `user.jwtToken` changes.
//       // For a robust setup, the `DataStoreContext` handles the main fetch lifecycle.
//     }
//   }, [isFocused, hasFetchedInitialData, fetchAllDataOptimized, updateNearbyDevices]);


//   return (
//     <SafeScreen> {/* SafeScreen is now correctly imported */}
//       <View style={styles.container}>
//         {loadingGlobal ? ( // Use loadingGlobal for the main app data loading indicator
//           <Loading />
//         ) : (
//           <>
//             <View style={styles.headerContainer}>
//               <Text style={styles.header}>CLUSTERS</Text>
//             </View>
 
//             <ScrollView
//               style={styles.scrollView}
//               contentContainerStyle={styles.scrollContent}
//             >
//               {errorGlobal ? ( // Use errorGlobal here
//                 <Text style={styles.emptyMessage}>{errorGlobal}</Text>
//               ) : (clusters && clusters.length > 0) ? ( // Added check for clusters
//                 clusters.map((cluster) => (
//                   <LongCard
//                     key={cluster._id}
//                     clusterName={cluster.clusterName}
//                     clusterId={cluster._id}
//                     clusterDescription={cluster.description}
//                   />
//                 ))
//               ) : (
//                 <View style={styles.emptyCard}>
//                   <Text style={styles.emptyMessage}>
//                     "Thanks for your request! It has been sent to the admin and is awaiting approval."
//                   </Text>
//                 </View>
//               )}
 
//               <Text style={styles.allNearbyDevicesHeading}>
//                   Nearby Device Readings
//               </Text>
 
//               <View style={styles.userLocationSection}>
//                   <View style={styles.locationLineCombined}>
//                     <Text style={styles.locationIcon}>
//                       <Icon name="location" size={15} color="#810541" />
//                       <Text style={styles.userLocationHeading}>Your Location</Text>
//                     </Text>
//                     {loadingNearby ? ( // Use loadingNearby here
//                       <Text style={styles.userLocationText} numberOfLines={2}>
//                           Fetching location...
//                       </Text>
//                     ) : userLocation ? (
//                       <Text style={styles.userLocationSubText} numberOfLines={2}>
//                         {formatFullAddress(fullAddress)}
//                       </Text>
//                     ) : (
//                       <Text style={styles.userLocationText} numberOfLines={2}>
//                         Location details not available.
//                       </Text>
//                     )}
//                   </View>
//                 </View>
          
//               <View>
//                 {loadingNearby ? ( // Use loadingNearby here
//                     <Loading />
//                 ) : (uniqueNearbyDevices && uniqueNearbyDevices.length > 0) ? ( // Added check for uniqueNearbyDevices
//                     <View style={styles.deviceCardsGrid}>
//                         {uniqueNearbyDevices.map((device) => (
//                             <DeviceCard
//                                 key={device._id}
//                                 parameterName={device.parameterName}
//                                 value={device.value} 
//                                 measurement={device.measurement} 
//                                 lastUpdatedTime={device.lastUpdatedTime} 
//                                 clusterName={device.clusterName}
//                                 deviceLocation={device.deviceLocation}
//                             />
//                         ))}
//                     </View>
//                 ) : (
//                   <View style={styles.emptyCard}>
//                     <Text style={styles.emptyMessage}>
//                       No nearby devices found within 5km. 
//                     </Text>
//                   </View>
//                 )}
//               </View>
//             </ScrollView>
 
//             <Footer />
//           </>
//         )}
//       </View>
//     </SafeScreen>
//   );
// };

// export default Cluster;


