import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import styles from "./Loginfield.style"; // Import styles

const LoginField = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ClusterID, setClusterID]=useState("");

  const handleSubmit = () => {
    console.log("Login clicked with:", { email, password });
  };

  return (
    <View style={styles.view}>
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cluster ID"
          value={ClusterID}
          onChangeText={setClusterID}
          autoCorrect={false}
      />
      </View>

      {/* Login Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginField;



