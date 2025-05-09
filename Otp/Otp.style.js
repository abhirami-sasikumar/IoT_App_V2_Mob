import { StyleSheet } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#fff"

  
  },
  logo:{  
      backgroundColor:'#fff'



  },
  otpfield:{
    marginTop:verticalScale(30)

  },
  button_view: {
    
    marginTop: verticalScale(15),
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
  icfosslogo: { 
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: verticalScale(),
   },
});