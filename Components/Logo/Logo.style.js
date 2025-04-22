import { StyleSheet } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
    alignItems: "center",
  },
  logo: {
    marginTop: verticalScale(19),
    width: scale(130),
    height: verticalScale(150),
    resizeMode: "contain", // Ensures the image maintains its aspect ratio
  },
});

export default styles;