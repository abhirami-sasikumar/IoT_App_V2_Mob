import React from "react";
import { View, Text } from "react-native";
import Footer from "../Components/Footer/Footer";
import LongCard from "./components/LongCard/LongCard"; // Ensure correct import path
import styles from "./ClusterName.style";

const ClusterName = () => {
    return (
        <View >
            <Text style={styles.header}>CLUSTERS</Text>

            <View style={styles.container}>
                {/* Header with Title "Clusters" */}


                {/* List of LongCards (Static Names for Now) */}
                <View style={styles.content}>
                    <LongCard clusterName="Cluster 1" />
                    <LongCard clusterName="Cluster 2" />
                    <LongCard clusterName="Cluster 3" />
                   

                </View>

                {/* Footer */}
                <View style={styles.Footer}>
                    <Footer />
                </View>
            </View>
        </View>
    );
};

export default ClusterName;
