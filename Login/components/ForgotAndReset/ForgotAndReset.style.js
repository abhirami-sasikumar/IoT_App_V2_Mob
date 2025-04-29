import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", // added for better centering
    paddingHorizontal: scale(9),
    paddingVertical: verticalScale(10),
  },
  text: {
    fontSize: scale(16),
    fontFamily: "Roboto",
    marginBottom: verticalScale(20),
    textAlign: "center",
    marginTop: verticalScale(1),
  },
});

export default styles;
