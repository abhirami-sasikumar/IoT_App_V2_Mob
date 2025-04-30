import { StyleSheet } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {

    marginTop: verticalScale(30),
  },
  button_view: {
    flex: 1,
    marginTop: verticalScale(35),
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#810541",
    width: scale(315),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(40),
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scale(20),
    fontFamily:"Roboto"
  },
  logo: { 
    marginTop: scale(1)
   },
});