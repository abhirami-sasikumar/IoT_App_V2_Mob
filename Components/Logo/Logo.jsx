import logo from "./../../assets/AppIcon(1).png";
import { Image, View } from "react-native";
import styles from "./Logo.style";
const Logo = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

export default Logo;