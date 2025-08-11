import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import API from "../Api";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Otpfield } from "./Components/Otpfield";
import { Icfosslogo } from "../Components/Icfosslogo/Icfosslogo";
import Logo from "../Components/Logo/Logo";
import Loading from "../Components/Loading/Loading";
import { styles } from "./Otp.style";
import * as ScreenOrientation from "expo-screen-orientation";
import { Keyboard } from "react-native";
import SafeScreen from "../Components/SafeArea/SafeArea";


export const Otp = ({ route }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const email = route?.params?.email;
  const clusterCode = route?.params?.clusterID;
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });
  
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  
  // Lock screen orientation to portrait
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
    lockOrientation();

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  const submitOtp = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/validate_otp", { email, otp, clustersCode: clusterCode });

      Alert.alert("Success", response.data.message, [
        {
          text: "OK",
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          },
        },
      ]);
    } catch (error) {
      Alert.alert("OTP Verification Failed", error.response?.data?.message || "Try again.");
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

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

          <View style={styles.otpfield}>
            <Otpfield otp={otp} setOtp={setOtp} />
          </View>
          <View style={styles.button_view}>
            <TouchableOpacity style={styles.button} onPress={submitOtp}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>

          {!keyboardVisible && (
            <View style={styles.icfosslogo}>
              <Icfosslogo />
            </View>
          )}
        </>
      )}
    </View>
    </SafeScreen>
  );
};
