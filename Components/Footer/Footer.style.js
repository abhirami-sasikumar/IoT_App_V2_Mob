import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: verticalScale(55),
    backgroundColor: "#810541",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    borderTopWidth: scale(2),
    borderTopColor: "#7D0552",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circleWrapper: {
    width: scale(45),
    height: scale(45),
    borderRadius: scale(22.5),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10, 
  },
  home_image: {
    width: scale(28),
    height: verticalScale(22),
    resizeMode: "contain",
  },
  user_image: {
    width: scale(26),
    height: verticalScale(22),
    resizeMode: "contain",
  },
  backArrow: {
    width: scale(24),
    height: verticalScale(24),
    resizeMode: "contain",
    tintColor: "#7D0552",
  },
});

export default styles;
