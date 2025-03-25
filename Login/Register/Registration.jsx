import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./Registration.style";
import { useNavigation } from "@react-navigation/native";

const Registration = () => {
  // const nav = useNavigation();

  return (
    <View style={styles.view}>
      <Text style={styles.Text}>Not a registered user? </Text>
      <TouchableOpacity onPress={() => nav.navigate("SignUp")}>
        <Text style={styles.TextHighlight}>Register Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registration;