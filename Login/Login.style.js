import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(),         // Responsive vertical padding
    paddingHorizontal: scale(20),          // Responsive horizontal padding
    backgroundColor: "#fff",               // Optional background
  },
});
