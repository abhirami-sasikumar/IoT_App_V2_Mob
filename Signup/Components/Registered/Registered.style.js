import { StyleSheet } from "react-native";

import {
  scale,
  verticalScale,
  moderateVerticalScale,
} from "react-native-size-matters";

export const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateVerticalScale(65.2),
  },
  Text: { color: "black", fontSize: scale(15), fontFamily:"Roboto", },

  TextHighlight: {
    fontSize: verticalScale(15),
    color: "#133E87",
    fontFamily:"Roboto",
  },
});