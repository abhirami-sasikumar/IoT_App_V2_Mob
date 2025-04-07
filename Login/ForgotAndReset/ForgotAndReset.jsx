import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./ForgotAndReset.style";
import { useNavigation } from "@react-navigation/native";

const ForgotAndReset = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.text}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotAndReset;


