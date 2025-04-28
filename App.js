import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

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
import ForgotAndReset from './Login/components/ForgotAndReset/ForgotAndReset.jsx'


import ProfilePage from './Components/Profile/Profile/ProfilePage.jsx';
import ChangePassword from "./Components/Profile/ChangePassword/ChangePassword.jsx";
import Logout from "./Components/Profile/Logout/Logout.jsx";
import ClusterRequest from "./Components/Profile/ClusterRequest/ClusterRequest.jsx";
import DeleteAccount from "./Components/Profile/DeleteAccount/DeleteAccount.jsx";


const Stack = createStackNavigator();

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
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.FadeFromBottomAndroid, // You can change this to others like FadeFromBottomAndroid


             // disables all screen transition animations
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

              </Stack.Navigator>
            </SafeAreaView>
          </SafeAreaProvider>
        </NavigationContainer>
      )}
    </UserContext.Provider>
  );
}
