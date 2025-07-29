import React, { useCallback } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { Icfosslogo } from '../Components/Icfosslogo/Icfosslogo';
import { WebView } from "react-native-webview";
import { useFocusEffect } from '@react-navigation/native';

const UnderMaintenance = () => {
  // Prevent back button from working on this screen
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Do nothing — block back navigation
        return true;
      };

      // Add listener
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Cleanup
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{
          html: `
            <html>
              <body style="margin:0;padding:0;">
                <img 
                  src="https://app.openiot.in/static/maintenance.gif"
                  style="width:100%;height:100%;object-fit:contain"
                />
              </body>
            </html>
          `
        }}
        style={styles.gif}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        scrollEnabled={false}
      />

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
    backgroundColor: '#fff',
  },
  gif: {
    width: 250,
    height: 250,
    backgroundColor: 'transparent',
  },
  icfosslogo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default UnderMaintenance;
