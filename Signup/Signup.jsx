import  Signupfield  from "./components/SignupFields/SignupFields";
import Registration from "./components/Registered/Registered";
import { Icfosslogo } from "../Components/Icfosslogo/Icfosslogo";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./Signup.style";
import Loading from "../Components/Loading/Loading";
import * as ScreenOrientation from "expo-screen-orientation";
import Logo from "../Components/Logo/Logo";

export const Signup = () => {
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

  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Logo />
          <Signupfield loading={loading} setLoading={setLoading} />
          <Registration />
          <Icfosslogo />
        </>
      )}
    </View>
  );
};