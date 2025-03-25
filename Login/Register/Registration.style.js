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
    top:360
  },
  Text: { fontFamily:"Roboto", color: "black", fontSize: scale(15) },

  TextHighlight: {
    fontFamily:"Roboto",
    fontSize: verticalScale(15),
    color: "#133E87",
  },
});
