import { StyleSheet } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: verticalScale(30),
  },
  button_view: {
    flex: 1,
    marginTop: verticalScale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#133E87",
    width: scale(315),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(55),
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scale(25),
    fontFamily:"Roboto"
  },
  logo: { marginTop: scale(200) },
});