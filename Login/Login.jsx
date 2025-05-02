import React, { useState, useEffect, useContext } from "react";
import { View,KeyboardAvoidingView,Keyboard,Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";

import SafeScreen from "../Components/SafeArea/SafeArea";
import Logo from "../Components/Logo/Logo";
import ForgotAndReset from "./components/ForgotAndReset/ForgotAndReset";
import LoginField from "./components/Loginfield/Loginfield";
import Register from "./components/Register/Registration";
import { Icfosslogo } from "../Components/Icfosslogo/Icfosslogo";
import Loading from "../Components/Loading/Loading"; 
import { styles } from "./Login.style";


import { UserContext } from "../Components/Context/Context";
import API from "../Api"; 

const Login = () => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useContext(UserContext);
  const nav = useNavigation();

  const getUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const res = await API.post("/refresh_token");


        const data = res.data;
        const updatedUser = {
          jwtToken: data.jwtToken,
          email: data.email,
          name: data.name,
          userId: data._id, // Make sure your backend returns _id
        };
        
        await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        console.log("Storing user in AsyncStorage:", updatedUser);

        
        nav.replace("Clusters");
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Token refresh failed:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };

    lockOrientation();
    getUser();

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  return (

    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
        <View style={styles.logo}>
          <Logo /> 
        </View>
        <View style={styles.loginfield}>
          <LoginField loading={loading} setLoading={setLoading} />
        </View>
        <View style={styles.forgotandreset}>
        <ForgotAndReset />
        </View>
        <View style={styles.register}>
        <Register />

        </View>
        <View style={styles.icfosslogo}>
        <Icfosslogo />

        </View>          

          
        
          
        </>
      )}
    </View>
  
  );
};

export default Login;