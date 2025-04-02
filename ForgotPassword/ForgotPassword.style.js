import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex:1,
    
    padding: scale(15),
    marginTop: verticalScale(250),
  },
  heading: {
    fontSize: scale(22),
    marginBottom: verticalScale(20),
    textAlign: "center",
    color: "#133E87",
    fontFamily: "Roboto",
  },
  label: {
    fontSize: scale(18),
    marginBottom: verticalScale(10),
    color: "#133E87",
    fontFamily: "Roboto",
  },
  input: {
    marginBottom: verticalScale(10),
    borderWidth: verticalScale(1),
    borderColor: "#ccc",
    borderRadius: 5,
    height: verticalScale(38),
    fontFamily: "Roboto",
    paddingHorizontal: scale(8),
  },
  button: {
    backgroundColor: "#133E87",
    padding: verticalScale(10),
  
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(18),
    fontFamily: "Roboto",
  },
  footer: {
    marginTop: verticalScale(199),
  },
});