import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import styles from "./SignupFields.style"; // Import styles

const SignupField = () => {
  const [Name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ClusterID, setClusterID]=useState("");

  const handleSubmit = () => {
    console.log("Login clicked with:", { email, password });
  };

  return (
    <View style={styles.view}>
      {/* Name */}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name" // Change placeholder to "Enter Name"
          value={Name} // Change value to name state variable
          onChangeText={setName} // Update name state instead of email
          autoCapitalize="words" // Capitalize the first letter of each word
          autoCorrect={false}
          />
      </View>
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

export default SignupField;



