import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Icfosslogo } from "../Components/Icfosslogo/icfosslogo";
import { Otpfield } from "./componenets/Otpfield/Otpfield";
import { styles } from "./Otp.style";
import Logo from "../Components/logo/logo";


export const Otp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const submitOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "OTP submitted successfully");
      setOtp("");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Logo />
          <View>
            <Otpfield otp={otp} setOtp={setOtp} />
          </View>
          <View style={styles.button_view}>
            <TouchableOpacity style={styles.button} onPress={submitOtp}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logo}>
            <Icfosslogo />
          </View>
        </>
      )}
    </View>
  );
};
