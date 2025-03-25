
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./ForgotAndReset.style";

const ForgotAndReset = () => {
  return (
    <View style={styles.view}>
      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotAndReset;

