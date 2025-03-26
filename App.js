import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
 import Login from './Login/Login';
import ClusterName from './ClusterName/ClusterName';
import SignUp from './Signup/Signup';

export default function App() {
  return (
    <View>
      <Login/>
      {/* <ClusterName/> */}
      {/* <SignUp/> */}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
