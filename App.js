import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from "./Components/Context/Context";

import {Signup} from './Signup/Signup';  
import { Otp } from './Otp/Otp';
import Login from './Login/Login';
import Cluster from './ClusterScreen/Cluster';
import Parameters from './ParameterScreen/Parameters';
import LocationScreen from './LocationScreen/Location';
import ChartComponent from './Chart/ChartComponent';

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState({
    jwtToken: "",
    email: "",
    name: "",
    userId: "", 
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Clusters" component={Cluster} />
          <Stack.Screen name="Parameters" component={Parameters} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="Chart" component={ChartComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
