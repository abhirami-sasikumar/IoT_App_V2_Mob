import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Signup/Signup';  // Import your signup screen
import {Otp} from './Otp/Otp';
import Login from './Login/Login';
import ClusterName from './ClusterName/ClusterName';
import Parameters from './ParameterScreen/Parameters';
import ProfilePage from "./Components/Profile/ProfilePage";
import ChangePassword from "./Components/Profile/ChangePassword.jsx";
import Logout from "./Components/Profile/Logout.jsx";
import ClusterRequest from "./Components/Profile/ClusterRequest";
import DeleteAccount from "./Components/Profile/DeleteAccount";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ClusterName" component={ClusterName} />
        <Stack.Screen name="Parameters" component={Parameters} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ClusterRequest" component={ClusterRequest} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen name="Logout" component={Logout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
