import { StyleSheet } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  view : {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "right",
    paddingHorizontal: scale(9),
    paddingVertical: verticalScale(34),
    
  },

  text: {
    fontSize: scale(16),
    fontFamily:"Roboto",
    marginTop:verticalScale(10)
  },
});

export default styles;