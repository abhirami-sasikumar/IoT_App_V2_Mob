import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  view: {
    marginTop: verticalScale(320),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: verticalScale(13),
    borderWidth: 1,
    borderColor: "grey",
    paddingHorizontal: scale(8),
    borderRadius: 30,
    width: scale(310),
    height: verticalScale(50),
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 30,
    width: scale(310),
    height: verticalScale(50),
    marginTop: verticalScale(13),
    paddingHorizontal: scale(8),
  },
  passwordInput: {
    flex: 1,
    height: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: scale(15),
  },
  button_view: {
    marginTop: verticalScale(165),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(60),
  },
  button: {
    backgroundColor: "#133E87",
    width: scale(310),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(55),
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scale(25),
    fontFamily:"Roboto",
  },
});

export default styles;