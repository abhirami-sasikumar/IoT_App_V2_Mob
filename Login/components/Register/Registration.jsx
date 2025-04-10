import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./Registration.style";
import { useNavigation } from "@react-navigation/native";

const Registration = () => {
  const nav = useNavigation();

  const handleSubmit = () => {
    nav.navigate("Signup"); // make sure your stack has a route named "Signup"
  };

  return (
    <View style={styles.view}>
      <View style={styles.button_view}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create new account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Registration;
