import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
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
import { ImageBackground } from "react-native";


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
  const [error, setError] = useState(null);
  const [hasFetchedInitialData, setHasFetchedInitialData] = useState(false);
  const isFocused = useIsFocused();
  const [clusterLoading, setClusterLoading] = useState(true);
  const [nearbyLoading, setNearbyLoading] = useState(true);
  const [initialLocationLoaded, setInitialLocationLoaded] = useState(false);
  
  
  


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

    const allowedParameters = [
      "Temperature",
      "Rainfall",
      "Humidity",
      "Wind Speed",
      "Wind Direction",
      "Pressure",
      "Soil Moisture",
    ];

    const { latitude: userLat, longitude: userLon } = location;
    const uniqueNearestDevices = {};
    const MAX_DISTANCE_KM = 5;

    devicesToFilter.forEach((device) => {
      if (allowedParameters.includes(device.parameterName) &&
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

  // ✅ Fetch clusters only
  const fetchClusters = useCallback(async () => {
    setClusterLoading(true);
    try {
      const clustersResponse = await API.get(`/get_clusters/${user.userId}`);
      const fetchedClusters = clustersResponse.data.clusters || [];
      setClusters(fetchedClusters);
    } catch (err) {
      setError("Failed to fetch clusters: " + err.message);
    } finally {
      setClusterLoading(false);
    }
  }, [user.userId]);

  // ✅ Fetch all device data
  const fetchAllData = useCallback(async () => {
    let allProcessedDevices = [];
    try {
      if (!user.jwtToken || !user.userId) {
        setError("Missing user credentials. Please log in.");
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
    }
    return allProcessedDevices; // ✅ important
  }, [user.jwtToken, user.userId]);

  const fetchNearbyDevices = useCallback(async (locationCoords) => {
    setNearbyLoading(true);
    try {
      const allDevices = await fetchAllData(); // ✅ capture latest list
      if (locationCoords) {
        const filtered = filterUniqueNearestDevices(allDevices, locationCoords);
        setUniqueNearbyDevices(filtered);
      }
    } catch (err) {
      console.error("fetchNearbyDevices:", err);
    } finally {
      setNearbyLoading(false);
    }
  }, [fetchAllData, filterUniqueNearestDevices]);

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

  const handleLocationAndNearby = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError("Location access denied.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Run reverse geocode and nearby fetch in parallel
      const [_, __] = await Promise.all([
        reverseGeocode(latitude, longitude),
        fetchNearbyDevices({ latitude, longitude }),
      ]);

      // ✅ Only update state once, after everything is ready
      setUserLocation({ latitude, longitude });
      setInitialLocationLoaded(true);

    } catch (locErr) {
      console.error("handleLocationAndNearby:", locErr.message);
    }
  };


  const handleRefresh = async () => {
    setNearbyLoading(true);
    await handleLocationAndNearby(); // ✅ reuse logic
    setNearbyLoading(false);
  };

  const formatFullAddress = (address) => {
    if (!address) {
      return "Location details not available.";
    }
    const { name, street, city, district } = address;
    const addressParts = [name, street, district, city].filter(part => part);
    return addressParts.join(', ');
  };

  useEffect(() => {
    if (isFocused && !hasFetchedInitialData) {
      const initializeApp = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        await fetchClusters();
        await handleLocationAndNearby();
        setHasFetchedInitialData(true);
      };
      initializeApp();
    }

    const interval = setInterval(() => {
      if (isFocused && userLocation) {
        fetchNearbyDevices(userLocation);
      }
    }, 900000);

    return () => {
      clearInterval(interval);
      ScreenOrientation.unlockAsync();
    };
  }, [isFocused, hasFetchedInitialData, userLocation]);

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
      {/* <ImageBackground
        source={require("../assets/nemomnew.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={{ opacity: 1 }} // optional: makes it soft/faded
      > */}
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        {/* { backgroundColor: 'rgba(255,255,255,0.85)' } */}

        <>

          <View style={styles.headerContainer}>
            <Text style={styles.header}>Clusters</Text>
          </View>

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} scrollEnabled={!nearbyLoading && initialLocationLoaded}>
            {clusterLoading ? (
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

            <Text style={styles.allNearbyDevicesHeading}>Nearby Device Readings</Text>

            <View style={styles.userLocationSection}>
              <View style={styles.locationLineLeft}>
                <Text style={styles.userLocationHeading}>
                  <Icon name="location" size={15} color="#810541" /> Your Location
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
              <View style={styles.refreshButtonContainer}>
                <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
                  <Icon name="refresh" size={24} color="#810541" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.loadingWrapper}>
              {(!initialLocationLoaded || nearbyLoading) ? (
                // 🔹 Show background image only during fetching
                
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {!initialLocationLoaded ? (
                      <Text style={styles.loadingText}>
                        Fetching your location...
                      </Text>
                    ) : (
                      <Loading />
                    )}
                  </View>
                
              ) : uniqueNearbyDevices.length > 0 ? (
                // 🔹 Normal white section after data fetched
                <View style={[styles.deviceCardsGrid, { backgroundColor: "#fff" }]}>
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
                // 🔹 Show "no nearby devices" message (white background)
                <View style={[styles.emptyCard, { backgroundColor: "#fff" }]}>
                  <Text style={styles.emptyMessage}>Look's like you,re bit far . no devices found near current loaction</Text>
                </View>
              )}
            </View>


          </ScrollView>

          <Footer />
        </>
      </View>
      {/* </ImageBackground> */}
    </SafeScreen>
  );

};

export default Cluster;