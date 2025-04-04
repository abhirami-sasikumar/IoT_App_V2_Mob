import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";

// UI Components
import Logo from "../Components/Logo/Logo";
import ForgotAndReset from "./components/ForgotAndReset/ForgotAndReset";
import LoginField from "./components/Loginfield/Loginfield";
import Register from "./components/Register/Registration";
import { Icfosslogo } from "../Components/Icfosslogo/Icfosslogo";
import Loading from "../Components/Loading/Loading"; 
import { styles } from "./Login.style";

// Context and API
import { UserContext } from "../Components/Context/Context";
import API from "../Api"; 

const Login = () => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useContext(UserContext);
  const nav = useNavigation();

  const getUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser !== null) {
        const parsedUser = JSON.parse(storedUser);
        const res = await API.post("/refresh_token", {
          token: parsedUser.jwtToken,
        });

        const data = res.data;

        // Update AsyncStorage and Context
        await AsyncStorage.setItem("@user", JSON.stringify(data));
        setUser({
          jwtToken: data.jwtToken,
          email: data.email,
          name: data.name,
        });

        nav.replace("cluster");
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
          <Logo />
          <LoginField loading={loading} setLoading={setLoading} />
          <ForgotAndReset />
          <Register />
          <Icfosslogo />
        </>
      )}
    </View>
  );
};

export default Login;
