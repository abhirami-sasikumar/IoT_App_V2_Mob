import { StyleSheet } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  view : {
    flexDirection: "row",
    justifyContent: "center",

    
    paddingHorizontal: scale(9),
    paddingVertical: verticalScale(30),
    
  },

  text: {
    fontSize: scale(16),
    fontFamily:"Roboto",
    marginBottom:verticalScale(60),
    textAlign:"center",
    marginTop:verticalScale(10)
  },
});

export default styles;