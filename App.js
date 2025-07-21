import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { ActivityIndicator, View } from 'react-native';
import API from './Api'; // Axios instance

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

  // Check backend maintenance status
 useEffect(() => {
  const checkMaintenance = async () => {
    try {
      // console.log(" Checking maintenance status...");
      const res = await API.get("/maintenance_status");
      // console.log("API Response:", res.data);

      if (res.data?.maintenance === true) {
        setIsUnderMaintenance(true);
        // console.log(" App is under maintenance.");
      } else {
        setIsUnderMaintenance(false);
        // console.log(" App is available.");
      }
    } catch (err) {
      // console.error(" Maintenance check failed:", err.message);
      setIsUnderMaintenance(false); // fallback to normal app
    } finally {
      setLoading(false);
    }
  };

  checkMaintenance();
}, []);


  // While loading fonts or maintenance check
  if (!isFontLoaded || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Show maintenance screen if backend says so
  if (isUnderMaintenance) {
    return <UnderMaintenance />;
  }

  // Normal app
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