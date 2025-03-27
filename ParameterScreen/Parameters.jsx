import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Footer from "../Components/Footer/Footer";
import { LongCard } from "./components/LongCard/LongCard"; // Fix import
import styles from "./Parameters.style";
import API from "../Api";
import { useRoute } from "@react-navigation/native";

const Parameters = () => {
    const route = useRoute();
    const clusterId = route?.params?.clusterId;
    const [parameters, setParameters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Received Cluster ID:", clusterId);

        if (!clusterId) {
            setError("Cluster ID is missing.");
            setLoading(false);
            return;
        }

        const fetchParameters = async () => {
            try {
                const response = await API.get(`/getParameterByCluster/${clusterId}`);
                console.log("Fetched Parameters:", response.data.parameters);
                setParameters(response.data.parameters);
            } catch (err) {
                console.error("Error fetching parameters:", err);
                setError("Failed to fetch parameters.");
            } finally {
                setLoading(false);
            }
        };

        fetchParameters();
    }, [clusterId]);

    return (
        <View>
            <Text style={styles.header}>PARAMETERS</Text>

            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : error ? (
                    <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
                ) : parameters.length > 0 ? (
                    <View style={styles.content}>
                        {parameters.map((parameter, index) => (
                            <LongCard key={parameter._id || index} parameterName={parameter.parameterName} />
                        ))}
                    </View>
                ) : (
                    <Text>No parameters found.</Text>
                )}
            </View>

            <View style={styles.Footer}>
                <Footer />
            </View>
        </View>
    );
};

export default Parameters;
