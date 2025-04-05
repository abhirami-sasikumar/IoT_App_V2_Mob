import React from "react";
import { View, Text, ScrollView } from "react-native";// Import scaling
import LocationCard from "./components/LocationCard/LocationCard"
import {styles} from "./LocationScreen.style";
import Header from "../Components/Header/Header";


const LocationScreen = () => {
    return (
        <View style={styles.screen}>
            {/* Page Title */}
            <Header title="Temperature"  />

            

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
           
        </View>
    );
};

export default LocationScreen;
