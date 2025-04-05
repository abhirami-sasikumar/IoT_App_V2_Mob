import { StyleSheet } from "react-native";

import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  footer: {
    width: scale(350),
    height: verticalScale(55),
    backgroundColor: "#CBDCEB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 0,
    paddingHorizontal: scale(10),
    borderTopWidth: scale(2), //border
    borderTopColor: "#FFFFFF",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: scale(13),
    color: "#133E87",
    fontFamily:"Roboto",
  },
  home_image: {
    width: scale(35),
    height: verticalScale(28),
    resizeMode: "contain",
  },
  user_image: {
    width: scale(29),
    height: verticalScale(28),
    resizeMode: "contain",
  },
});

export default styles;
