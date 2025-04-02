import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "lightblue",
    borderRadius: moderateScale(10),
    elevation: moderateScale(5),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowRadius: moderateScale(4),
    width: "100%", // Responsive width
    height: verticalScale(120), // Adjust height dynamically
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(10),
  },
  headText: {
    fontSize: scale(22),
    fontWeight: "400",
    textAlign: "center",
    color: "#133E87",
  },
  line: {
    width: "100%",
    height: verticalScale(2),
    backgroundColor: "#133E87",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: scale(15),
    flex: 1,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingInlineStart:moderateVerticalScale(30),
    flex: 1,
  },
  value: {
    fontSize: scale(20),
    fontWeight: "bold",
    textAlign: "center",
    color: "#133E87",
  },
  measurementText: {
    fontSize: scale(18),
    color: "#133E87",
    marginLeft: scale(5),
  },
  chartIcon: {
    width: scale(30),
    height: scale(30),
    resizeMode: "contain",
    marginLeft: "auto",
  },
});

export default styles;
