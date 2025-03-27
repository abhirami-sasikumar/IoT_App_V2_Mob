import { StyleSheet } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: verticalScale(240),
    width: scale(200),
    height: verticalScale(200),
    resizeMode: "contain", // Ensures the image maintains its aspect ratio
  },
});

export default styles;