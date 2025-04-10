
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./ForgotAndReset.style";

const ForgotAndReset = () => {
  return (
    <>
      <View style={styles.screen}>
        <TouchableOpacity>
          <Text style={styles.text}>Forgotten Password?</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ForgotAndReset;

