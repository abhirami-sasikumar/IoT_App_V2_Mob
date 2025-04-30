import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import LongCard from "./components/LongCard/LongCard";
import Loading from "../Components/Loading/Loading";
import styles from "./Parameters.style";
import API from "../Api";
import { useRoute } from "@react-navigation/native";
import SafeScreen from "../Components/SafeArea/SafeArea";

const Parameters = () => {
  const route = useRoute();
  const clusterId = route?.params?.clusterId;

  const [parameters, setParameters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchParameters = async () => {
    try {
      const response = await API.get(`/get_parameter/${clusterId}`);
      setParameters(response.data.parameters || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching parameters:", err.response?.data || err.message);
      setError("Failed to fetch parameters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!clusterId) {
      setError("Cluster ID is missing.");
      setLoading(false);
      return;
    }

    fetchParameters(); // initial fetch

    const interval = setInterval(() => {
      fetchParameters();
    }, 5000); // fetch every 5 seconds

    return () => {
      clearInterval(interval); // cleanup on unmount
    };
  }, [clusterId]);

  const uniqueParameters = parameters.reduce((acc, parameter) => {
    if (!acc.some((p) => p.parameterName === parameter.parameterName)) {
      acc.push(parameter);
    }
    return acc;
  }, []);

  return (
    <SafeScreen>
    <View style={styles.container}>
      <View style={styles.header1}>
        <Header title="PARAMETERS" style={styles.header} />
      </View>

      {loading ? (
        <Loading />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : uniqueParameters.length > 0 ? (
                uniqueParameters.map((parameter) => (
                  <LongCard
                    key={parameter._id || parameter.parameterName}
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
        </>
      )}
    </View>
    </SafeScreen>
  );
};

export default Parameters;
