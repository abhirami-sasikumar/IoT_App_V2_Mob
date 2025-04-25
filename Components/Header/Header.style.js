import { StyleSheet } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(40),
    paddingHorizontal: scale(10),
    
    
    
  },
  textContainer: {
     // Center the title container absolutely
    left: scale(0),
    right: scale(0),
    
    justifyContent: "center",
    paddingLeft:scale(18) // Center the text horizontally
  },
  text: {
    fontSize: scale(20),
    color: "white",
    fontFamily:"Roboto",
    marginTop: verticalScale(8),

   },

});