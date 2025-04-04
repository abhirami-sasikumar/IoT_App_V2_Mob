
import React from "react";
import { View, Text, Switch,TouchableOpacity } from "react-native";
import styles from "./ForgotAndReset.style";

const ForgotAndReset = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => nav.navigate("forgotPassword")}>
        <Text style={styles.Text}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotAndReset;

