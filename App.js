import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { ActivityIndicator, View, Alert, Linking, AppState } from 'react-native';
import API from './Api';
import Constants from 'expo-constants';
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

// ✅ Maintenance Gate with AppState
const MaintenanceGate = ({ setIsUnderMaintenance, children }) => {
  const appState = useRef(AppState.currentState);
  const intervalRef = useRef(null);

  const startMaintenanceCheck = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(async () => {
      try {
        const res = await API.get("/maintenance_status");
        setIsUnderMaintenance(res.data?.maintenance === true);
      } catch (err) {
        console.error("Maintenance check failed:", err.message);
      }
    }, 5000);
  };

  const stopMaintenanceCheck = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        startMaintenanceCheck();
      } else if (nextAppState.match(/inactive|background/)) {
        stopMaintenanceCheck();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    // Start initially if app is active
    if (appState.current === 'active') {
      startMaintenanceCheck();
    }

    return () => {
      subscription.remove();
      stopMaintenanceCheck();
    };
  }, []);

  return children;
};

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
  const [isUnderMaintenance, setIsUnderMaintenance] = useState(null);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };

  const checkAppUpdate = async () => {
    try {
      const currentVersion = Constants.expoConfig.version;
      const res = await API.get('/get-version');
      const latestVersion = res.data.version;

      if (currentVersion !== latestVersion) {
        Alert.alert(
          'Update Available',
          `A new version (${latestVersion}) is available.`,
          [
            {
              text: 'Update',
              onPress: () => {
                Linking.openURL('https://play.google.com/store/apps/details?id=com.icfoss.iotapp');
              },
            },
            { text: 'Later', style: 'cancel' },
          ]
        );
      }
    } catch (err) {
      // Silent fail
    }
  };

  useEffect(() => {
    const initialLoadCheck = async () => {
      try {
        const res = await API.get("/maintenance_status");
        if (res.data?.maintenance === true) {
          setIsUnderMaintenance(true);
        } else {
          setIsUnderMaintenance(false);
          await checkAppUpdate();
        }
      } catch (err) {
        console.error("Initial maintenance/version check failed:", err.message);
        setIsUnderMaintenance(false);
      } finally {
        setLoading(false);
      }
    };
    initialLoadCheck();
  }, []);

  if (!isFontLoaded || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <MaintenanceGate setIsUnderMaintenance={setIsUnderMaintenance}>
        {isUnderMaintenance ? (
          <UnderMaintenance />
        ) : (
          <>
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
          </>
        )}
      </MaintenanceGate>
    </UserContext.Provider>
  );
}
