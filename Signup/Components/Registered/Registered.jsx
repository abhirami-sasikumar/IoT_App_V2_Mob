import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./Registered.style";
import { useNavigation } from "@react-navigation/native";

const Registration = () => {
  // const nav = useNavigation();

  return (
    <View style={styles.view}>
      <Text style={styles.Text}>Already registered user? </Text>
      <TouchableOpacity onPress={() => nav.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })}>
        <Text style={styles.TextHighlight}>Login Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registration;
