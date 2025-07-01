// DeleteAccount.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const openDeleteAccountPage = () => {
  Linking.openURL("https://devapp.v2.openiot.in/api/deleteurl");
};


const DeleteAccount = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Delete Your Account</Text>

      <Text style={styles.text}>
        To delete your account and all associated data:
      </Text>

      <Text style={styles.list}>1. Open the app</Text>
      <Text style={styles.list}>2. Go to: Profile → Settings → Delete Account</Text>

      <Text style={styles.text}>
        If you can't access the app, email us at
        <Text style={styles.email}> cdohapps@icfoss.org</Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  list: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
  },
  email: {
    fontWeight: 'bold',
  },
});

export default DeleteAccount;