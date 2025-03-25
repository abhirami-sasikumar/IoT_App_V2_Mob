import { StyleSheet } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(40),
    paddingHorizontal: scale(10),
  },
  textContainer: {
    position: "absolute", // Center the title container absolutely
    left: scale(0),
    right: scale(0),
    alignItems: "center", // Center the text horizontally
  },
  text: {
    fontSize: scale(22),
    color: "#133E87",
    fontFamily:"Roboto",
  },
  image: {
    width: scale(25),
    height: scale(28),
  },
});