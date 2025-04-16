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
    marginBottom: moderateVerticalScale(25),
  },
  Text: {
    fontFamily: "Roboto",
    color: "black",
    fontSize: scale(15),
  },
  TextHighlight: {
    fontFamily: "Roboto",
    fontSize: verticalScale(15),
    color: "#133E87",
  },
  button_view: {
    marginTop: verticalScale(20),
    
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: scale(310),
    borderRadius: scale(20),
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(45),
    borderColor: "#810541",
    borderWidth:scale(1),
  },
  buttonText: {
    color: "#810541",
    fontSize: scale(20),
    fontFamily: "Roboto",
  },
});