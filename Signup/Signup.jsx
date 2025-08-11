import Signupfield from "./components/SignupFields/SignupFields";
import Registration from "./components/Registered/Registered";
import { Icfosslogo } from "../Components/Icfosslogo/Icfosslogo";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  keyboardVisible,

  Keyboard
} from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./Signup.style";
import Loading from "../Components/Loading/Loading";
import * as ScreenOrientation from "expo-screen-orientation";
import Logo from "../Components/Logo/Logo";
import SafeScreen from "../Components/SafeArea/SafeArea";
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


  const [loading, setLoading] = useState(false);

  return (
    <SafeScreen>
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.logo}>
                  <Logo />
                </View>
                <Signupfield loading={loading} setLoading={setLoading} />
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          {!keyboardVisible && (
          <View style={styles.registration}>
            <Registration />
          </View>
          )}

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
