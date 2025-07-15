import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentWrapper: {
    padding: verticalScale(20),
    flexGrow: 1,
  },
  heading: {
    fontSize: scale(24),
    fontWeight: "bold",
    marginBottom: verticalScale(1),
    color: "#333",
    textAlign:"center"
  },
  bodyText: {
    fontSize: scale(14),
    lineHeight: moderateScale(22),
    color: "#555",
    textAlign:"justify",
    letterSpacing: 0.3,
    marginBottom: verticalScale(10),

  },
  footerWrapper: {
    
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
