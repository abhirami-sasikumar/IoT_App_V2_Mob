import React from "react";
import { View, Text, ScrollView } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters"; // Import scaling
import Footer from "../Components/Footer/Footer";
import { LocationCard } from "./Components/LocationCard/LocationCard";
import styles from "./LocationScreen.style";

const LocationScreen = () => {
    return (
        <View style={styles.screen}>
            {/* Page Title */}
            <Text style={styles.header}>Parameter</Text>

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    <View style={styles.cardContainer}>
                        <LocationCard LocationName="Cluster 1" Value="27" Measurement="°C" />
                        <LocationCard LocationName="Cluster 2" Value="30" Measurement="°C" />
                        <LocationCard LocationName="Cluster 3" Value="25" Measurement="°C" />
                    </View>
                </View>
            </ScrollView>

            {/* Footer (Positioned Correctly) */}
            <View style={styles.footerContainer}>
                <Footer />
            </View>
        </View>
    );
};

export default LocationScreen;
