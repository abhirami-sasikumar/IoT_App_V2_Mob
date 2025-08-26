// DataStoreContext.js
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import API from '../Api'; // Assuming your API.js is in the root or accessible
import * as Location from 'expo-location';
import * as ScreenOrientation from "expo-screen-orientation";
import { Alert } from 'react-native'; // Import Alert for location permissions
import { UserContext } from '../Components/Context/Context'; // To get user.jwtToken, user.userId

// --- Placeholder Maps for Value Conversion (moved here for global access) ---
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

const DataStoreContext = createContext();

export const DataStoreProvider = ({ children }) => {
  const [clusters, setClusters] = useState([]); // Initialize as empty array
  const [allApiDevices, setAllApiDevices] = useState([]); // Initialize as empty array
  const [uniqueNearbyDevices, setUniqueNearbyDevices] = useState([]); // Initialize as empty array
  const [userLocation, setUserLocation] = useState(null);
  const [fullAddress, setFullAddress] = useState(null);
  const [loadingGlobal, setLoadingGlobal] = useState(true); // Global loading for initial app data
  const [errorGlobal, setErrorGlobal] = useState(null);
  const [hasFetchedInitialData, setHasFetchedInitialData] = useState(false);
  const [loadingNearby, setLoadingNearby] = useState(false); // Loading state specifically for nearby devices

  const { user } = useContext(UserContext); // Access user context here

  // --- Helper Functions (moved here for global context) ---
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

  const formatFullAddress = useCallback((address) => { // useCallback for this too
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
  }, []); // Empty dependency array for static function

  const fetchAllDataOptimized = useCallback(async () => {
    // Only set loading for global data. Nearby device loading is separate.
    // We want loadingGlobal to be true only on the very first comprehensive fetch.
    if (!hasFetchedInitialData) setLoadingGlobal(true); 
    setErrorGlobal(null);

    try {
        if (!user.jwtToken || !user.userId) {
            throw new Error("Missing user credentials. Please log in.");
        }

        const clustersResponse = await API.get(`/get_clusters/${user.userId}`);
        const fetchedClusters = clustersResponse.data.clusters || [];
        setClusters(fetchedClusters);

        const allParametersPromises = fetchedClusters.map(cluster =>
            API.get(`/get_parameter/${cluster._id}`).then(res => ({
                clusterId: cluster._id,
                clusterName: cluster.clusterName,
                parameters: res.data.parameters || [],
            }))
        );
        const allParametersResults = await Promise.all(allParametersPromises);

        const allLatestValuesPromises = allParametersResults.flatMap(clusterData =>
            clusterData.parameters.map(param =>
                API.get(`/get_location/${clusterData.clusterId}/${encodeURIComponent(param.parameterName)}`).then(locRes =>
                    locRes.data.locations.map(location =>
                        API.post(`/get_latest_value`, {
                            clusterId: clusterData.clusterId,
                            parameterName: param.parameterName,
                            location: location.name,
                        }).then(valRes => {
                            const latestValueData = valRes.data?.data;
                            let valueToDisplay = latestValueData?.latestValue?.value ?? "Under Maintenance";

                            if (param.parameterName === "Wind Direction" && typeof valueToDisplay === 'string') {
                                valueToDisplay = windDirectionMap[valueToDisplay] || valueToDisplay;
                            }
                            if (param.parameterName === "Pump Status" && (valueToDisplay === 0 || valueToDisplay === 1)) {
                                valueToDisplay = pumpStatusMap[String(valueToDisplay)] || valueToDisplay;
                            }
                            const time = latestValueData?.latestValue?.time ?? "N/A";
                            const hideDevice = latestValueData?.hideDevice ?? false;

                            return {
                                _id: `${clusterData.clusterId}-${param.parameterName}-${location.name}`,
                                parameterName: param.parameterName,
                                value: valueToDisplay,
                                measurement: param.measurementUnit || latestValueData?.unit || "",
                                lastUpdatedTime: time,
                                clusterName: clusterData.clusterName,
                                deviceLocation: location.name,
                                latitude: location.latitude,
                                longitude: location.longitude,
                                hideDevice: hideDevice,
                            };
                        }).catch(latestValueError => {
                            console.error(`Error fetching latest value for ${clusterData.clusterName}, ${param.parameterName}, ${location.name}:`, latestValueError.message);
                            return null;
                        })
                    )
                )
            )
        ).flat(3).filter(Boolean);
        
        const allProcessedDevices = await Promise.all(allLatestValuesPromises);
        setAllApiDevices(allProcessedDevices);

    } catch (generalError) {
        console.error("fetchAllDataOptimized: Error fetching all cluster data:", generalError.message);
        setErrorGlobal("Failed to fetch data: " + generalError.message);
    } finally {
        if (!hasFetchedInitialData) setLoadingGlobal(false); // Turn off global loading only after first fetch
    }
  }, [user.jwtToken, user.userId, hasFetchedInitialData]); // Add hasFetchedInitialData to dependencies

  const updateNearbyDevices = useCallback(async () => {
    setLoadingNearby(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorGlobal("Location access denied. Cannot show nearby devices.");
        setLoadingNearby(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const locationCoords = location.coords;
      setUserLocation(locationCoords);
      await reverseGeocode(locationCoords.latitude, locationCoords.longitude);
      const filtered = filterUniqueNearestDevices(allApiDevices, locationCoords);
      setUniqueNearbyDevices(filtered);
    } catch (locErr) {
      console.error("Error getting location:", locErr.message);
      setErrorGlobal("Failed to get current location.");
      setUniqueNearbyDevices([]);
    } finally {
      setLoadingNearby(false);
    }
  }, [allApiDevices, filterUniqueNearestDevices, reverseGeocode]);

  // Main effect to manage initial load and periodic updates
  useEffect(() => {
    const initializeGlobalData = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      try {
          // If user logs out and then logs back in, we want to re-fetch if token changes.
          // This ensures data is fetched once when the app starts AND when a user's session is established.
          if (user.jwtToken && user.userId) {
              await fetchAllDataOptimized();
              await updateNearbyDevices();
              setHasFetchedInitialData(true);
          } else {
              // If no user token, maybe clear data or set to default
              setClusters([]);
              setAllApiDevices([]);
              setUniqueNearbyDevices([]);
              setUserLocation(null);
              setFullAddress(null);
              setHasFetchedInitialData(false); // Reset if user logs out
              setLoadingGlobal(false); // Make sure loading is off if no user
          }
      } catch (err) {
          console.error("Global data initialization error:", err);
          setErrorGlobal("An unexpected error occurred during initial data load.");
      } finally {
          setLoadingGlobal(false);
      }
    };

    // Trigger initial load/refresh only if hasFetchedInitialData is false AND a user is logged in
    // This allows the app to fetch data once on startup or once upon a successful login.
    if (user.jwtToken && user.userId && !hasFetchedInitialData) {
        initializeGlobalData();
    } else if (!user.jwtToken && hasFetchedInitialData) {
        // Handle case where user logs out: clear data
        setClusters([]);
        setAllApiDevices([]);
        setUniqueNearbyDevices([]);
        setUserLocation(null);
        setFullAddress(null);
        setHasFetchedInitialData(false);
        setErrorGlobal(null);
        setLoadingGlobal(false);
    }
    
    // Set up periodic refresh for data and location
    const interval = setInterval(() => {
        if (user.jwtToken && user.userId) { // Ensure user is logged in for refreshes
            fetchAllDataOptimized();
            updateNearbyDevices();
        }
    }, 900000); // 15 minutes

    return () => {
      clearInterval(interval);
      ScreenOrientation.unlockAsync();
    };
  }, [user.jwtToken, user.userId, hasFetchedInitialData, fetchAllDataOptimized, updateNearbyDevices]);


  // Value provided by the context
  const contextValue = {
    clusters,
    allApiDevices,
    uniqueNearbyDevices,
    userLocation,
    fullAddress,
    loadingGlobal, // Use loadingGlobal for overall app data loading
    loadingNearby, // Specific loading for nearby devices
    errorGlobal,
    hasFetchedInitialData,
    fetchAllDataOptimized, // You can expose this if you want components to trigger a refresh
    updateNearbyDevices, // Expose for specific nearby device refresh
    formatFullAddress // Expose the formatter
  };

  return (
    <DataStoreContext.Provider value={contextValue}>
      {children}
    </DataStoreContext.Provider>
  );
};

export const useDataStore = () => useContext(DataStoreContext);