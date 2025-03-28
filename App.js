import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Signup/Signup';  // Import your signup screen
import {Otp} from './Otp/Otp';
import Login from './Login/Login';
import ClusterName from './ClusterName/ClusterName';
import Parameters from './ParameterScreen/Parameters';
import LocationScreen from './LocationScreen/Location';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ClusterName" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ClusterName" component={ClusterName} />
        <Stack.Screen name="Parameters" component={Parameters} />
        <Stack.Screen name="Location" component={LocationScreen} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
