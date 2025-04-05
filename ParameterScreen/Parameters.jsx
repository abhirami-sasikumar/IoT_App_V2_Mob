import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import LongCard from "./components/LongCard/LongCard";
import Loading from "../Components/Loading/Loading";
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
    // console.log("Fetching parameters for cluster ID:", clusterId);

    if (!clusterId) {
      setError("Cluster ID is missing.");
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchParameters = async () => {
      try {
        const response = await API.get(`/get_parameter/${clusterId}`);
        // console.log("Fetched Parameters:", response.data.parameters);

        if (isMounted) {
          setParameters(response.data.parameters || []);
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
      isMounted = false;
    };
  }, [clusterId]);

  // Filter unique parameters by parameterName
  const uniqueParameters = parameters.reduce((acc, parameter) => {
    if (!acc.some((p) => p.parameterName === parameter.parameterName)) {
      acc.push(parameter);
    }
    return acc;
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Parameters" styles={styles.header} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {loading ? (
            <Loading />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : uniqueParameters.length > 0 ? (
            uniqueParameters.map((parameter, index) => (
              <LongCard
                key={index}
                clusterId={clusterId}
                parameterName={parameter.parameterName}
              />
            ))
          ) : (
            <Text style={styles.noDataText}>No parameters found.</Text>
          )}
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

export default Parameters;
