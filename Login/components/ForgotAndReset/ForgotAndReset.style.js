import { StyleSheet } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  screen : {
    
    
    flexDirection: "row",
    justifyContent:"center",
      
  
    
    paddingVertical: verticalScale(34),
    
  },

  text: {
    fontSize: scale(19),
    fontFamily:"Roboto",
    
    
    color:"black"
  },
});

export default styles;