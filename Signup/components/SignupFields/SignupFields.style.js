import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  view: {
    marginTop: verticalScale(),
  
    justifyContent: "center",
    alignItems: "center",
  }, 
  input: {
    marginTop: verticalScale(13),
    borderWidth: 1,
    borderColor: "#810541",
    paddingHorizontal: scale(8),
    borderRadius: 15,
    width: scale(310),
    height: verticalScale(50),
    fontSize:scale(15)
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
    paddingHorizontal: scale(8),
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    fontSize:scale(15)
  },
  eyeIcon: {
    position: "absolute",
    right: scale(15),
  },
  button_view: {
    marginTop: verticalScale(20),
    
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
    fontFamily:"Roboto",
  },
});

export default styles;