import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Keyboard,
  Text
} from "react-native";
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
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [latestVersion, setLatestVersion] = useState("");

  useEffect(() => {
    let showSubscription;
    let hideSubscription;

    const initializeApp = async () => {
      // 1. Check app version immediately
      try {
        const res = await API.get("/get-version");
        setLatestVersion(res.data.version);
      } catch (error) {
        console.warn("Version check failed:", error);
        setLatestVersion("Unavailable");
      }

      // 2. Check for stored user and handle login
      try {
        const storedUser = await AsyncStorage.getItem("@user");
        if (storedUser) {
          const res = await API.post("/refresh_token");
          const data = res.data;
          const updatedUser = {
            jwtToken: data.jwtToken,
            email: data.email,
            name: data.name,
            userId: data._id,
          };
          await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          setLoading(false); // Set loading to false once all data is fetched
          nav.replace("Clusters");
        } else {
          setLoading(false); // No user found, so we're done loading
        }
      } catch (error) {
        console.error("Token refresh failed:", error.message);
        setLoading(false); // On any error, stop loading
      }
    };

    // 3. Set up keyboard listeners and orientation lock
    showSubscription = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    // 4. Run the initialization function
    initializeApp();

    // 5. Cleanup function
    return () => {
      if (showSubscription) showSubscription.remove();
      if (hideSubscription) hideSubscription.remove();
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeScreen>
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
            {!keyboardVisible && (
              <View style={styles.icfosslogo}>
                <Text style={styles.versionText}>
                  V {latestVersion}
                </Text>
                <Icfosslogo />
              </View>
            )}
          </>
        )}
      </View>
    </SafeScreen>
  );
};

export default Login;