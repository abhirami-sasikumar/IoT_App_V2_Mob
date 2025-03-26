import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import styles from "./Loginfield.style"; // Import styles

const LoginField = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [ClusterID, setClusterID] = useState("");

  const handleSubmit = () => {
    console.log("Login clicked with:", { email, password });
  };

  return (
    
    <>
      <View style={styles.view}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {/* <Icon name={showPassword ? "eye" : "eye-off"} size={24} color="grey" /> */}
          </TouchableOpacity>

        </View>
        <View style={styles.cluster}>
          <TextInput
            style={styles.Cluster}
            placeholder="ClusterID"
            value={ClusterID}
            onChangeText={setEmail}
            keyboardType="ClusterID"
            autoCapitalize="none"
            autoCorrect={false}
          />
          </View>
        </View>

        <View style={styles.button_view}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </>
      );
};



      export default LoginField;



