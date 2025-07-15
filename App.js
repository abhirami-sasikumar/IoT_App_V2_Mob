import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';
enableScreens();

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
import { SafeAreaView } from 'react-native';

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

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <StatusBar />
      {isFontLoaded && (
        <NavigationContainer theme={navTheme}>
          <SafeAreaProvider>
              <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right', // Native transition
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
                <Stack.Screen name="About" component={About}/>
              </Stack.Navigator>

          </SafeAreaProvider>
        </NavigationContainer>
      )
      }
    </UserContext.Provider >
  );
}
