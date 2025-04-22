import Signupfield from "./components/SignupFields/SignupFields";
import Registration from "./components/Registered/Registered";
import { Icfosslogo } from "../Components/Icfosslogo/Icfosslogo";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              <Logo style={styles.logo} />
              <Signupfield loading={loading} setLoading={setLoading} />
              <Registration />
              <Icfosslogo />
            </>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
