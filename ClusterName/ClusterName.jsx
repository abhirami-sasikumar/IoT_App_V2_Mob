import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import Footer from "../Components/Footer/Footer";
import LongCard from "./components/LongCard/LongCard";
import styles from "./ClusterName.style";
import API from "../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClusterName = () => {
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId");

        if (!token || !userId) {
          setError("Missing authentication credentials.");
          setLoading(false);
          return;
        }

        const response = await API.get(`/get_clusters/${userId}`);
        setClusters(response.data.clusters || []);
      } catch (err) {
        console.error("Error fetching clusters:", err.response?.data || err.message);
        setError("Failed to fetch clusters.");
      } finally {
        setLoading(false);
      }
    };

    fetchClusters();
  }, []);

  return (
    <View style={localStyles.screen}>
      <Text style={styles.header}>CLUSTERS</Text>

      <View style={localStyles.contentWrapper}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            {clusters.length > 0 ? (
              clusters.map((cluster) => (
                <LongCard
                  key={cluster._id}
                  clusterName={cluster.clusterName}
                  clusterId={cluster._id}
                />
              ))
            ) : (
              <Text>No clusters found.</Text>
            )}
          </ScrollView>
        )}
      </View>

      <Footer />
    </View>
  );
};

export default ClusterName;

const localStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
