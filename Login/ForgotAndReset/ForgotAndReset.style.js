import { StyleSheet } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "right",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(40),
  },

  Text: {
    fontSize: scale(15),
    fontFamily:"Roboto",
  },
});
export default styles;