import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  view: {

    marginTop: verticalScale(200),


    justifyContent: "flex-start",
    alignItems: "center",

  },
  input: {
    marginTop: verticalScale(10),
    borderWidth: 1,
    borderColor: "#810541",
    paddingHorizontal: scale(10),
    borderRadius: 15,
    width: scale(310),
    height: verticalScale(50),
    fontFamily: "Roboto",
    fontSize: scale(15)


  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#810541",
    borderRadius: 15,
    width: scale(310),
    height: verticalScale(50),
    marginTop: verticalScale(13),
    paddingHorizontal: scale(10),

  },
  passwordInput: {
    flex: 1,
    height: "100%",
    fontFamily: "Roboto",
    fontSize: scale(15)
  },
  eyeIcon: {
    position: "absolute",
    right: scale(15),
    tintColor: "#810541"
  },


  rememberMeContainer: {
    marginTop: verticalScale(10),
    marginLeft:scale(25),
    
    justifyContent: "flex-start",
    width: scale(310),
  },

  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkboxBox: {
    width: scale(15),
    height: scale(15),
    borderWidth: 1,
    borderColor: "#810541",
    borderRadius: 4,
    
    
    marginRight: scale(10),
  },

  checkedBox: {
    backgroundColor: "#810541",
  },

  checkmark: {
    color: "white",
    fontSize: scale(10),
    fontWeight: "bold",
    alignItems:"center"
  },

  rememberText: {
    fontSize: scale(14),
    fontFamily: "Roboto",
    color: "#333",
  },

  button_view: {
    marginTop: verticalScale(10),

    justifyContent: "center",
    alignItems: "center",
  },
  button: {

    backgroundColor: "#810541",
    width: scale(310),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(40),
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scale(20),
    fontFamily: "Roboto",
  },
});

export default styles;