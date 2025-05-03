import { StyleSheet } from "react-native";

import {
  scale,
  verticalScale,
  moderateVerticalScale,
} from "react-native-size-matters";

export const styles = StyleSheet.create({
  view: {
    marginTop:moderateVerticalScale(),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateVerticalScale(),
  },
  Text: { color: "black", fontSize: scale(15), fontFamily:"Roboto", },

  TextHighlight: {
    fontSize: verticalScale(15),
    color: "#810541",
    fontFamily:"Roboto",
  },
});