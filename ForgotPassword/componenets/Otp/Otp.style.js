import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(15),
    marginTop: verticalScale(230),
  },
  heading: {
    fontSize: scale(22),
    fontFamily: "Roboto",
    marginBottom: verticalScale(15),
    textAlign: "center",
    color: "#810541",
  },
  label: {
    fontSize: scale(18),
    marginBottom: verticalScale(10),
    color: "#810541",
    fontFamily: "Roboto",
  },
  input: {
    marginBottom: verticalScale(10),
    borderWidth: verticalScale(1),
    borderColor: "#810541",
    borderRadius: 15,
    height: verticalScale(55),
    fontFamily: "Roboto",
    paddingHorizontal: scale(8),
  },
  footer: {
    marginTop: verticalScale(93),
  },
  button: {
    backgroundColor: "#810541",
    padding: verticalScale(10),
    borderRadius: 35,
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(18),
    fontFamily: "Roboto",
  },
});