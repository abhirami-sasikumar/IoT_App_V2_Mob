import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { ActivityIndicator, View, Alert, Linking } from 'react-native';
// Removed: import VersionCheck from 'react-native-version-check'; // No longer used, using Constants.expoConfig.version
import API from './Api'; // Axios instance
import Constants from 'expo-constants'; // Correct import for Constants

// Enable screen optimization
enableScreens();

// Context
import { UserContext } from "./Components/Context/Context";

// Screens
import { Signup } from './Signup/Signup';
import { Otp } from './Otp/Otp';
import Login from './Login/Login';
import Cluster from './ClusterScreen/Cluster';
import Parameters from './ParameterScreen/Parameters';
import LocationScreen from './LocationScreen/Location';
import ChartComponent from './Chart/ChartComponent';

import ForgotPassword from './ForgotPassword/ForgotPassword';
import ResetOtp from './ForgotPassword/componenets/Otp/Otp';
import ForgotAndReset from './Login/components/ForgotAndReset/ForgotAndReset.jsx';
import ProfilePage from './Components/Profile/Profile/ProfilePage.jsx';
import ChangePassword from "./Components/Profile/ChangePassword/ChangePassword.jsx";
import Logout from "./Components/Profile/Logout/Logout.jsx";
import ClusterRequest from "./Components/Profile/ClusterRequest/ClusterRequest.jsx";
import About from './Components/Profile/About/About';
import DeleteAccount from "./Components/Profile/DeleteAccount/DeleteAccount.jsx";
import UnderMaintenance from './Undermaintance/Undermaintance';
import { navigationRef } from './LocationScreen/NavigationHelper/NavigationHelper';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({
    jwtToken: "",
    email: "",
    name: "",
    userId: "",
  });

  const [isFontLoaded] = useFonts({
    "Roboto": require('./assets/fonts/Roboto-Regular.ttf'),
  });

  const [loading, setLoading] = useState(true);
  const [isUnderMaintenance, setIsUnderMaintenance] = useState(null); // null = unknown

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };

  // Version check function - This function will be called only once on app launch
  const checkAppUpdate = async () => {
    try {
      const currentVersion = Constants.expoConfig.version;
      const res = await API.get('/get-version');
      const latestVersion = res.data.version;

      // console.log('Current Version:', currentVersion);
      // console.log('Latest Version:', latestVersion);

      if (currentVersion !== latestVersion) {
        Alert.alert(
          'Update Available',
          `A new version (${latestVersion}) is available.`,
          [
            {
              text: 'Update',
              onPress: () => {
                Linking.openURL('https://play.google.com/store/apps/details?id=com.icfoss.iotapp'); // Replace with your app's store URL
              },
            },
            { text: 'Later', style: 'cancel' },
          ]
        );
      }
    } catch (err) {
      // console.warn('Version check failed:', err.message, err.response?.data);
    }
  };

  // EFFECT 1: Runs ONLY ONCE on component mount for initial maintenance check and one-time version check
  useEffect(() => {
    const initialLoadCheck = async () => {
      try {
        const res = await API.get("/maintenance_status");
        if (res.data?.maintenance === true) {
          setIsUnderMaintenance(true);
        } else {
          setIsUnderMaintenance(false);
          await checkAppUpdate(); // Call version check ONLY HERE, once at app startup
        }
      } catch (err) {
        console.error("Initial maintenance/version check failed:", err.message, err.response?.data);
        setIsUnderMaintenance(false); // Fallback to normal app if initial check fails
      } finally {
        setLoading(false);
      }
    };

    initialLoadCheck(); // Execute the initial check
  }, []); // Empty dependency array means this effect runs ONLY ONCE

// EFFECT 2: Live check every 5 seconds
useEffect(() => {
  const checkMaintenanceStatusPeriodically = async () => {
    try {
      const res = await API.get("/maintenance_status");
      const isMaintenance = res.data?.maintenance === true;

      // if app is not already on UnderMaintenance page, navigate
      if (isMaintenance && !isUnderMaintenance) {
        setIsUnderMaintenance(true);
      } else if (!isMaintenance && isUnderMaintenance) {
        setIsUnderMaintenance(false); // In case maintenance is turned off
      }

    } catch (err) {
      // If server is down, assume maintenance
      console.error("Maintenance check failed, assuming maintenance mode");
      setIsUnderMaintenance(true);
    }
  };

  const intervalId = setInterval(checkMaintenanceStatusPeriodically, 5000);
  return () => clearInterval(intervalId);
}, [isUnderMaintenance]);

  if (!isFontLoaded || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isUnderMaintenance) {
    return <UnderMaintenance />;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <StatusBar />
      <NavigationContainer theme={navTheme} ref={navigationRef}>
        <SafeAreaProvider>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Otp" component={Otp} />
            <Stack.Screen name="ForgotAndReset" component={ForgotAndReset} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ForgotAndReset} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="forgotpassword" component={ForgotPassword} />
            <Stack.Screen name="resetotp" component={ResetOtp} />
            <Stack.Screen name="Clusters" component={Cluster} />
            <Stack.Screen name="Parameters" component={Parameters} />
            <Stack.Screen name="Location" component={LocationScreen} />
            <Stack.Screen name="Chart" component={ChartComponent} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="ClusterRequest" component={ClusterRequest} />
            <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
            <Stack.Screen name="Logout" component={Logout} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="UnderMaintenance" component={UnderMaintenance} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </UserContext.Provider>
  );
}