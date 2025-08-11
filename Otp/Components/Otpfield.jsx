import { View, TextInput } from "react-native";
import styles from "./Otpfield.style";
import SafeScreen from "../../Components/SafeArea/SafeArea";

export const Otpfield = ({ otp, setOtp }) => {
  return (
    <SafeScreen>
    <View style={styles.view}>
      <TextInput
        style={styles.input}
        placeholder="Email OTP"
        value={otp}
        onChangeText={setOtp}
        autoCorrect={false}
      />
    </View>
     </SafeScreen>
  );
};