import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icfosslogo } from '../Components/Icfosslogo/Icfosslogo';

const UnderMaintenance = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>
                We are sorry.{"\n"}Unfortunately, the app is under Maintenance.
            </Text>
            <View style={styles.icfosslogo}>
                <Icfosslogo />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    message: {
        fontSize: 20,
        color: '#333',
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 28, // ensures spacing between lines
    },
    icfosslogo:{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: "center",
      backgroundColor: "#fff",
      
      
      
  
    },
});

export default UnderMaintenance;
