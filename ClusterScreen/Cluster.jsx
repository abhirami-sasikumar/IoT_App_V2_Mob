import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import Footer from "../Components/Footer/Footer";
import LongCard from "./components/LongCard/LongCard";
import styles from "./Cluster.style";
import API from "../Api";
import { UserContext } from "../Components/Context/Context";
import * as ScreenOrientation from "expo-screen-orientation";
import Loading from "../Components/Loading/Loading";
import SafeScreen from "../Components/SafeArea/SafeArea";
import * as Location from 'expo-location';
import { Alert } from 'react-native';

const Cluster = () => {
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext);

  // Separate fetch function so it can be reused
  const fetchClusters = async () => {
    try {
      if (!user.jwtToken || !user.userId) {
        setError("Missing user credentials.");
        setLoading(false);
        return;
      }

      const response = await API.get(`/get_clusters/${user.userId}`);
      setClusters(response.data.clusters || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching clusters:", err.message);
      setError("Failed to fetch clusters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };

    lockOrientation();
    fetchClusters();

    // Set interval for polling
    const interval = setInterval(() => {
      fetchClusters();
    }, 900000); // fetch every 5 seconds

    // Cleanup interval and lock orientation on unmount
    return () => {
      clearInterval(interval);
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, [user]);

  return (
    <SafeScreen>

    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.header1}>
            <Text style={styles.header}>CLUSTERS</Text>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            {error ? (
              <Text>{error}</Text>
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
          </ScrollView>

          <Footer />
        </>
      )}
    </View>
    </SafeScreen>
  );
};

export default Cluster;
