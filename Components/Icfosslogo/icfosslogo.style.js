import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    top:363
    
  },
  textWithLine: {
    flexDirection: "row", // Align the text and line horizontally
    alignItems: "center", // Vertically center the text and line
  },
  text: {
    fontSize: scale(15),
    textAlign: "center",
    marginLeft: scale(1),
    marginRight: scale(0),
    color: "black",
  },
  line: {
    height: verticalScale(0.6),
    width: scale(135),
    backgroundColor: "#A9A9A9",
  },
  image: {
    width: scale(112),
    height: verticalScale(60),
    top:7
  },
});