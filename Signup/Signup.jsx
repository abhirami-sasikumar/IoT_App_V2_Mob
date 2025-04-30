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

  const [loading, setLoading] = useState(false);

  return (
    <SafeScreen>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {loading ? (
            <Loading />
          ) : (
            <>
             <ScrollView style={styles.field}           keyboardShouldPersistTaps="handled"
         
              >
              <Logo style={styles.logo} />
             
                <Signupfield   loading={loading} setLoading={setLoading} />
              </ScrollView>
              <View style={styles.login}>
                <Registration />
              </View>
              <View style={styles.footer}>
                    <Icfosslogo />
              </View>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </SafeScreen>
  );
};
