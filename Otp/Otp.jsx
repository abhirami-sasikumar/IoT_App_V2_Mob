import React, { useState } from "react";
import { View, Text, Alert, Pressable } from "react-native";
import { Icfosslogo } from "../Components/Icfosslogo/Icfosslogo";
import Otpfield from "./componenets/Otpfield/Otpfield";
import { styles } from "./Otp.style";
import Logo from "../Components/logo/logo";
// import Loading from "../Components/Loading./Loading";

 const Otp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const submitOtp = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (otp === "123456") {
        Alert.alert("Success", "OTP verified successfully!");
      } else {
        Alert.alert("Error", "Invalid OTP. Try again.");
        setOtp("");
      }
    }, 1000); // Simulate network delay
  };

  return (
    <View style={styles.container}>
      <>
        <Logo />
        <View>
          <Otpfield otp={otp} setOtp={setOtp} />
        </View>
        <View style={styles.button_view}>
          <Pressable style={styles.button} onPress={submitOtp}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </Pressable>
        </View>
        <View style={styles.logo}>
          <Icfosslogo />
        </View>
      </>
    </View>
  );
};
export default Otp;