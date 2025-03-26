import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import styles from "./SignupFields.style"; // Import styles

const SignupField = () => {
  const [Name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    console.log("Signup clicked with:", { Name, email, password, Confirmpassword });
  };

  return (
    <>
      <View style={styles.view}>

        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={Name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          fontFamily="Roboto"
        />



        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            value={Confirmpassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            fontFamily="Roboto"
          />
        </View>
      </View>



      <View style={styles.button_view}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>SIGNUP</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignupField;
