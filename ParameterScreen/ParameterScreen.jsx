import React from "react";
import { View, ScrollView } from "react-native";
import Footer from "../Components/Footer/Footer";
import LongCard from "./componenets/LongCard/LongCard"; // Ensure correct import path
import styles from "./ParameterScreen.style";
import Header from "../Components/Header/Header";

const ParameterName = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <Header title="Parameters" styles={styles.header} />

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <LongCard ParameterName="Parameter 1" />
                    <LongCard ParameterName="Parameter 2" />
                    <LongCard ParameterName="Parameter 3" />
                    <LongCard ParameterName="Parameter 4" />
                    <LongCard ParameterName="Parameter 5" />
                    <LongCard ParameterName="Parameter 6" />
                    <LongCard ParameterName="Parameter 7" />
                    <LongCard ParameterName="Parameter 8" />
                    <LongCard ParameterName="Parameter 9" />
                    <LongCard ParameterName="Parameter 10" />
                </View>
            </ScrollView>

            {/* Footer Always at Bottom */}
            <View style={styles.footerContainer}>
                <Footer />
            </View>
        </View>
    );
};

export default ParameterName;
