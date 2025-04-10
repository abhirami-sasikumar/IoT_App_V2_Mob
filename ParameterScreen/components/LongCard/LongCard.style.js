import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: scale(320),
    height: verticalScale(52),
    borderRadius: 10,
    marginTop: verticalScale(15),
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: verticalScale(6),
    borderColor:"#7D0552",
    borderWidth:scale(0.5),

    paddingHorizontal: scale(10),
  },

  cardText: {
    fontSize: scale(18),
    color: "#810541",
    textAlign: "left",
    flex: 1,
    fontFamily: "Roboto",
  },

  arrow: {
    width: scale(18),
    height: verticalScale(20),
    tintColor: "#810541",
  },
});

export default styles;
