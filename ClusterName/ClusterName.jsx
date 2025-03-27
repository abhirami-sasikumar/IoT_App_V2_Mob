import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
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
    
                console.log("Stored Token:", token);
                console.log("Stored User ID:", userId);
    
                if (!token || !userId) {
                    setError("Missing authentication credentials.");
                    setLoading(false);
                    return;
                }
    
                const response = await API.get(`/get_clusters/${userId}`);
                console.log("Full API Response:", response);
                console.log("API Response Data:", response.data);
    
                if (response.data.clusters) {
                    console.log("Received Clusters:", response.data.clusters);
                } else {
                    console.log("Clusters key missing in response");
                }
    
                setClusters(response.data.clusters || []);
            } catch (err) {
                console.error("Error fetching clusters:", err.response ? err.response.data : err.message);
                setError("Failed to fetch clusters.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchClusters();
    }, []);
    
    return (
        <View>
            <Text style={styles.header}>CLUSTERS</Text>

            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : error ? (
                    <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
                ) : (
                    <View style={styles.content}>
                        {clusters.length > 0 ? (
    clusters.map((cluster) => (
  <LongCard key={cluster._id} clusterName={cluster.clusterName} clusterId={cluster._id} />
    ))
) : (
    <Text>No clusters found.</Text>
)}

                    </View>
                )}

                <View style={styles.Footer}>
                    <Footer />
                </View>
            </View>
        </View>
    );
};

export default ClusterName;
