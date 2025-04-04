import { View, TextInput } from "react-native";
import styles from "./Otpfield.style";

export const Otpfield = ({ otp, setOtp }) => {
  return (
    <View style={styles.view}>
      <TextInput
        style={styles.input}
        placeholder="Email OTP"
        value={otp}
        onChangeText={setOtp}
        autoCorrect={false}
      />
    </View>
  );
};