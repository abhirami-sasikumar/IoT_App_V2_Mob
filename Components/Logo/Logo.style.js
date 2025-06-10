import { StyleSheet } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"fff",
    
    
    alignItems: "center",
  },
  logo: {
    marginTop: verticalScale(60),
    width: scale(110),
    height: verticalScale(120),
    backgroundColor:"fff",
    // Ensures the image maintains its aspect ratio
  },
});

export default styles;