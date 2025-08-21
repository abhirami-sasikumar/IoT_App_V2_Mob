import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { memo } from "react";
import { Alert, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import API from "../Api";
import ParaCard from "./Components/ParaCard";
import Styles from "./nearbyScreen.style";
import SafeScreen from "../Components/SafeArea/SafeArea";
import Header from "../Components/Header/Header";
import { scale } from "react-native-size-matters";
import Loading from "../Components/Loading/Loading";
// import Icon from '../assets/icons/Icon';

const NearbyScreen = ({clusters}) => {
  const styles = Styles(); // No theme passed
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [paras, setParas] = useState([]);
  const navigation = useNavigation();
  // const route = useRoute();
  // const { clusters = [] } = route.params || {};


  console.log("Clusters from props:", clusters);

  // Fetch unique parameter list from all clusters
  const fetchParameters = async () => {
    const allParams = new Set();

    await Promise.all(
      clusters.map(async (cluster) => {
        try {
          const response = await API.get(`/get_parameter/${cluster._id}`);
          const params = response.data.parameters || [];
          params.forEach((p) => allParams.add(p.parameterName));
        } catch (err) {
          console.warn(`Failed to fetch params for cluster ${cluster._id}`);
        }
      })
    );

    setParas([...allParams]);
  };

  // Get current GPS location + place name
  const getCurrentLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      Alert.alert("Permission to access location was denied");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    const coords = currentLocation.coords;
    setLocation(coords);

    const placemarks = await Location.reverseGeocodeAsync({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    if (placemarks.length > 0) {
      const place = placemarks[0];
      console.log(place);
      
      const name = [place.name, place.district, place.city]
        .filter(Boolean)
        .join(", ");
      console.log(name)
      setLocationName(name);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCurrentLocation();
    fetchParameters();

    const interval = setInterval(() => {
      fetchParameters();
    }, 5000);

    return () => clearInterval(interval);
  }, [clusters]);

  return (
    <SafeScreen>
      <View style={styles.container}>
        <View style={styles.header1}>
          <Header title={"NEARBY DEVICES"} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.toggleButtonContainer}>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => navigation.goBack()}
            >
              {/* Uncomment if you want to use an Icon */}
              {/* <Icon name="grid-outline" size={scale(22)} /> */}
            </TouchableOpacity>
          </View>

          {location ? (
            <>
              <View style={styles.locationContainer}>
                <Text style={styles.yourLocationText}> Your Location</Text>
                <Text style={styles.coordinateText}>{locationName}</Text>
                {/* <Text style={styles.coordinateText}>
                  Latitude: {location.latitude.toFixed(5)}
                </Text>
                <Text style={styles.coordinateText}>
                  Longitude: {location.longitude.toFixed(5)}
                </Text> */}
              </View>

              {paras.length > 0 ? (
                <>
                  {paras.map((para, index) => (
                    <ParaCard
                      key={index}
                      clusters={clusters}
                      para={para}
                      lat={location.latitude}
                      lng={location.longitude}
                    />
                  ))}
                </>
              ) : (
                <Text style={{ marginTop: 10 }}>
                  No parameters found for the selected clusters.
                </Text>
              )}
            </>
          ) : (
            <View>
              <Text style={styles.fetchingText}>Fetching Location...</Text>
              <View style={styles.loadingCircle}>
                {loading && <Loading />}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

export default memo(NearbyScreen);
