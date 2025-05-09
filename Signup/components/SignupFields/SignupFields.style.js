import { StyleSheet } from "react-native";
import { scale, verticalScale ,moderateVerticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  view: {
    marginTop: verticalScale(15),
    backgroundColor:"#fff",
  
    justifyContent: "center",
    alignItems: "center",
  }, 
  input: {
    marginTop: verticalScale(9),
    borderWidth: 1,
    borderColor: "#810541",
    paddingHorizontal: scale(8),
    borderRadius: 15,
    width: scale(310),
    height: verticalScale(50),
    fontSize:scale(16),
    fontFamily:"Roboto"
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#810541",
    borderRadius: 15,
    width: scale(310),
    height: verticalScale(50),
    marginTop: verticalScale(8),
    paddingHorizontal: scale(8),
  },
  passwordInput: {
    
    height: "100%",
    fontSize:scale(16),
    fontFamily:"Roboto"
  },
  eyeIcon: {
    position: "absolute",
    right: scale(15),
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
    fontFamily:"Roboto",
  },
  privacyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: moderateVerticalScale(25),
    marginBottom: verticalScale(5),
    flexWrap: "wrap",
    marginTop:verticalScale(10)
  },
  privacyText: {
    marginLeft: moderateVerticalScale(8),
    flexShrink: 1
  },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  }
  
});

export default styles;