import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    
  
    
  },
  textWithLine: {
    flexDirection: "row", // Align the text and line horizontally
    alignItems: "center", // Vertically center the text and line
  },


  image: {
    
  
    width: scale(110),
    height: verticalScale(55),
  },
});