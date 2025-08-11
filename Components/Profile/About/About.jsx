import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Linking
} from "react-native";
import { styles } from "./About.style";
import Footer from "../../Footer/Footer";
import SafeScreen from "../../SafeArea/SafeArea";

const About = () => {
    const [aboutText, setAboutText] = useState([]);

    useEffect(() => {
        // Splitting paragraphs for individual rendering
        const contentParagraphs = [
            
                "Welcome to OpenIoT live environmental Monitoring App",

                "This app, developed by CDOH Lab, ICFOSS, is designed to help everyday users access live environmental data for specific locations through connected IoT clusters.",

                "🌦️ What can you do with it?\nYou can monitor real-time environmental parameters like:\n\n🌡️ Temperature\n🌧️ Rainfall\n💧 Humidity\nAnd more…",

                "📍 You only see environmental information for the specific places (clusters) you have access to. This is not a forecast or predictive app — instead, it gives you current conditions from the ground.",

                "🛠️ Built for simplicity\nWhether you're a student, farmer, researcher, or just a curious user, this app gives you direct, fast, and readable environmental data from your selected cluster locations.",

                "🙌 About ICFOSS\nThe International Centre for Free and Open Source Software (ICFOSS) is an autonomous organization set up by the Government of Kerala, India. It has the combined mandate of popularizing Free and Open Source Software for universal use, consolidating early FOSS work done in Kerala, and networking with different nations, communities, and governments to collaboratively promote FOSS.",





            "📬 For questions, feedback, or support, reach us at:"
            ];

        setAboutText(contentParagraphs);
    }, []);

    const handleEmailPress = () => {
        Linking.openURL("mailto:cdohapps@icfoss.org");
    };

    return (
        <SafeScreen>
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentWrapper}>
                <Text style={styles.heading}>About Us</Text>

                {aboutText.map((paragraph, index) => (
                    <Text key={index} style={styles.bodyText}>
                        {paragraph}
                    </Text>
                ))}

                <TouchableOpacity onPress={handleEmailPress}>
                    <Text style={styles.emailText}>cdohapps@icfoss.org</Text>
                </TouchableOpacity>

                <Text style={styles.bodyText}>
                    Thank you for using Open IoT — bringing real weather data, directly to you.
                </Text>
            </ScrollView>

            <View style={styles.footerWrapper}>
                <Footer />
            </View>
        </View>
        </SafeScreen>
    );
};

export default About;
