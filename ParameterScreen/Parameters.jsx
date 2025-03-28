import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import Footer from "../Components/Footer/Footer";
import { LongCard } from "./components/LongCard/LongCard";
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
        console.log("Fetching parameters for cluster ID:", clusterId);

        if (!clusterId) {
            setError("Cluster ID is missing.");
            setLoading(false);
            return;
        }

        let isMounted = true; // Prevent memory leaks

        const fetchParameters = async () => {
            try {
                const response = await API.get(`/get_parameter/${clusterId}`);
                console.log("Fetched Parameters:", response.data.parameters);

                if (isMounted) {
                    setParameters(response.data.parameters);
                    setError(null);
                }
            } catch (err) {
                console.error("Error fetching parameters:", err.response?.data || err.message);
                if (isMounted) setError("Failed to fetch parameters.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchParameters();

        return () => {
            isMounted = false; // Cleanup to prevent memory leaks
        };
    }, [clusterId]);

    // Filter out duplicate parameter names
    const uniqueParameters = parameters.reduce((acc, parameter) => {
        if (!acc.some((p) => p.parameterName === parameter.parameterName)) {
            acc.push(parameter);
        }
        return acc;
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>PARAMETERS</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : uniqueParameters.length > 0 ? (
                <ScrollView style={styles.content}>
                    {uniqueParameters.map((parameter, index) => (
                        <LongCard
                            key={index}
                            clusterId={clusterId}
                            parameterName={parameter.parameterName}
                        />
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.noDataText}>No parameters found.</Text>
            )}

        </View>
    );
};

export default Parameters;
