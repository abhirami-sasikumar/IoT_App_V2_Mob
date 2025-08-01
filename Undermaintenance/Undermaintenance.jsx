import React, { useEffect } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { Icfosslogo } from '../Components/Icfosslogo/Icfosslogo';
import { WebView } from "react-native-webview";

const UnderMaintenance = () => {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp(); // Exit the app
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{
          html: `
            <html>
              <body style="margin:0;padding:0;">
                <img src="https://app.openiot.in/static/maintenance.gif"
                     style="width:100%;height:100%;object-fit:contain" />
              </body>
            </html>`
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
    backgroundColor: '#fff',
  },
  gif: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  icfosslogo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
});

export default UnderMaintenance;
