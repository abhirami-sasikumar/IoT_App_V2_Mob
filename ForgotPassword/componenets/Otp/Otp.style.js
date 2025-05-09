import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(15),
    marginTop: verticalScale(200),
    backgroundColor: "#fff", // Solid background to avoid override

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
    marginTop: verticalScale(5),
    borderWidth: verticalScale(1),
    borderColor: "#810541",
    borderRadius: 15,
    height: verticalScale(50),
    fontSize:scale(16),
    fontFamily:"Roboto",
    
    paddingHorizontal: scale(10),
  },
  
  
  button: {
    backgroundColor: "#810541",
    justifyContent: "center",
    height: verticalScale(40),
    borderRadius: 35,
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(20),
    fontFamily: "Roboto",
  },
  passwordContainer: {
    marginTop: verticalScale(9),

    flexDirection: "row",
    alignItems: "center",
    borderWidth: verticalScale(1),
    borderColor: "#810541",
    borderRadius: 15,
    height: verticalScale(50),
    paddingHorizontal: scale(10),
  },
  passwordInput: {
    flex: 1,
    fontFamily:"Roboto",
    
    fontSize: scale(16),
  },
  eyeIcon: {
    padding: scale(5),
  },
  footer: {
    backgroundColor:"#fff"
    
  },

});